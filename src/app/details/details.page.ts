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
  @Input() id: String;
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
    });;
    const wines = await this.wineryService.getMyCollection(this.userId);
    
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
