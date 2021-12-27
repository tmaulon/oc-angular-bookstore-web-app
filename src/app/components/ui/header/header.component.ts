import { Component, OnInit } from '@angular/core';
import { getApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthService } from './../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    onAuthStateChanged(getAuth(getApp()), (user) => {
      console.log('in onAuthStateChanged, user :', user);
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  onSignOut() {
    this.authService.signOutUser();
  }
}
