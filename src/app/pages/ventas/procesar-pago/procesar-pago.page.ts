import {Component, OnInit} from '@angular/core';
import {NavParams} from '@ionic/angular';

@Component({
  selector: 'app-procesar-pago',
  templateUrl: './procesar-pago.page.html',
  styleUrls: ['./procesar-pago.page.scss'],
})
export class ProcesarPagoPage implements OnInit {
  constructor(private navParam: NavParams) {}

  ngOnInit() { console.log('param:', this.navParam.data); }
}
