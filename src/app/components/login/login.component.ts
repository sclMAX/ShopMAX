import {AuthService} from './../../services/auth/auth.service';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService,
              private modalCtrl: ModalController) {}

  ngOnInit() {}

  onSubmit(event) {
    console.log('Login...');
    this.authService.login(this.loginForm.value)
        .then(() => this.modalCtrl.dismiss())
        .catch(error => console.log('ERR:', error));
  }

  resetPassword() {
    this.authService.resetPassword(this.loginForm.value['email'])
        .then(() => { console.log('RESET OK'); })
        .catch(err => console.log('Error:', err));
  }
}
