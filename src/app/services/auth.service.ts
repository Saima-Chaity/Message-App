import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;
  userId: string;
  signupAttempt: number;
  userDetails: any;
  invalidEmail: string;
  invalidPassword: string;
  uid: any;
  signedInUserId: any;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
      this.user = afAuth.authState;
    }

  authenticateUser() {
    return this.user;
  }

  getUserDetails(uid: string) {
    const path = `users/${uid}`;
    return this.db.object(path);
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((curresntuser) => {
        this.uid = curresntuser.user.uid;
        this.authState = curresntuser;
        this.signupAttempt = 1;
        this.setUserSatus('online');
        this.getUserDetails(curresntuser.user.uid);
        this.router.navigate(['chat']);
        window.location.reload();
    });
  }

  logout() {
    this.setUserSatus('offline');
    this.signupAttempt = 0;
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
    window.location.reload();
  }

  signup(email: string, userName: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((signedInUser) => {
        this.signedInUserId = signedInUser.user.uid;
        this.signupAttempt = 1;
        this.authState = signedInUser;
        const status = 'online';
        this.setUserData(email, userName, status);
        window.location.reload();
    });
  }

  setUserData(email: string, userName: string, status: string) {
    const root = firebase.database().ref();
    const data = {
      email: email,
      userName: userName,
      status: status,
    };
    root.child('users').child(this.signedInUserId).set(data);
  }

  get currentUserId(): string {
    if (this.signupAttempt === 1) {
      this.signupAttempt = 0;
      return this.authState !== null ? this.authState.uid : ' ';
    } else {
      this.userId = sessionStorage.getItem('userId');
      return this.authState !== null ? this.userId : this.authState.uid;
    }
  }

  setUserSatus(status: string) {
    const path = `users/${this.uid}`;
    const data = {
      status: status
    };
    return this.db.object(path).update(data);
  }

  saveProfileSettings(newPhoto: string, userId: string) {
    const path = `users/${userId}`;
    const data = {
      profilePhoto: newPhoto
    };
    this.db.object(path).update(data);
    this.router.navigate(['chat']);
  }
}
