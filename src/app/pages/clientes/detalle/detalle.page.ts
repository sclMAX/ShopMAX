import {ClienteService} from './../../../services/cliente.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  title: string;
  cliente_id: string;
  constructor(private router: ActivatedRoute) {}

  async ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Editar Cliente...';
      this.cliente_id = id;
    } else {
      this.title = 'Nuevo Cliente...';
    }
  }
}
