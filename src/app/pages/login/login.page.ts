import {ModalController} from '@ionic/angular';
import {Component, OnInit} from '@angular/core';
import {LoginComponent} from 'src/app/components/login/login.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}

  ionViewWillEnter() { this.presentModal().then(); }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      backdropDismiss: false,
      showBackdrop: false,
      cssClass: 'login-modal'
    });
    modal.onDidDismiss().then(() => {
      console.log('Logged!');
      this.router.navigate(['home']);
    });
    return await modal.present();
  }
}
