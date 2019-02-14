import { MenuItemInterface } from './models/Menu';
import { AuthService } from './services/auth/auth.service';
import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
  public appPages: MenuItemInterface[];

  selectedMenu = -1;


  constructor(private platform: Platform, private splashScreen: SplashScreen,
    private statusBar: StatusBar, private router: Router,
    private authService: AuthService,
    private loadCtrl: LoadingController) {
    this.initializeApp();
  }


  async initializeApp() {
    await this.platform.ready();
    const load =
      await this.loadCtrl.create({ message: 'Conectando con el Servidor...' });
    await load.present();
    await this.authService.setUser();
    this.initializeMenu();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((data: NavigationEnd) => {
      this.selectedMenu = this.appPages.findIndex(item => data.urlAfterRedirects.indexOf(item.url) > -1);
    });
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    load.dismiss();
  }

  initializeMenu() {
    this.appPages = [
      { isDivisor: false, title: 'Ventas', url: '/ventas', icon: 'cart' },
      { isDivisor: false, title: 'Clientes', url: '/clientes', icon: 'people' },
      { isDivisor: false, title: 'Articulos', url: '/articulos', icon: 'shirt' },
      { isDivisor: true },
      {
        isDivisor: false,
        title: 'Configuracion',
        url: '/configuracion',
        icon: 'settings'
      },
      { isDivisor: true },
    ];
  }

  async logout() { return await this.authService.logout(); }
}
