import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../models/chat-message.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: Array<ChatMessage>;

  constructor(private chatService: ChatService,
    private authService: AuthService) { }

  ngOnInit() {
    this.chatService.getAllMessages().valueChanges().subscribe(
      data => {
        this.feed = data;
      }
    );
  }

  ngOnChanges() {
    this.chatService.getAllMessages().valueChanges().subscribe(
      data => {
        this.feed = data;
      }
    );
  }
}
