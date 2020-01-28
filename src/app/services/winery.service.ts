import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from '../services/user/auth.service';


@Injectable({
  providedIn: 'root'
})
export class WineryService {
  public allWines: firebase.firestore.DocumentData;
  public userProfile: firebase.firestore.DocumentData;
  public currentUser: firebase.User;
  id: Promise<any>;

  constructor(public storage: Storage, private authService: AuthService) {
  }

  async getMyCollection(id:any){
    this.storage.get('id').then((val) => {
      this.id = val;
    });;    
    this.userProfile = firebase.firestore().collection("users").doc(await this.id).get();        
    return this.userProfile;
  }

  getAllWine(){
    this.allWines = firebase.firestore().collection("winery").get();
    return this.allWines;
}
}
