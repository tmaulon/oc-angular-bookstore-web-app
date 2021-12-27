import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'oc-bookstore-web-app';

  constructor() {
    const config = {
      apiKey: 'AIzaSyBpbU0ssa2dQo5G74-QH94cVbNkNAJtLQs',
      authDomain: 'oc-angular-bookstore-web-app.firebaseapp.com',
      projectId: 'oc-angular-bookstore-web-app',
      storageBucket: 'oc-angular-bookstore-web-app.appspot.com',
      messagingSenderId: '431789211530',
      appId: '1:431789211530:web:b1f31b2b5596d88b47d273',
      measurementId: 'G-H83FR2P3SQ',
    };
    initializeApp(config);
  }
}
