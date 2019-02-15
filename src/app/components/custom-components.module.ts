import {FormsModule, ReactiveFormsModule, NgForm} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {LogoutButtonComponent} from './logout-button/logout-button.component';
import {LoginComponent} from './login/login.component';
import {MenuitemComponent} from './menuitem/menuitem.component';
import {
  ArticulosAMFormComponent
} from './articulos/articulos-amform/articulos-amform.component';
import {FiltrarArticulosPipe} from './pipes/filtrar-articulos.pipe';
import {FiltrarClientesPipe} from './pipes/filtrar-clientes.pipe';
import {AmClienteComponent} from './clientes/am-cliente/am-cliente.component';

@NgModule({
  declarations: [
    LogoutButtonComponent,
    LoginComponent,
    MenuitemComponent,
    ArticulosAMFormComponent,
    FiltrarArticulosPipe,
    FiltrarClientesPipe,
    AmClienteComponent,
  ],
  entryComponents: [
    LogoutButtonComponent,
    LoginComponent,
    MenuitemComponent,
    ArticulosAMFormComponent
  ],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  exports: [
    LogoutButtonComponent,
    LoginComponent,
    MenuitemComponent,
    ArticulosAMFormComponent,
    FiltrarArticulosPipe,
    FiltrarClientesPipe,
    AmClienteComponent,
  ]
})
export class CustomComponentsModule {
}
