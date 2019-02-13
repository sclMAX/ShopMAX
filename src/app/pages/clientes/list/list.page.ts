import {Component, OnInit} from '@angular/core';
import {ClienteInterface} from 'src/app/models/Cliente';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  clientes: ClienteInterface[];
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}
}
