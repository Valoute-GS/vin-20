import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WineryPageRoutingModule } from './winery-routing.module';

import { WineryPage } from './winery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WineryPageRoutingModule
  ],
  declarations: [WineryPage]
})
export class WineryPageModule {}
