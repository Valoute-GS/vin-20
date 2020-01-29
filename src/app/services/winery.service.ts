import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from '../services/user/auth.service';
import { Wine } from '../types/wine';


@Injectable({
  providedIn: 'root'
})
export class WineryService {

  public allWines: firebase.firestore.DocumentData;
  public userProfile: firebase.firestore.DocumentData;
  public wine: firebase.firestore.DocumentData;
  public currentUser: firebase.User;
  id: Promise<any>;

  constructor(public storage: Storage, private authService: AuthService) {
  }

  async getMyCollection(id: string) {
    this.userProfile = firebase.firestore().collection('users').doc(id).get();
    return this.userProfile;
  }

  getAllWine() {
    this.allWines = firebase.firestore().collection('winery').doc('wines').get();
    return this.allWines;
  }

  async addToMyCollection(myWine: Wine): Promise<void> {
    this.storage.get('id').then((val) => {
      this.id = val;
    });
    this.userProfile = firebase.firestore().collection('users').doc(await this.id).update({
      cave : firebase.firestore.FieldValue.arrayUnion(Wine)
    });
  }

  getWine(id: string) {
    this.wine = firebase.firestore().collection('winery').where('id', '==', id).get();
    return this.wine;
  }
}
