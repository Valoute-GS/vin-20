import { Component, OnInit } from '@angular/core';
import { WineryService } from '../services/winery.service';
import { Wine } from '../types/wine'
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public allWine: Wine[] = [] ;
  public wine: Wine;
  constructor(
    public wineryService: WineryService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.wineryService.getAllWine().then(allWine => {
      allWine.data().wines.winery.forEach(doc => {
        this.wine = doc;
        this.allWine.push(this.wine);
      });
    });
  }

  async wineDetailsModal(wine: Wine) {
    const modal = await this.modalController.create({
      component: DetailsPage,
      componentProps: { wine: wine }
    });
    return await modal.present();
  }

}
