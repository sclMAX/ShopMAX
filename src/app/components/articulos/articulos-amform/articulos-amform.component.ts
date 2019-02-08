import {AngularFirestore} from '@angular/fire/firestore';
import {ArticulosService} from './../../../services/articulos.service';
import {UserService} from './../../../services/user.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ModalController, LoadingController, NavParams} from '@ionic/angular';
import {ArticuloInterface} from './../../../models/Articulo';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
  FormArray,
  FormBuilder
} from '@angular/forms';
import {Component, OnInit, Input} from '@angular/core';
import {ImageToolsService} from 'src/app/services/image-tools.service';
import {Observable, of} from 'rxjs';
import {finalize, map, take} from 'rxjs/operators';
import {checkView} from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-articulos-amform',
  templateUrl: './articulos-amform.component.html',
  styleUrls: ['./articulos-amform.component.scss']
})
export class ArticulosAMFormComponent implements OnInit {
  articulo = {} as ArticuloInterface;
  form: FormGroup;
  uploadPercent: Observable<number>;
  isUnique: Observable<boolean>;
  title: string;
  isNew: boolean;
  tmpImage: Observable<string> = of('assets/250x250.png');
  private imgFile: File;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder,
              private imgTools: ImageToolsService,
              private userService: UserService,
              private storage: AngularFireStorage,
              private afs: AngularFirestore,
              private articuloService: ArticulosService,
              private loadCtrl: LoadingController,
              private navParams: NavParams) {
    const parametro = this.navParams.get('articulo');
    if (parametro) {
      this.title = 'Editar Articulo...';
      this.articulo = Object.assign(this.articulo, parametro);
      this.isNew = false;
    } else {
      this.title = 'Nuevo Articulo...';
      const id = this.afs.createId();
      this.articulo.id = id;
      this.isNew = true;
    }
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      nombre: [
        '',
        [Validators.required, Validators.minLength(4)],
        [this.uniqueValidator()]
      ],
      descripcion: [],
      precio_contado: [0, [Validators.required, Validators.min(0)]],
      precio_tarjeta: [0, [Validators.required, Validators.min(0)]],
      stock_total: [0, [Validators.required, Validators.min(0)]],
      talles: this.fb.array([])
    });
    this.form.patchValue(this.articulo);
    if (this.articulo.iconURL) {
      this.tmpImage = of(this.articulo.iconURL);
    }
    if (this.articulo.talles) {
      this.articulo.talles.forEach(
          talle => this.talles.push(this.createTalle(talle)));
    }
  }

  createTalle(talle?: {talle: string, stock: number}): FormGroup {
    const cg = this.fb.group({
      talle: ['', [Validators.required, Validators.minLength(1)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
    if (talle) {
      cg.patchValue(talle);
    }
    return cg;
  }

  get talles(): FormArray { return this.form.get('talles') as FormArray; }

  addTalle() { this.talles.push(this.createTalle()); }

  removeTalle(idx: number): void { this.talles.removeAt(idx); }

  ngOnInit() {}

  async onSubmit() {
    const load = await this.loadCtrl.create({message: 'Guandando...'});
    await load.present();
    try {
      if (this.imgFile) {
        await this.uploadFile(this.imgFile);
      }
      this.articulo = Object.assign(this.articulo, this.form.value);
      await this.articuloService.update(this.articulo);
      return await this.modalCtrl.dismiss();
    } catch (e) {
      // TODO: Controlar Errores.
      console.error(e);
    } finally {
      load.dismiss();
    }
  }

  async onCancel() { return await this.modalCtrl.dismiss(); }

  private getImgFilePath(prefix: string): string {
    return `articulos/${this.userService.userId}/${prefix}_${this.articulo.id}.jpg`;
  }

  async onChangeImage(event) {
    this.imgFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.tmpImage = of(reader.result as string);
    reader.readAsDataURL(this.imgFile);
  }

  async uploadFile(imgFile: File) {
    const load = await this.loadCtrl.create({message: 'Procesando imagen...'});
    await load.present();
    try {
      const file = await this.imgTools.resize(imgFile, 250, 250)
                       .pipe(take(1), map(img => img))
                       .toPromise();
      const icon = await this.imgTools.resize(file, 80, 80)
                       .pipe(take(1), map(img => img))
                       .toPromise();
      const filePath = this.getImgFilePath('img');
      const iconPath = this.getImgFilePath('ico');
      const fileRef = this.storage.ref(filePath);
      const iconRef = this.storage.ref(iconPath);
      const task_icon = this.storage.upload(iconPath, icon);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task_icon.snapshotChanges()
          .pipe(finalize(async() => {
            this.articulo.iconURL =
                await iconRef.getDownloadURL().pipe(take(1)).toPromise();
          }))
          .subscribe();
      return await task.snapshotChanges()
          .pipe(finalize(async() => {
            this.articulo.imageURL =
                await fileRef.getDownloadURL().pipe(take(1)).toPromise();
            return;
          }))
          .toPromise();
    } catch (e) {
      // TODO: Procesar Errores
      console.error(e);
      throw(e);
    } finally {
      load.dismiss();
    }
  }

  uniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null>|
               Observable<ValidationErrors | null> => {
      if (this.articulo && this.articulo.nombre) {
        if (String(control.value).toUpperCase() ===
            String(this.articulo.nombre).toUpperCase()) {
          return of(null);
        }
      }
      return this.articuloService.isUnique(control.value)
          .pipe(map(res => res ? null : {'notUnique': true}));
    };
  }
}
