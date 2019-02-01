import { UserService } from './services/user.service';
import { MenuItemInterface } from './models/Menu';
import { AuthService } from './services/auth/auth.service';
import { UserInterface } from './models/User';
import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { map, switchMap } from 'rxjs/operators';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
  user: Observable<UserInterface>;
  public appPages: MenuItemInterface[];


  constructor(private platform: Platform, private splashScreen: SplashScreen,
    private statusBar: StatusBar, private userService: UserService, private authService: AuthService,
    private loadCtrl: LoadingController) {
    this.initializeApp();
  }


  async initializeApp() {
    await this.platform.ready();
    const load =
      await this.loadCtrl.create({ message: 'Conectando con el Servidor...' });
    await load.present();
    await this.authService.setUser();
    this.user = await this.userService.user;
    this.initializeMenu();
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    load.dismiss();
  }

  initializeMenu() {
    this.appPages = [
      { title: 'Ventas', url: '/ventas', icon: 'cart' },
      { title: 'List', url: '/list', icon: 'list' },
      { title: 'Usuario', url: '/user', icon: 'person' },
    ];
  }

  async logout() {
    return await this.authService.logout();
  }
}
