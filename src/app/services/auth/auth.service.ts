import {UserInterface} from './../../models/User';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {first, map, tap, switchMap} from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import {User} from 'firebase';

@Injectable({providedIn: 'root'})
export class AuthService {
  user: Observable<UserInterface | null>;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = this.afAuth.authState.pipe(switchMap((user) => {
      if (user) {
        return this.getUser(user.uid);
      } else {
        return of(null);
      }
    }));
  }

  isLogged() {
    return this.afAuth.user.pipe(first(), map(user => {
                                   if (user) {
                                     return true;
                                   } else {
                                     return false;
                                   }
                                 }))
  }

  login(credencial: {email: string, password: string}) {
    return this.afAuth.auth.signInWithEmailAndPassword(credencial.email,
                                                       credencial.password)
        .then(cred => this.updateUser(cred.user))
        .catch(err => console.log('Error:', err));
  }

  logout() { return this.afAuth.auth.signOut(); }

  updateUser(user: User | UserInterface) {
    const ref: AngularFirestoreDocument<UserInterface> =
        this.afs.doc<UserInterface>(`users/${user.uid}`);
    const data: UserInterface = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    };
    return ref.set(data, {merge: true}).then(() => this.getUser(user.uid));
  }

  private getUser(uid: string): Observable<UserInterface> {
    return this.afs.doc<UserInterface>(`users/${uid}`).valueChanges();
  }
}
