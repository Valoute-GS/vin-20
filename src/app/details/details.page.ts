import { Component, OnInit } from '@angular/core';
import { WineryService } from '../services/winery.service';
import { wine } from '../types/wine';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  wines:wine[];
  id = 0;

  constructor(private wineryService: WineryService) { }

  ngOnInit() {
    this.getWines();
  }

  getWines():void {
    this.wines = this.wineryService.getMyCollection();
  }

}
