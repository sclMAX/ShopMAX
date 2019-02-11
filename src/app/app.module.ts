import {FiltrarArticulosPipe} from './components/pipes/filtrar-articulos.pipe';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from 'src/app/services/auth/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppCoreModule} from './app.core.module';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CustomComponentsModule} from './components/custom-components.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js',
                                 {enabled: environment.production}),
    HttpClientModule,
    AppCoreModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CustomComponentsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
