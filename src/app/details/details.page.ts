import { Component, OnInit, Input } from '@angular/core';
import { WineryService } from '../services/winery.service';
import { wine } from '../types/wine';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @Input() id: string;
  myWine: wine;
  userId;

  constructor(
    private wineryService: WineryService,
    private modalController: ModalController,
    public storage: Storage
    ) { }

  ngOnInit() {
        this.getWines();
  }

  async getWines() {
    this.storage.get('id').then((val) => { 
      this.userId = val;
    });
    this.wineryService.getWine(await this.id).then(
      (wines) => {
        console.log(wines);
       // this.myWine = wines;
      });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  addToCave(id: string) {

  }

}
