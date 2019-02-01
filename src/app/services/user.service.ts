import { UserInterface } from './../models/User';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: Observable<UserInterface>;

  constructor(private afs: AngularFirestore) { }

  get user() { return this.currentUser; }

  set user(newUser) {
    this.currentUser = newUser;
  }

  getUser(uid: string) {
    return this.afs.collection('users').doc<UserInterface>(uid).valueChanges();
  }

  updateUser(user: UserInterface) {
    const ref: AngularFirestoreDocument<UserInterface> =
      this.afs.doc<UserInterface>(`users/${user.uid}`);
    return ref.set(user, { merge: true });
  }

}
