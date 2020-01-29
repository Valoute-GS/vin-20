import { Injectable } from '@angular/core';
import { WineryPage } from '../winery/winery.page';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  winery: WineryPage;

  constructor() { }


  save(winery:WineryPage){
    this.winery = winery;
  }
  get(){
    return this.winery;
  }
}
