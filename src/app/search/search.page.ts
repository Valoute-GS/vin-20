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
      console.log(allWine.data().wines.winery);
      allWine.data().wines.winery.forEach(doc => {
        this.wine = doc;
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
