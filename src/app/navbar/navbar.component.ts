import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>;
  userEmail: string;
  isCollapsed: false;
  userId: string;

  constructor(private authService: AuthService) {
    if (sessionStorage.getItem('userId')) {
      this.userId = sessionStorage.getItem('userId');
    }
  }

  ngOnInit() {
    this.authService.authenticateUser().subscribe(authUser => {
      if (authUser) {
        this.userEmail = authUser.email;
        sessionStorage.setItem('userId', authUser.uid);
      }
    });
  }

  logout() {
    this.authService.logout();
    sessionStorage.removeItem('userId');
  }

}
