import {MenuItemInterface} from './models/Menu';
import {AuthService} from './services/auth/auth.service';
import {UserInterface} from './models/User';
import {Observable, of} from 'rxjs';
import {Component} from '@angular/core';

import {Platform, LoadingController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {map, switchMap} from 'rxjs/operators';

@Component({selector: 'app-root', templateUrl: 'app.component.html'})
export class AppComponent {
  user: Observable<UserInterface>;
  public appPages: MenuItemInterface[];


  constructor(private platform: Platform, private splashScreen: SplashScreen,
              private statusBar: StatusBar, private authService: AuthService,
              private loadCtrl: LoadingController) {
    this.initializeApp();
  }


  async initializeApp() {
    await this.platform.ready();
    const load =
        await this.loadCtrl.create({message: 'Conectando con el Servidor...'});
    await load.present();
    this.user = await this.authService.user;
    this.initializeMenu();
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    load.dismiss();
  }

  initializeMenu() {
    this.appPages = [
      {
        title: (!this.user) ? of('Usuario') : this.user.pipe(switchMap(user => {
          if (user) {
            return (user.displayName) ? of(user.displayName) : of(user.email);
          } else {
            return of('Usuario');
          }
        })),
        icon: 'person',
        url: '/user',
        avatar: (!this.user) ? of('') : this.user.pipe(switchMap(user => {
          if (user) {
            return (user.photoURL) ? user.photoURL : '';
          } else {
            return '';
          }
        }))
      },
      {title: of('Home'), url: '/home', icon: 'home'},
      {title: of('List'), url: '/list', icon: 'list'},
    ];
  }
}
