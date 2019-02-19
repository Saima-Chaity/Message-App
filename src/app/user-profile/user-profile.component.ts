import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userName: string;
  status: string;
  email: string;
  profilePhoto: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authenticateUser().subscribe(currentUser => {
      if (currentUser) {
        this.authService.getUserDetails(currentUser.uid).valueChanges().subscribe(authUser => {
          this.userName = authUser['userName'];
          this.status = 'online';
          this.email = authUser['email'];
          this.profilePhoto = authUser['profilePhoto'];
        });
      }
    });
  }
}
