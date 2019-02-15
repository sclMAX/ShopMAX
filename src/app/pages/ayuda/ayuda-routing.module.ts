import {AuthGuard} from './../../guards/auth.guard';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})

export class AyudaRoutingModule {
}
