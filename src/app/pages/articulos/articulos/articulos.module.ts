import { CustomComponentsModule } from './../../../components/custom-components.module';
import { FiltrarArticulosPipe } from './../../../components/pipes/filtrar-articulos.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ArticulosPage } from './articulos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArticulosPage
      }
    ])
  ],
  declarations: [ArticulosPage]
})
export class ArticulosPageModule {}
