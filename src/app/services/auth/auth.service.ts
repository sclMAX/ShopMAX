import { UserService } from './../user.service';
import { UserInterface } from './../../models/User';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { User } from 'firebase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private userService: UserService, private afs: AngularFirestore) {
    this.setUser();
  }

  async setUser() {
    this.userService.user = await this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.userService.getUser(user.uid);
      } else {
        return of(null);
      }
    }));
  return;
  }

  async login(credencial: { email: string, password: string }): Promise<boolean> {
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(
        credencial.email, credencial.password);
      const user = await this.userService.getUser(res.user.uid)
        .pipe(take(1))
        .toPromise();
      if (!user) {
        const data: UserInterface = {
          uid: res.user.uid,
          email: res.user.email,
          emailVerified: res.user.emailVerified
        };
        await this.userService.updateUser(data);
      }
      return true;
    } catch (e) {
      console.log('Error:', e);
      throw e;
    }
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }


  processLoginError(error): string {
    if (!error || !error.code) {
      return error;
    }
    switch (error.code) {
      case 'auth/network-request-failed':
        return 'Error de conexion... Controle su conexion de internet!';
      case 'auth/invalid-email':
        return 'Email incorrecto no registrado!';
      case 'auth/user-disabled':
        return 'El usuario ha sido suspendido!';
      case 'auth/user-not-found':
        return 'Usuario o Email no encontrado!';
      case 'auth/wrong-password':
        return 'Password incorrecta!';
      default:
        return error;
    }
  }
}
