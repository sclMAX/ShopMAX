import {UserService} from './../../services/user.service';
import {UserInterface} from './../../models/User';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: UserInterface;
  userId: string;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.userData;
    this.userId = this.userService.userId;
  }
}
