import {AngularFireAuth} from '@angular/fire/auth';
import {UserInterface} from './../models/User';
import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService {
  private currentUser: Observable<UserInterface>;
  private currentUserUid = '';
  private currentUserData: UserInterface;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

  get user() { return this.currentUser; }

  get userData() { return this.currentUserData; }

  set user(newUser) {
    this.currentUser = newUser.pipe(map(user => {
      if (user) {
        this.userId = user.uid;
      }
      this.currentUserData = user;
      return user;
    }));
  }

  get userId() { return this.currentUserUid; }

  set userId(uid) { this.currentUserUid = uid; }

  changeEmail(new_email: string) {
    return this.afAuth.auth.currentUser.updateEmail(new_email);
  }

  getUser(uid: string) {
    return this.afs.collection('users').doc<UserInterface>(uid).valueChanges();
  }

  updateUser(user: UserInterface) {
    const ref: AngularFirestoreDocument<UserInterface> =
        this.afs.doc<UserInterface>(`users/${user.uid}`);
    return ref.set(user, {merge: true});
  }
}
