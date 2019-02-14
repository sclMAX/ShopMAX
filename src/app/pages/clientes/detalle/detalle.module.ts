import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetallePage } from './detalle.page';
import { CustomComponentsModule } from 'src/app/components/custom-components.module';

const routes: Routes = [
  {
    path: '',
    component: DetallePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetallePage]
})
export class DetallePageModule { }
