import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProcesarPagoPage } from './procesar-pago.page';

const routes: Routes = [
  {
    path: '',
    component: ProcesarPagoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProcesarPagoPage]
})
export class ProcesarPagoPageModule {}
