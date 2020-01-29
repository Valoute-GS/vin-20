import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { SearchPage } from './search.page';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: SearchPage }]),
    Ng2SearchPipeModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
