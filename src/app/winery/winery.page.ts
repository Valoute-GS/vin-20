import { Component, OnInit } from '@angular/core';
import { wine } from './../types/wine'
import { WineryService } from '../services/winery.service';

@Component({
  selector: 'app-winery',
  templateUrl: './winery.page.html',
  styleUrls: ['./winery.page.scss'],
})
export class WineryPage implements OnInit {

  winesList: wine[][];

  constructor(public wineryService: WineryService) { }

  ngOnInit() {
    this.winesList = [];
    const wines = this.wineryService.getMyCollection();
    let j = 0;
    for (let i = 0; j < wines.length; i++) {
      if (i % 2 === 0) {
        this.winesList[i] = wines.slice(j, j + 3);
        j += 3;
      } else {
        this.winesList[i] = wines.slice(j, j + 2);
        j += 2;
      }
    }
  }

}
