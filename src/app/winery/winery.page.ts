import {Component, OnInit} from '@angular/core';
import {Wine} from '../types/wine';
import {WineryService} from '../services/winery.service';
import {ModalController} from '@ionic/angular';
import {DetailsPage} from '../details/details.page';
import {Storage} from '@ionic/storage';
import * as firebase from 'firebase/app';
import {ProviderService} from '../services/provider.service';
import {File} from '@ionic-native/file/ngx';

@Component({
    selector: 'app-winery',
    templateUrl: './winery.page.html',
    styleUrls: ['./winery.page.scss'],
})

/**
 * Page de gestion de la cave personnelle
 */
export class WineryPage implements OnInit {

    winesList: Wine[][] = [];
    winesLocal: Wine[] = [];
    id: string;
    name: string;

    constructor(
        public wineryService: WineryService,
        public modalController: ModalController,
        public storage: Storage,
        public provider: ProviderService,
        private file: File
    ) {
    }

    async ngOnInit() {

        // Charge le profil de l'utilisateur
        this.storage.get('id').then((val) => {
            this.id = val;
            console.log(this.id);
            // Requête le nom de l'utilisateur
            firebase.firestore().collection('users').doc(this.id).get().then((data) => {
                this.name = data.get('name');
            });

            // Requête les vins de l'utilisateur
            this.wineryService.getMyCollection(this.id).then((wines) => {
                if (wines.data() !== undefined) {
                    this.winesLocal = wines.data().cave;
                    this.parseWines(this.winesLocal);
                }
            });
        });

        // Sauvegarde la page dans le provideur
        this.provider.save(this);
    }

    // Permet d'afficher la modal
    async wineDetailsModal(wine: Wine) {

        // créer la page de détail du vin
        const modal = await this.modalController.create({
            component: DetailsPage,
            componentProps: {wine}
        });
        return await modal.present();
    }

    // sépare les vins de la liste wines en 2 puis 3 alterné pour l'affichage dans la cave
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

    // Sauvegarde la cave dans un fichier
    storeData() {

        // transforme en texte la cave
        let jsonString = JSON.stringify(this.winesLocal);

        let fileDir = this.file.dataDirectory;
        console.log(fileDir);

        let filename = 'save.json';
        // écrit un fichier en local
        this.file.writeFile(fileDir, filename, jsonString, {replace: true});
    }

    // Recupère la cave via un fichier local
    restoreData() {
        let fileDir = this.file.dataDirectory;
        let filename = 'save.json';
        // lit le fichier local
        this.file.readAsText(fileDir, filename).then(data => {
            // transforme le fichier en JSON
            this.winesLocal = JSON.parse(data);
            this.parseWines(this.winesLocal);
        });
    }
}
