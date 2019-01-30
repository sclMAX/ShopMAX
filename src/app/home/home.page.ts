import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() { }
}
