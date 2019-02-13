import {AuthGuard} from './../../guards/auth.guard';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [AuthGuard]
  },
  {path: 'detalle', loadChildren: './detalle/detalle.module#DetallePageModule'},
  {path: 'detalle/:id', loadChildren: './detalle/detalle.module#DetallePageModule'},
  {path: '**', redirectTo: 'list', pathMatch: 'full'},
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})

export class ClientesRoutingModule {
}
