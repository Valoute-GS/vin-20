import { Component, OnInit, Input } from '@angular/core';
import { WineryService } from '../services/winery.service';
import { wine } from '../types/wine';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @Input() id: String;
  myWine: wine;
  
  constructor(
    private wineryService: WineryService,
    private modalController: ModalController,
    ) { }

  ngOnInit() {
        this.getWines();
  }

  getWines() {
    const wines = this.wineryService.getMyCollection();
    wines.forEach(wine => {
      if (wine.id === this.id) {
        this.myWine = wine;
      }
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  addToCave(id: String) {

  }

}
