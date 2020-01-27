import { Component, OnInit, ViewChild } from '@angular/core';
import { UserCredential } from 'src/app/models/user';
import { AuthService } from 'src/app/services/user/auth.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  @ViewChild(AuthFormComponent, { static: false }) loginForm: AuthFormComponent;
  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get('id').then((val) => {
      if (val != null) {
        this.router.navigateByUrl('main/winery');
      }
    });

  }

  async loginUser(credentials: UserCredential): Promise<void> {
    try {
      const userCredential: firebase.auth.UserCredential = await this.authService.loginUser(
        credentials.email,
        credentials.password
      );
      this.authService.userId = userCredential.user.uid;
      this.storage.set('id', this.authService.userId);
      console.log(this.authService.userId);
      await this.loginForm.hideLoading();
      this.router.navigateByUrl('main/winery');
    } catch (error) {
      await this.loginForm.hideLoading();
      this.loginForm.handleError(error);
    }
  }
}
