import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteInterface } from 'src/app/models/Cliente';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, OnDestroy {
  clientes: ClienteInterface[];
  private sub: Subscription;
  constructor(private navCtrl: NavController, private clienteS: ClienteService) { }

  ngOnInit() {
    this.sub = this.clienteS.getAll().subscribe(clientes => this.clientes = clientes);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
