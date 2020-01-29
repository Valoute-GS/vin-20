import { Component, OnInit, Input } from '@angular/core';
import { WineryService } from '../services/winery.service';
import { Wine } from '../types/wine';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { WineryPage } from '../winery/winery.page';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @Input() wine: Wine;
  winery: WineryPage;
  isMine:boolean;
  userId;

  constructor(
    private wineryService: WineryService,
    private modalController: ModalController,
    public storage: Storage,
    public provider: ProviderService
    ) { }

  ngOnInit() {
    this.winery = this.provider.get();
    this.getWines();
    this.isMineUp();
  }

  async getWines() {
    this.storage.get('id').then((val) => {
      this.userId = val;
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  public isMineUp(){
    this.isMine = false;
    this.winery.winesLocal.forEach(wine => {
      if(this.wine.title === wine.title){
        this.isMine = true;
      }
    });  
  }

  addToCave() {
    this.winery.winesLocal.push(this.wine);
    this.winery.parseWines(this.winery.winesLocal);
    this.wineryService.addToMyCollection(this.userId, this.wine);
    this.isMineUp()
  }

  deleteFromCave(id: string) {
    this.winery.winesLocal = this.winery.winesLocal.filter(myWine => myWine.id !== this.wine.id);
    this.winery.parseWines(this.winery.winesLocal);
    this.wineryService.removeToMyCollection(this.userId, this.wine);
    this.isMineUp()
  }

}
