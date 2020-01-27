import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'main',
    component: TabsPage,
    children: [
      {
        path: 'winery',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../winery/winery.module').then(m => m.WineryPageModule)
          }
        ]
      },
      {
        path: 'details',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../details/details.module').then(m => m.DetailsPageModule)
          }
        ]
      },

      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'main/winery',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'main/winery',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
