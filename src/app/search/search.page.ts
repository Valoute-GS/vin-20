import { Component, OnInit } from '@angular/core';
import { WineryService } from '../services/winery.service';
import { wine } from '../types/wine'
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public allWine: wine[] = [] ;
  public wine: wine;
  constructor(
    public wineryService: WineryService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.wineryService.getAllWine().then(allWine => {
      allWine.forEach(doc => {
        this.wine = doc.data();
        this.allWine.push(this.wine);
      });
    });
  }

  async wineDetailsModal(wineId: number) {
    const modal = await this.modalController.create({
      component: DetailsPage,
      componentProps: { id: wineId }
    });
    return await modal.present();
  }

}
