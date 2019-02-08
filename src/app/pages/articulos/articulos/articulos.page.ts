import {ArticuloInterface} from './../../../models/Articulo';
import {
  ArticulosAMFormComponent
} from './../../../components/articulos/articulos-amform/articulos-amform.component';
import {Component, OnInit} from '@angular/core';
import {ModalController, LoadingController} from '@ionic/angular';
import {ArticulosService} from 'src/app/services/articulos.service';
import {Observable} from 'rxjs';

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

  ngOnInit() { this.loadData(); }

  async amArticulo(articulo?: ArticuloInterface) {
    const modal = await this.modalCtrl.create({
      component: ArticulosAMFormComponent,
      backdropDismiss: false,
      cssClass: 'articulo-add-modal'
    });
    if (articulo) {
      modal.componentProps = {'articulo': articulo};
    }
    await modal.present();
  }

  async removeArticulo(articulo: ArticuloInterface) {
    return await this.articuloService.remove(articulo.id);
  }

  async loadData() { return this.articulos = this.articuloService.getAll(); }
}
