import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/components/login/login.component';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() { }

  ionViewWillEnter() { this.presentModal(); }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      backdropDismiss: false,
      showBackdrop: false,
      cssClass: 'login-modal'
    });
    modal.onDidDismiss().then(async () => {
      for (let i = 0; i < 100; i++) { }
      return await this.router.navigate(['/']);
    });
    return await modal.present();
  }
}
