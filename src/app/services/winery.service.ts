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

// Service de gestion de la cave d'utilisateur
export class WineryService {

  public allWines: firebase.firestore.DocumentData;
  public userProfile: firebase.firestore.DocumentData;
  public wine: firebase.firestore.DocumentData;
  public currentUser: firebase.User;
  id: Promise<any>;

  constructor(public storage: Storage, private authService: AuthService) {
  }


  // Recupère la collection de l'utilisateur
  async getMyCollection(id: string) {
    this.userProfile = firebase.firestore().collection('users').doc(id).get();
    return this.userProfile;
  }

  // Récupère tous les vins
  getAllWine() {
    this.allWines = firebase.firestore().collection('winery').doc('wines').get();
    return this.allWines;
  }

  // Ajoute un vin dans la collection de l'utilisateur
  async addToMyCollection(id: string, myWine: Wine): Promise<void> {
    this.userProfile = firebase.firestore().collection('users').doc(id).update({
      cave : firebase.firestore.FieldValue.arrayUnion(myWine)
    });
  }

  // Enlève un vin dans la collection de l'utilisateur
  async removeToMyCollection(id: string, myWine: Wine): Promise<void> {
    this.userProfile = firebase.firestore().collection('users').doc(id).update({
      cave : firebase.firestore.FieldValue.arrayRemove(myWine)
    });
  }

  // Récupère un vin spécifique (outdated)
  getWine(id: string) {
    this.wine = firebase.firestore().collection('winery').where('id', '==', id).get();
    return this.wine;
  }
}
