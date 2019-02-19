import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  userName: string;
  email: string;
  url: any;
  profilePhoto: any;
  uid: string;
  file: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authService.authenticateUser().subscribe(currentUser => {
      if (currentUser) {
        this.authService.getUserDetails(currentUser.uid).valueChanges().subscribe(authUser => {
          this.userName = authUser['userName'];
          this.email = authUser['email'];
          this.uid = currentUser.uid;
          this.url = authUser['profilePhoto'];
        });
      }
    });
  }
  onFileUpload(event) {
    this.url = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
    this.url = (<FileReader>e.target).result;
    };
  }

  save() {
    if (sessionStorage.getItem('userId')) {
      this.uid = sessionStorage.getItem('userId');
      this.profilePhoto = this.url;
      this.authService.saveProfileSettings(this.profilePhoto, this.uid);
      this.profilePhoto = '';
      this.url = '';
    }
  }
}
