import {ModalController, NavController} from '@ionic/angular';
import {Component, OnInit} from '@angular/core';
import {LoginComponent} from 'src/app/components/login/login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private modalCtrl: ModalController,
              private navCtrl: NavController) {}

  ngOnInit() { this.presentModal().then(); }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      backdropDismiss: false,
      showBackdrop: false,
      cssClass: 'login-modal'
    });
    modal.onDidDismiss().then(() => this.navCtrl.navigateRoot('home'));
    return await modal.present();
  }
}
