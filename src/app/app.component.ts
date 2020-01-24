import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    firebase.initializeApp(environment.firebase);
  }
}
