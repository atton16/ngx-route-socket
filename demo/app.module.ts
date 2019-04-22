import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CheckinSocketConfigProvider, CheckinSocket } from './checkin.socket';
import { CheckinComponent } from './checkin.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckinComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CheckinSocketConfigProvider,
    CheckinSocket,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
