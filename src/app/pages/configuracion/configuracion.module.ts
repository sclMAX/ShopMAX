import { ConfiguracionPage } from './configuracion.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfiguracionPage]
})
export class ConfiguracionPageModule {}
