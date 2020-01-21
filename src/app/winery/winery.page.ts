import { Component, OnInit } from '@angular/core';
import { wine } from './../types/wine'

@Component({
  selector: 'app-winery',
  templateUrl: './winery.page.html',
  styleUrls: ['./winery.page.scss'],
})
export class WineryPage implements OnInit {

  wines : wine[];

  constructor() { }

  ngOnInit() {

    this.wines = [

    ]
  }

}
