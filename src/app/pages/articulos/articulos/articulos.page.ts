import { ArticuloInterface } from './../../../models/Articulo';
import {
  ArticulosAMFormComponent
} from './../../../components/articulos/articulos-amform/articulos-amform.component';
import {Component, OnInit} from '@angular/core';
import {ModalController, LoadingController} from '@ionic/angular';
import {ArticulosService} from 'src/app/services/articulos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articulos',
  templateUrl: 'articulos.page.html',
  styleUrls: ['articulos.page.scss']
})
export class ArticulosPage implements OnInit {

  articulos: Observable<ArticuloInterface[]>;

  constructor(private modalCtrl: ModalController,
              private loadCtrl: LoadingController,
              private articuloService: ArticulosService) {}
  ngOnInit() {
    this.articulos = this.articuloService.getAll();
  }

  async addArticulo() {
    const modal = await this.modalCtrl.create({
      component: ArticulosAMFormComponent,
      backdropDismiss: false,
      cssClass: 'articulo-add-modal',
      componentProps: {'articulo': {}}
    });
    await modal.present();
  }
}
