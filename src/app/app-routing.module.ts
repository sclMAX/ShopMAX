import {AuthGuard} from './guards/auth.guard';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  {path: 'list', loadChildren: './list/list.module#ListPageModule', canActivate:[AuthGuard]},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' }

];

@NgModule({imports: [RouterModule.forRoot(routes)], exports: [RouterModule]})
export class AppRoutingModule {
}
