import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth/auth.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {
  constructor(private authService: AuthService,
              private navCtrl: NavController) {}

  ngOnInit() {}

  logout() {
    this.authService.logout().then(() => this.navCtrl.navigateRoot('login'));
  }
}
