import { ArticulosService } from './../../../services/articulos.service';
import { UserService } from './../../../services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController, LoadingController, NavParams } from '@ionic/angular';
import { ArticuloInterface } from './../../../models/Articulo';
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
import { Component, OnInit, Input } from '@angular/core';
import { ImageToolsService } from 'src/app/services/image-tools.service';
import { Observable, of } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { checkView } from '@angular/core/src/render3/instructions';

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
  showProgress = false;
  title: string;
  isNew: boolean;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder,
    private imgTools: ImageToolsService,
    private userService: UserService,
    private storage: AngularFireStorage,
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
    if (this.articulo.talles) {
      this.articulo.talles.forEach(talle => this.talles.push(this.createTalle(talle)));
    }
  }

  createTalle(talle?: { talle: string, stock: number }): FormGroup {
    const cg = this.fb.group({
      talle: ['', [Validators.required, Validators.minLength(1)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
    if (talle) {
      cg.patchValue(talle);
    }
    return cg;
  }

  get talles() {
    return this.form.get('talles') as FormArray;
  }

  addTalle() {
    this.talles.push(this.createTalle());
  }

  removeTalle(idx: number): void { this.talles.removeAt(idx); }

  ngOnInit() { }

  async onSubmit() {
    const load = await this.loadCtrl.create({ message: 'Guandando...' });
    await load.present();
    try {
      this.articulo = Object.assign(this.articulo, this.form.value);
      if (this.isNew) {
        await this.articuloService.add(this.articulo);
      } else {
        await this.articuloService.update(this.articulo);
      }
      return await this.modalCtrl.dismiss();
    } catch (e) {
      // TODO: Controlar Errores.
      console.error(e);
    } finally {
      load.dismiss();
    }
  }

  onCancel() { this.modalCtrl.dismiss(); }

  async uploadFile(event: any) {
    this.showProgress = true;
    const load = await this.loadCtrl.create({ message: 'Procesando imagen...' });
    await load.present();
    try {
      const file = await this.imgTools.resize(event.target.files[0], 250, 250)
        .pipe(take(1), map(img => img))
        .toPromise();
      const extension = (file.type === 'image/jpeg') ? 'jpg' : 'png';
      const icon = await this.imgTools.resize(file, 80, 80)
        .pipe(take(1), map(img => img))
        .toPromise();
      const id = Date.now();
      const image_file = (this.articulo.imageURL) ?
        this.articulo.imageURL :
        `articulo_${id}.${extension}`;
      const icon_file = (this.articulo.iconURL) ?
        this.articulo.iconURL :
        `articulo_icon_${id}.${extension}`;
      const filePath = `articulos/${this.userService.userId}/${image_file}`;
      const iconPath = `articulos/${this.userService.userId}/${icon_file}`;
      const fileRef = this.storage.ref(filePath);
      const iconRef = this.storage.ref(iconPath);
      const task_icon = this.storage.upload(iconPath, icon);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task_icon.snapshotChanges()
        .pipe(finalize(async () => {
          this.articulo.iconURL =
            await iconRef.getDownloadURL().pipe(take(1)).toPromise();
        }))
        .subscribe();
      return await task.snapshotChanges()
        .pipe(finalize(async () => {
          this.articulo.imageURL =
            await fileRef.getDownloadURL().pipe(take(1)).toPromise();
          return;
        }))
        .toPromise();
    } catch (e) {
      // TODO: Procesar Errores
      console.error(e);
    } finally {
      load.dismiss();
      this.showProgress = false;
    }
  }

  uniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> |
      Observable<ValidationErrors | null> => {
      if (this.articulo && this.articulo.nombre) {
        if (String(control.value).toUpperCase() === String(this.articulo.nombre).toUpperCase()) { return of(null); }
      }
      return this.articuloService.isUnique(control.value)
        .pipe(map(res => {
          return res ? null : { 'notUnique': true };
        }));
    };
  }
}
