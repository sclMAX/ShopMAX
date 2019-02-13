import {ArticuloInterface} from './../../../models/Articulo';
import {
  ArticulosAMFormComponent
} from './../../../components/articulos/articulos-amform/articulos-amform.component';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ModalController, LoadingController} from '@ionic/angular';
import {ArticulosService} from 'src/app/services/articulos.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-articulos',
  templateUrl: 'articulos.page.html',
  styleUrls: ['articulos.page.scss']
})
export class ArticulosPage implements OnInit,
    OnDestroy {
  articulos: ArticuloInterface[];
  private subArticulos: Subscription;

  constructor(private modalCtrl: ModalController,
              private articuloService: ArticulosService) {}

  ngOnInit() {
    this.subArticulos =
        this.articuloService.getAll().subscribe(data => this.articulos = data);
  }

  ngOnDestroy() { this.subArticulos.unsubscribe(); }

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
}
