import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WineryPage } from './winery.page';

const routes: Routes = [
  {
    path: '',
    component: WineryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WineryPageRoutingModule {}
