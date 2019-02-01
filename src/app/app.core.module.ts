import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from 'src/environments/environment';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
  ],
  providers: [],
})
export class AppCoreModule {
}
