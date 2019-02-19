import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  email: string;
  password: string;
  userId: any;
  users: any;
  invalidEmail: string;
  errors: any;

  constructor(private authService: AuthService,
    private chatService: ChatService) { }

  login() {
    this.chatService.getUserList().valueChanges().subscribe(
      user => {
        this.users = user;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]['email'] === this.email) {
            this.authService.login(this.email, this.password);
            break;
          } else if ( i === this.users.length - 1) {
            this.invalidEmail = 'Email not found';
          }
        }
      }
    );
  }
}
