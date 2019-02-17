import { UserService } from '../../services/user.service';
import { UserInterface } from '../../models/User';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  user: UserInterface;
  userId: string;
  form: FormGroup;
  isChanged = false;
  constructor(private userService: UserService, private fb: FormBuilder,
    private toastCtrl: ToastController, private loadCtrl: LoadingController) { }

  ngOnInit() {
    this.user = this.userService.userData;
    this.userId = this.userService.userId;
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      displayName: [],
      phoneNumber: [],
      email: ['', [Validators.required, Validators.email]],
      mp_config: this.fb.group(
        { email: [, [Validators.email]], public_key: [], access_token: [] })
    });
    this.form.patchValue(this.user);
    this.form.valueChanges.subscribe(() => this.isChanged = true);
  }

  async onSubmit() {
    const load = await this.loadCtrl.create({ message: 'Guardando configuraccion...' });
    await load.present();
    const email = this.form.controls['email'].value;
    try {
      if (this.user.email !== email) {
        await this.userService.changeEmail(email);
      }
      this.user = Object.assign(this.user, this.form.value);
      return await this.userService.updateUser(this.user);
    } catch (e) {
      let error_msg: string;
      switch (e.code) {
        case 'auth/invalid-email':
          error_msg = 'El e-mail no es valido!';
          break;
        case 'auth/email-already-in-use':
          error_msg = 'El e-mail ya esta en uso!';
          break;
        case 'auth/requires-recent-login':
          error_msg =
            'Para realizar estos cambios debe Salir del sistema y logearse nuevamente!';
          break;
        default:
          error_msg = e.message;
          break;
      }
      const toast = await this.toastCtrl.create({
        message: error_msg,
        duration: 2000,
        position: 'middle',
      });
      await toast.present();
    } finally {
      load.dismiss();
    }
  }
}
