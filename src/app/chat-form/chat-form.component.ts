import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: string;
  file: string;
  url: any;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.url = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
    this.url = (<FileReader>e.target).result;
    };
  }

  send() {
    this.file = this.url;
    if (this.message && !this.file) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    } else if (this.file && !this.message) {
        this.chatService.sendFile(this.file);
        this.file = '';
        this.url = '';
    } else {
      this.chatService.sendMessageWithFile(this.message, this.file);
      this.message = '';
      this.file = '';
      this.url = '';
    }
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
