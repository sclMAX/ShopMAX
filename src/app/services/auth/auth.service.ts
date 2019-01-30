import {UserInterface} from './../../models/User';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {first, map, tap, switchMap, take} from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import {User} from 'firebase';

@Injectable({providedIn: 'root'})
export class AuthService {
  private currentUser: Observable<UserInterface | null>;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.getUser(user.uid);
      } else {
        return of(null);
      }
    }));
  }



  get user(): Observable<UserInterface> { return this.currentUser; }

  set user(userData: Observable<UserInterface>) { this.currentUser = userData; }

  isLogged(): Promise<boolean> {
    return this.user.pipe(take(1),
                          map(user => (user && user.uid) ? true : false))
        .toPromise();
  }

  async login(credencial: {email: string, password: string}): Promise<boolean> {
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(
          credencial.email, credencial.password);
      console.log('res', res);
      const user = await this.getUser(res.user.uid)
                       .pipe(take(1), map(data => data))
                       .toPromise();
      if (!user) {
        await this.updateUser(res.user);
        return true;
      }
      return false;
    } catch (e) {
      console.log('Error:', e);
    }
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logout() {
    return this.afAuth.auth.signOut().then(() => this.user = of(null));
  }

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
    this.user = this.afs.doc<UserInterface>(`users/${uid}`).valueChanges();
    return this.user;
  }
}
