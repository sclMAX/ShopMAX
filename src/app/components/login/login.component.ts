import {AuthService} from './../../services/auth/auth.service';
import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {
  ModalController,
  LoadingController,
  ToastController
} from '@ionic/angular';
@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService,
              private modalCtrl: ModalController,
              private loadCtrl: LoadingController,
              private toastCtrl: ToastController) {}


  async onSubmit(event) {
    const load = await this.loadCtrl.create({message: 'Autenticando...'});
    await load.present();
    try {
      const loginStatus = await this.authService.login(this.loginForm.value);
      if (loginStatus) {
        await this.modalCtrl.dismiss();
      }
      load.dismiss();
    } catch (e) {
      const msg = this.authService.processLoginError(e);
      await load.dismiss();
      const toast = await this.toastCtrl.create(
          {message: msg, duration: 2000, position: 'middle'});
      await toast.present();
    }
  }

  async resetPassword() {
    const load = await this.loadCtrl.create({message: 'Recuperando Acceso...'});
    await load.present();
    const toast = await this.toastCtrl.create({position: 'middle'});
    try {
      const email = this.loginForm.value['email'];
      await this.authService.resetPassword(email);
      toast.message =
          `Se envio un email a ${email} con las instrucciones para recuperar el acceso!`;
      toast.closeButtonText = 'Ok';
      toast.showCloseButton = true;
    } catch (e) {
      toast.message = this.authService.processLoginError(e);
      toast.duration = 2000;
    }
    await load.dismiss();
    return await toast.present();
  }
}
