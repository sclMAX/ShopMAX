import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'indice', pathMatch: 'full' },
  {
    path: 'indice',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: '**', redirectTo: 'indice', pathMatch: 'full' },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })

export class AyudaRoutingModule {
}
