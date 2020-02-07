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
        this.storage.get('id').then((val) => {
            this.id = val;
            console.log(this.id);
            firebase.firestore().collection('users').doc(this.id).get().then((data) => {
                this.name = data.get('name');
            });
            this.wineryService.getMyCollection(this.id).then((wines) => {
                if (wines.data() !== undefined) {
                    this.winesLocal = wines.data().cave;
                    this.parseWines(this.winesLocal);
                }
            });
        });
        this.provider.save(this);
    }

    async wineDetailsModal(wine: Wine) {
        const modal = await this.modalController.create({
            component: DetailsPage,
            componentProps: {wine: wine}
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

    storeData() {
        let jsonString = JSON.stringify(this.winesLocal);
        let fileDir = this.file.dataDirectory;
        console.log(this.file)
        let filename = 'save.json';
        this.file.writeFile(fileDir, filename, jsonString, {replace: true});
    }

    restoreData() {
        let fileDir = this.file.dataDirectory;
        let filename = 'save.json';
        this.file.readAsText(fileDir, filename).then(data => {
            this.winesLocal = JSON.parse(data);
            this.parseWines(this.winesLocal);
        });
    }
}
