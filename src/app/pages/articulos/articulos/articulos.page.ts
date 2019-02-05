import {
  ArticulosAMFormComponent
} from './../../../components/articulos/articulos-amform/articulos-amform.component';
import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-articulos',
  templateUrl: 'articulos.page.html',
  styleUrls: ['articulos.page.scss']
})
export class ArticulosPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}
  ngOnInit() {}

  async addArticulo() {
    const modal = await this.modalCtrl.create(
        {component: ArticulosAMFormComponent, backdropDismiss: false});
    await modal.present();
  }
}
