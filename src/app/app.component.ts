import { AuthService } from './services/auth/auth.service';
import { UserInterface } from './models/User';
import { Observable } from 'rxjs';
import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {callbackify} from 'util';

@Component({selector: 'app-root', templateUrl: 'app.component.html'})
export class AppComponent {
  public appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    {title: 'List', url: '/list', icon: 'list'},
  ];

  user: Observable<UserInterface>;

  constructor(private platform: Platform, private splashScreen: SplashScreen,
              private statusBar: StatusBar, private authService: AuthService) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.user = this.authService.user;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
