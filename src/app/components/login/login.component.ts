import {AuthService} from './../../services/auth/auth.service';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe();
  }

  onSubmit(event) {
    console.log('Login...');
    this.authService.login(this.loginForm.value)
        .then(data => {
          console.log('OK', data);
          console.log('Login OK');
        })
        .catch(error => console.log('ERR:', error));
  }
}
