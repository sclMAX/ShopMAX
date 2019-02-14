import { ClienteService } from './../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { ClienteInterface } from 'src/app/models/Cliente';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  title: string;
  cliente: ClienteInterface;
  constructor(private navCtrl: NavController, private router: ActivatedRoute, private clienteS: ClienteService) { }

  async ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      try {
        this.title = 'Editar Cliente...';
        this.cliente = await this.clienteS.getOne(id).pipe(take(1)).toPromise();
      } catch (e) {
        // TODO: Controlar Error
        console.error(e);
        this.navCtrl.back();
      }
    } else {
      this.title = 'Nuevo Cliente...';
    }
  }
}
