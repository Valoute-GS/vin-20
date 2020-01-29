import { Component, OnInit } from '@angular/core';
import { Wine } from './../types/wine';
import { WineryService } from '../services/winery.service';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { User } from '../types/user';
@Component({
  selector: 'app-winery',
  templateUrl: './winery.page.html',
  styleUrls: ['./winery.page.scss'],
})
export class WineryPage implements OnInit {

  winesList: Wine[][];
  id: string;
  name: string;

  constructor(
    public wineryService: WineryService,
    public modalController: ModalController,
    public storage: Storage
    ) {}

  async ngOnInit() {
    this.storage.get('id').then((val) => {
      this.id = val;
      firebase.firestore().collection('users').doc(this.id).get().then((data) => {
          this.name = data.get('name');
      });
      this.wineryService.getMyCollection(this.id).then((wines) => {
        this.parseWines(wines.data().cave);
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

  async parseWines(wines) {
    this.winesList = [];
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
