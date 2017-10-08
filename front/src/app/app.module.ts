import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { ServicesService } from './service/services.service';

import { LanchesComponent } from './modulos/lanches/lanches.component';
import { LanchesModalComponent } from './modulos/lanches/lanches.modal';

import { MenuComponent } from './modulos/menu/menu.component';
import { IngredienteComponent } from './modulos/ingrediente/ingrediente.component';

import { httpFactory } from './interceptor/http-factory';

import { routes } from './route';

@NgModule({
  declarations: [
    AppComponent,
    LanchesComponent,
    LanchesModalComponent,
    MenuComponent,
    IngredienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    ModalModule.forRoot()
  ],
  providers: [
    ServicesService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
  entryComponents: [LanchesModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
