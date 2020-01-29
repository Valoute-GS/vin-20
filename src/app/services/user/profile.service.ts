import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  constructor(private authService: AuthService) {}

  async getUserProfile(): Promise<firebase.firestore.DocumentSnapshot> {
    const user: firebase.User = await this.authService.getUser();
    this.currentUser = user;
    this.userProfile = firebase.firestore().doc(`users/${user.uid}`);
    return this.userProfile.get();
  }

  updateName(name: string): Promise<void> {
    return this.userProfile.set({ name }, { merge: true });
  }

  updateDOB(birthDate: string): Promise<any> {
    return this.userProfile.set({ birthDate }, { merge: true });
  }

  async updateEmail(newEmail: string, password: string): Promise<void> {
    try {
      const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
        this.currentUser.email,
        password
      );

      await this.currentUser.reauthenticateWithCredential(credential);
      await this.currentUser.updateEmail(newEmail);
    } catch (error) {
      console.error(error);
    }
  }

  async updatePassword(
    newPassword: string,
    oldPassword: string
  ): Promise<void> {
    try {
      const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
        this.currentUser.email,
        oldPassword
      );

      await this.currentUser.reauthenticateWithCredential(credential);
      return this.currentUser.updatePassword(newPassword);
    } catch (error) {
      console.error(error);
    }
  }
}
