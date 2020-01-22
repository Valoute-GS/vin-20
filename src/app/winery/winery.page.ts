import { Component, OnInit } from '@angular/core';
import { wine } from './../types/wine'
import { WineryService } from '../services/winery.service';

@Component({
  selector: 'app-winery',
  templateUrl: './winery.page.html',
  styleUrls: ['./winery.page.scss'],
})
export class WineryPage implements OnInit {

  wines : wine[];

  constructor(public wineryService: WineryService) { }

  ngOnInit() {
    this.wines = this.wineryService.getMyCollection();
    
  }

}
