import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ventas', pathMatch: 'full' },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'user',
    loadChildren: './pages/user/user.module#UserPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'ventas', loadChildren: './pages/ventas/ventas/ventas.module#VentasPageModule', canActivate: [AuthGuard] }


];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {
}
