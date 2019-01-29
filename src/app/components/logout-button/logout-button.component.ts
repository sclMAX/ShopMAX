import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  logout() { this.authService.logout().then(); }
}
