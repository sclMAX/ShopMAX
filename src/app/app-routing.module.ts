import {AuthGuard} from './guards/auth.guard';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'ventas', pathMatch: 'full'},
  {
    path: 'articulos',
    loadChildren:
        './pages/articulos/articulos/articulos.module#ArticulosPageModule',
    canActivate: [AuthGuard]
  },
  {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  {
    path: 'configuracion',
    loadChildren:
        './pages/configuracion/configuracion.module#ConfiguracionPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'ventas',
    loadChildren: './pages/ventas/ventas/ventas.module#VentasPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'procesar-pago/:status',
    loadChildren:
        './pages/ventas/procesar-pago/procesar-pago.module#ProcesarPagoPageModule'
  },
  {
    path: 'clientes',
    loadChildren:
        './pages/clientes/clientes-routing.module#ClientesRoutingModule',
    canActivate: [AuthGuard]
  },
  { path: 'ayuda', loadChildren: './pages/ayuda/ayuda-routing.module#AyudaRoutingModule' }




];

@NgModule({imports: [RouterModule.forRoot(routes)], exports: [RouterModule]})
export class AppRoutingModule {
}
