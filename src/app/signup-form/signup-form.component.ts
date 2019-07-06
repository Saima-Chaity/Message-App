import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  email: string;
  password: string;
  userName: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  signup() {
    const email = this.email;
    const password = this.password;
    const userName = this.userName;
    this.authService.signup(email, userName, password)
    .then(resolve => this.router.navigate(['/chat']))
    .then(reload => window.location.href = '/chat')
    .catch (
      error => this.errorMessage = error.message
    );
  }
}
