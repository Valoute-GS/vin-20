import { Component, OnInit, Input } from '@angular/core';
import { WineryService } from '../services/winery.service';
import { Wine } from '../types/wine';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { WineryPage } from '../winery/winery.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @Input() wine: Wine;
  @Input() parent : WineryPage;
  isMine:boolean;
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
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  addToCave(id: string) {
    this.parent.winesLocal.push(this.wine);
    this.parent.parseWines(this.parent.winesLocal);
    this.wineryService.addToMyCollection(this.userId, this.wine);
  }

}
