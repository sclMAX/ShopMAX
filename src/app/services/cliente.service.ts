import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import {UserService} from './user.service';
import {Injectable} from '@angular/core';
import {ClienteInterface} from '../models/Cliente';
import * as firebase from 'firebase';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClienteService {
  private Clientes: AngularFirestoreCollection;
  constructor(private afs: AngularFirestore, private userService: UserService) {
    this.Clientes = this.afs.collection('clientes')
                        .doc(this.userService.userId)
                        .collection<ClienteInterface>('clientes');
  }

  getAll(): Observable<ClienteInterface[]> {
    return this.Clientes.valueChanges();
  }

  getOne(id: string): Observable<ClienteInterface> {
    return this.Clientes.doc<ClienteInterface>(id).valueChanges();
  }

  add(cliente: ClienteInterface) { return this.update(cliente); }

  update(cliente: ClienteInterface): Promise<void> {
    cliente = this.sanitize(cliente);
    return this.Clientes.doc<ClienteInterface>(cliente.id)
        .set(cliente, {merge: true});
  }

  async isUnique(nombre: string): Promise<boolean> {
    nombre = nombre.toLowerCase().trim();
    return await this.afs.collection('clientes')
        .doc(this.userService.userId)
        .collection<ClienteInterface>(
            'clientes', ref => ref.where('nombre_lowercase', '==', nombre))
        .get()
        .pipe(take(1), map(data => data.empty))
        .toPromise();
  }

  private sanitize(cliente: ClienteInterface): ClienteInterface {
    if (!cliente.id) {
      cliente.id = this.afs.createId();
    }
    if (!cliente.fecha_ingreso) {
      cliente.fecha_ingreso = firebase.firestore.Timestamp.now();
    }
    cliente.nombre_lowercase = cliente.nombre.toLowerCase().trim();
    return cliente;
  }
}
