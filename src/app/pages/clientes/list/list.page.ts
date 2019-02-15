import {Component, OnInit, OnDestroy} from '@angular/core';
import {ClienteInterface} from 'src/app/models/Cliente';
import {
  NavController,
  LoadingController,
  AlertController
} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {ClienteService} from 'src/app/services/cliente.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit,
    OnDestroy {
  clientes: ClienteInterface[];
  private sub: Subscription;
  constructor(private navCtrl: NavController, private clienteS: ClienteService,
              private loadCtrl: LoadingController,
              private alertCtrl: AlertController) {}

  ngOnInit() {
    this.sub =
        this.clienteS.getAll().subscribe(clientes => this.clientes = clientes);
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

  async remove(cliente: ClienteInterface) {
    const alert = await this.alertCtrl.create({
      message: `Esta seguro que desea <strong style="color:red;">Eliminar</strong> el Cliente: <strong>${cliente.nombre}</strong>?`,
      backdropDismiss: false,
      buttons: [
        {text: 'Cancelar', role: 'cancel'},
        {
          text: 'Aceptar',
          role: 'ok',
          handler: async() => await this.clienteS.remove(cliente.id) // TODO: Controlar Errors
        }
      ]
    });
    return await alert.present();
  }
}
