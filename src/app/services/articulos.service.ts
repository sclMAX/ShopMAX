import {AngularFireStorage} from '@angular/fire/storage';
import {ArticuloInterface} from './../models/Articulo';
import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import {UserService} from './user.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({providedIn: 'root'})
export class ArticulosService {
  private Articulos: AngularFirestoreCollection;
  constructor(private afs: AngularFirestore, private userService: UserService,
              private storage: AngularFireStorage) {
    this.Articulos = this.afs.collection('articulos')
                         .doc(this.userService.userId)
                         .collection<ArticuloInterface>(
                             'articulos', ref => ref.orderBy('nombre'));
  }

  add(data: ArticuloInterface) { return this.update(data); }

  update(data: ArticuloInterface) {
    data = this.sanitize(data);
    return this.Articulos.doc<ArticuloInterface>(data.id)
        .set(data, {merge: true});
  }

  async remove(id: string) {
    const ref = this.Articulos.doc<ArticuloInterface>(id);
    return ref.delete().then(async() => {
      await this.storage.ref(this.getImgFilePath('img', id))
          .delete()
          .toPromise();
      return await this.storage.ref(this.getImgFilePath('ico', id))
          .delete()
          .toPromise();
    });
  }

  getAll(): Observable<ArticuloInterface[]> {
    return this.Articulos.valueChanges();
  }

  getImgFilePath(prefix: string, id: string): string {
    return `articulos/${this.userService.userId}/${prefix}_${id}.jpg`;
  }

  isUnique(nombre: string) {
    nombre = nombre.toLowerCase().trim();
    return this.afs.collection('articulos')
        .doc(`${this.userService.userId}`)
        .collection('articulos',
                    ref => ref.where('nombre_lowercase', '==', nombre))
        .get()
        .pipe(map(data => data.empty));
  }

  private sanitize(data: ArticuloInterface): ArticuloInterface {
    if (!data.id) {
      data.id = this.afs.createId();
    }
    data.nombre_lowercase = data.nombre.toLowerCase().trim();
    data.fecha_ultima_modificacion = firebase.firestore.Timestamp.now();
    if (!data.fecha_ingreso) {
      data.fecha_ingreso = data.fecha_ultima_modificacion;
    }
    if (data.talles && data.talles.length > 0) {
      data.stock_total = data.talles.reduce((a, b) => (a + b.stock), 0);
    }
    return data;
  }
}
