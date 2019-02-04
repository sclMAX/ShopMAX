import {NavParams} from '@ionic/angular';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-articulos',
  templateUrl: 'articulos.page.html',
  styleUrls: ['articulos.page.scss']
})
export class ArticulosPage implements OnInit {
  data: any;
  constructor(private navParams: NavParams) {
    this.data = this.navParams.get('data');
  }
  ngOnInit() {}
}
