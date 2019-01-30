import {CommonModule} from '@angular/common';
import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {first, map} from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private navCtrl: NavController) {}
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean>|
      Promise<boolean>| boolean {
    return this.authService.user.pipe(first(), map(user => {
                                        if (user && user.uid) {
                                          return true;
                                        } else {
                                          this.navCtrl.navigateRoot('login');
                                          return false;
                                        }
                                      }));
  }
}
