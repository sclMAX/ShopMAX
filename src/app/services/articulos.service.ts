import {AngularFireStorage} from '@angular/fire/storage';
import {ArticuloInterface} from './../models/Articulo';
import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from './user.service';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ArticulosService {
  constructor(private afs: AngularFirestore, private userService: UserService,
              private storage: AngularFireStorage) {}

  sanitize(data: ArticuloInterface): ArticuloInterface {
    data.nombre = data.nombre.toUpperCase();
    if (data.talles && data.talles.length > 0) {
      data.stock_total = data.talles.reduce((a, b) => (a + b.stock), 0);
    }
    return data;
  }

  add(data: ArticuloInterface) {
    data = this.sanitize(data);
    const ref = this.afs.collection('articulos')
                    .doc(this.userService.userId)
                    .collection('articulos');
    return ref.add(data).then(art => art.update({id: art.id}));
  }

  getImgFilePath(prefix: string, id: string): string {
    return `articulos/${this.userService.userId}/${prefix}_${id}.jpg`;
  }

  remove(id: string) {
    const ref = this.afs.collection('articulos')
                    .doc(this.userService.userId)
                    .collection('articulos')
                    .doc(id);
    return ref.delete().then(async() => {
      await this.storage.ref(this.getImgFilePath('img', id))
          .delete()
          .toPromise();
      return await this.storage.ref(this.getImgFilePath('ico', id))
          .delete()
          .toPromise();
    });
  }

  update(data: ArticuloInterface) {
    data = this.sanitize(data);
    const ref = this.afs.collection('articulos')
                    .doc(this.userService.userId)
                    .collection('articulos')
                    .doc(data.id);
    return ref.set(data, {merge: true});
  }

  getAll(): Observable<ArticuloInterface[]> {
    return this.afs.collection('articulos')
        .doc(this.userService.userId)
        .collection<ArticuloInterface>('articulos')
        .valueChanges();
  }

  isUnique(nombre: string) {
    return this.afs.collection('articulos')
        .doc(`${this.userService.userId}`)
        .collection('articulos',
                    ref => ref.where('nombre', '==', nombre.toUpperCase()))
        .get()
        .pipe(map(data => data.empty));
  }
}
