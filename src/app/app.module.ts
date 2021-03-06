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
import {TabsPageModule} from './tabs/tabs.module';
import { IonicStorageModule } from '@ionic/storage';
import { ProviderService } from './services/provider.service';
import { File } from '@ionic-native/file/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [DetailsPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    DetailsPageModule,
    TabsPageModule],
  providers: [
    WineryService,
    ProviderService,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
