import { FormsModule, ReactiveFormsModule, NgForm} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LogoutButtonComponent, LoginComponent],
  entryComponents: [LogoutButtonComponent, LoginComponent],
  imports: [
    CommonModule, IonicModule, FormsModule, ReactiveFormsModule
  ],
  exports: [LogoutButtonComponent, LoginComponent]
})
export class CustomComponentsModule { }
