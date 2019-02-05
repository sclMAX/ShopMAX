import {UserService} from './../../../services/user.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ModalController, LoadingController} from '@ionic/angular';
import {ArticuloInterface} from './../../../models/Articulo';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Component, OnInit, Input} from '@angular/core';
import {ImageToolsService} from 'src/app/services/image-tools.service';
import {Observable} from 'rxjs';
import {finalize, map, take} from 'rxjs/operators';

@Component({
  selector: 'app-articulos-amform',
  templateUrl: './articulos-amform.component.html',
  styleUrls: ['./articulos-amform.component.scss']
})
export class ArticulosAMFormComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('articulo') articulo = {} as ArticuloInterface;
  form: FormGroup = new FormGroup({
    codigo: new FormControl(this.articulo.codigo, [Validators.required]),
    nombre: new FormControl(this.articulo.nombre, [Validators.required]),
    descripcion:
        new FormControl(this.articulo.descripcion, [Validators.required]),
    precio_contado:
        new FormControl(this.articulo.precio_contado, [Validators.required]),
    precio_tarjeta:
        new FormControl(this.articulo.precio_tarjeta, [Validators.required]),
  });

  uploadPercent: Observable<number>;
  imageURL: Observable<string>;

  constructor(private modalCtrl: ModalController,
              private imgTools: ImageToolsService,
              private userService: UserService,
              private storage: AngularFireStorage,
              private loadCtrl: LoadingController) {}

  ngOnInit() {}

  onSubmit() { this.modalCtrl.dismiss(); }

  onCancel() { this.modalCtrl.dismiss(); }


  async uploadFile(event) {
    const load = await this.loadCtrl.create({message: 'Procesando imagen...'});
    await load.present();
    const file = await this.imgTools.resize(event.target.files[0], 250, 250)
                     .pipe(take(1), map(img => img))
                     .toPromise();
    const icon = await this.imgTools.resize(file, 80, 80)
                     .pipe(take(1), map(img => img))
                     .toPromise();
    const id = Date.now();
    const image_file = (this.articulo.imageURL) ? this.articulo.imageURL :
                                                  `articulo_${id}.png`;
    const icon_file = (this.articulo.iconURL) ? this.articulo.iconURL :
                                                `articulo_icon_${id}.png`;
    const filePath = `articulos/${this.userService.userId}/${image_file}`;
    const iconPath = `articulos/${this.userService.userId}/${icon_file}`;
    const fileRef = this.storage.ref(filePath);
    const iconRef = this.storage.ref(iconPath);
    const task_icon = this.storage.upload(iconPath, icon);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task_icon.snapshotChanges()
        .pipe(finalize(async() => {
          this.articulo.iconURL =
              await iconRef.getDownloadURL().pipe(take(1)).toPromise();
        }))
        .subscribe();
    return await task.snapshotChanges()
        .pipe(finalize(() => {
          this.imageURL = fileRef.getDownloadURL();
          load.dismiss();
          return;
        }))
        .toPromise();
  }
}
