import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WineryService } from './services/winery.service';
import { DetailsPage } from './details/details.page';
import { DetailsPageModule } from './details/details.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {TabsPageModule} from "./tabs/tabs.module";


@NgModule({
  declarations: [AppComponent],
  entryComponents: [DetailsPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, DetailsPageModule,TabsPageModule],
  providers: [
    WineryService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
