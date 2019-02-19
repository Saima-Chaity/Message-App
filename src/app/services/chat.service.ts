import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  email: string;
  userName: string;
  userImage: any;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== null && auth !== undefined) {
        this.user = auth;
      }
      this.getUser().valueChanges().subscribe(currentUser => {
        this.userName = currentUser['userName'];
      });
      this.getUser().valueChanges().subscribe(currentUser => {
        this.userImage = currentUser['profilePhoto'];
        if (!this.userImage) {
          this.userImage = '';
        } else {
          this.userImage = currentUser['profilePhoto'];
        }
      });
    });
  }

  getUser() {
    if (this.user.uid != null) {
      const userId = this.user.uid;
      const path = `users/${userId}`;
      return this.db.object(path);
    }
  }

  sendMessage(newMessage: string) {
    const timeStamp = this.getCurrentTime();
    this.chatMessages = this.getAllMessages();
    this.chatMessages.push({
      message: newMessage,
      timeSent: timeStamp,
      email: this.user.email,
      userName: this.userName,
      profilePhoto: this.userImage,
    });
  }

  sendFile(newFile: string) {
    const timeStamp = this.getCurrentTime();
    this.chatMessages = this.getAllMessages();
    this.chatMessages.push({
      file: newFile,
      timeSent: timeStamp,
      email: this.user.email,
      userName: this.userName,
      profilePhoto: this.userImage,
    });
  }

  sendMessageWithFile(newMessage: string, newFile: string) {
    const timeStamp = this.getCurrentTime();
    this.chatMessages = this.getAllMessages();
    this.chatMessages.push({
      message: newMessage,
      file: newFile,
      timeSent: timeStamp,
      email: this.user.email,
      userName: this.userName,
      profilePhoto: this.userImage,
    });
  }


  getAllMessages(): AngularFireList<ChatMessage> {
    return this.db.list('messages', ref => ref.limitToLast(25).orderByKey()
    );
  }

  getCurrentTime() {

    const currentDate = new Date();
    const date = currentDate.getUTCFullYear() + '/' +
                 (currentDate.getUTCMonth() + 1) + '/' +
                 currentDate.getUTCDate();

    const time = currentDate.getUTCHours() + ':' +
                 currentDate.getUTCMinutes() + ':' +
                 currentDate.getUTCSeconds();

    return (date + ' ' + time);
  }

  getUserList() {
    const path = `users`;
    return this.db.list(path);
  }
}
