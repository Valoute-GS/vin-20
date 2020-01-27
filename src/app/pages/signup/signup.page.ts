import { Component, OnInit, ViewChild } from '@angular/core';
import { UserCredential } from 'src/app/models/user';
import { AuthService } from 'src/app/services/user/auth.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  @ViewChild(AuthFormComponent, { static: false })
  signupForm: AuthFormComponent;
  winery: AngularFirestoreCollection;
  users: AngularFirestoreCollection;

  constructor(private authService: AuthService, private router: Router, private firestore: AngularFirestore) {
    this.winery = this.firestore.collection('winery');
    this.users = this.firestore.collection('users');
  }

  ngOnInit() {
  }

  async signupUser(credentials: UserCredential): Promise<void> {
    try {
      this.users.add({
        cave: [],
        wishlist: []
      });
      const userCredential: firebase.auth.UserCredential = await this.authService.signupUser(
        credentials.email,
        credentials.password
      );
      this.authService.userId = userCredential.user.uid;
      await this.signupForm.hideLoading();
      this.router.navigateByUrl('main/winery');
    } catch (error) {
      await this.signupForm.hideLoading();
      this.signupForm.handleError(error);
    }
  }
}
