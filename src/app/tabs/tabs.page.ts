import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  showSearchBar:boolean = false;
  
  constructor() {}

  toggleSearchbar() {
    this.showSearchBar = !this.showSearchBar;
  }

}
