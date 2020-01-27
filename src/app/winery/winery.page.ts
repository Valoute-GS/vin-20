import { Component, OnInit } from '@angular/core';
import { wine } from './../types/wine';
import { WineryService } from '../services/winery.service';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-winery',
  templateUrl: './winery.page.html',
  styleUrls: ['./winery.page.scss'],
})
export class WineryPage implements OnInit {

  winesList: wine[][];
  id: Promise<any>;

  constructor(
    public wineryService: WineryService,
    public modalController: ModalController,
    public storage: Storage
    ) { }

  ngOnInit() {
    this.storage.get('id').then((val) => {
      this.id = val;
    });;
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

  async wineDetailsModal(wineId: number) {
    const modal = await this.modalController.create({
      component: DetailsPage,
      componentProps: { id: wineId }
    });
    return await modal.present();
  }

}
