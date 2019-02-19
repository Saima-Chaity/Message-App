import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userName: string;
  userEmail: string;
  messageContent: string;
  url: any;
  userImage: any;
  timeStamp: any;
  isOwnMessage: boolean;
  userId: string;


  constructor(private authService: AuthService) {
    if (sessionStorage.getItem('userId')) {
      this.userId = sessionStorage.getItem('userId');
      this.authService.authenticateUser().subscribe(currentUser => {
        if (currentUser) {
            this.isOwnMessage = currentUser.email === this.userEmail;
          }
      });
    }
  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.userName = chatMessage.userName;
    this.userEmail = chatMessage.email;
    this.timeStamp = chatMessage.timeSent;
    this.url = chatMessage.file;
    this.userImage = chatMessage.profilePhoto;
  }
}
