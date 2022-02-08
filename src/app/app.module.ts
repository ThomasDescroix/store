import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductData } from './products/services/prodct.data';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    environment.production 
      ? []  
      : StoreDevtoolsModule.instrument({
        maxAge: 25
      }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
