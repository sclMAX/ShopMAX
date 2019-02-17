import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-procesar-pago',
  templateUrl: './procesar-pago.page.html',
  styleUrls: ['./procesar-pago.page.scss'],
})
export class ProcesarPagoPage implements OnInit {
  parametro: any;
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.parametro = JSON.parse(this.router.snapshot.paramMap.get('status'));
  }
}
