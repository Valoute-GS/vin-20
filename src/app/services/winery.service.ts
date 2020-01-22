import { Injectable } from '@angular/core';
import { wine } from '../types/wine';

@Injectable({
  providedIn: 'root'
})
export class WineryService {

  constructor() {

  }


   getMyCollection(): wine[]{
    return [
      {id:1, price : 354,name :"Vin1", note : 20 , description : "Ceci est une description", type:"red"},
      {id:2, price : 12,name :"Vin2", note : 15 , description : "Ceci est une description", type:"white"},
      {id:3, price : 45,name :"Vin3", note : 12 , description : "Ceci est une description", type:"rosé"},
      {id:4, price : 68,name :"Vin4", note : 18 , description : "Ceci est une description", type:"red"},
      {id:5, price : 56,name :"Vin5", note : 14 , description : "Ceci est une description", type:"rosé"},
      {id:6, price : 30,name :"Vin6", note : 13 , description : "Ceci est une description", type:"red"},
      {id:7, price : 25,name :"Vin7", note : 17 , description : "Ceci est une description", type:"red"},
      {id:8, price : 12,name :"Vin8", note : 8 , description : "Ceci est une description", type:"rosé"},
      {id:9, price : 5,name :"Vin9", note : 2 , description : "Ceci est une description", type:"red"},
      {id:0, price : 56,name :"Vin10", note : 5 , description : "Ceci est une description", type:"white"},
    ]
  }

}
