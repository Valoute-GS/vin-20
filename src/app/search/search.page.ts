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

/**
 * Page de recherche de vins
 */
export class SearchPage implements OnInit {

  public allWine: Wine[] = [] ;
  public wine: Wine;
  public searchText: string;
  constructor(
    public wineryService: WineryService,
    public modalController: ModalController
  ) { }

  ngOnInit() {

    // Récupérer tous les vins
    this.wineryService.getAllWine().then(allWine => {
      // Parcours la liste de vin recupéré et les transforme en objet vin
      allWine.data().wines.winery.forEach(doc => {
        this.wine = doc;
        this.allWine.push(this.wine);
      });
    });
  }

  // Créer un modal contenant les informations du vin
  async wineDetailsModal(wine: Wine) {
    const modal = await this.modalController.create({
      component: DetailsPage,
      componentProps: { wine }
    });
    return await modal.present();
  }

}
