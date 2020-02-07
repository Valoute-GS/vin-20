import { Injectable } from '@angular/core';
import { WineryPage } from '../winery/winery.page';

@Injectable({
  providedIn: 'root'
})

// Service de partage de la page winery
export class ProviderService {

  winery: WineryPage;

  constructor() { }


  save(winery: WineryPage) {
    this.winery = winery;
  }
  get() {
    return this.winery;
  }
}
