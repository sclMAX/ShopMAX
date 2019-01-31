import {UserInterface} from './../../models/User';
import {AuthService} from './../../services/auth/auth.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: Observable<UserInterface>;
  constructor(private authService: AuthService) {}

  ngOnInit() { this.user = this.authService.user; }
}
