import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import {FormControl, Validators} from '@angular/forms';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "angularx-social-login";
import {FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {SocialUser} from "angularx-social-login";
import {PharmacyService} from '../../services/pharmacy.service';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserloginComponent implements OnInit {
  loginGif = false;
  private user: SocialUser;
  private loggedIn: boolean;
  cookieValue = 'UNKNOWN';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  constructor(
    private userService: UserService,
    public cookieService: CookieService,
    private router: Router,
    private toastr: ToastsManager,
    private authService: AuthService,
    private pharmacyService: PharmacyService) {
  }

  ngOnInit() {
  }

  userLogin(form) {
    if (form.username == '' || form.password == '') {
      this.typeError('Please fill required fields');
    } else {
      this.loginGif = true;
      const params = 'username=' + form.username + '&password=' + form.password;
      this.userService.Login(params).subscribe(
        (data: any[]) => {
          if (data['access_token'] !== '') {
            this.cookieService.set('token', 'Bearer ' + data['access_token'], data['expires_in']);
            this.router.navigate(['/user-profile']);
            location.reload();
            this.typeSuccess();
            this.loginGif = false;
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.typeError(err.error.message);
            this.loginGif = false;
          }
        }
      );
    }
  }
  typeSuccess() {
    this.toastr.success( 'Login Successfully', 'Welcome!');
  }
  typeError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
  // social login functions

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this.user = user;
      this.userService.socialLoginEmail = this.user.email;
      this.userService.socialLoginName = this.user.name;
      this.loggedIn = (user != null);
      if (this.loggedIn === true) {
         const checkUserParams = 'username=' + this.user.email;
         this.pharmacyService.checkUser(checkUserParams).subscribe(
           (data: any[]) => {
             if (data['success'] === true) {
               const params = 'email=' + this.user.email + '&name=' + this.user.name + '&platform=3';
               this.userService.googleLogin(params).subscribe(
                 (data) => {
                   if (data['data']['access_token'] !== '') {
                     this.cookieService.set('token', 'Bearer ' + data['data']['access_token']);
                     this.router.navigate(['/user-profile']);
                     location.reload();
                   }
                 },
                 (err) => {
                   if (err instanceof HttpErrorResponse) {
                     this.typeError(err.error.message);
                     this.loginGif = false;
                   }
                 }
               );
             } else {
               this.router.navigate(['/user-sign-up']);
             }
           }
         );
      }
  });

  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
      this.user = user;
      this.userService.socialLoginEmail = this.user.email;
      this.userService.socialLoginName = this.user.name;
      this.loggedIn = (user != null);
      if (this.loggedIn === true) {
        if (this.user.email !== undefined) {
          const checkUserParams = 'username=' + this.user.email;
          this.pharmacyService.checkUser(checkUserParams).subscribe(
            (data: any[]) => {
              if (data['success'] === true) {
                const params = 'email=' + this.user.email + '&name=' + this.user.name + '&platform=2';
                this.userService.facebookLogin(params).subscribe(
                  (data) => {
                    if (data['data']['access_token'] !== '') {
                      this.cookieService.set('token', 'Bearer ' + data['data']['access_token']);
                      this.router.navigate(['/user-profile']);
                      location.reload();
                    }
                  },
                  (err) => {
                    if (err instanceof HttpErrorResponse) {
                      this.typeError(err.error.message);
                      this.loginGif = false;
                    }
                  }
                );
              } else {
                this.router.navigate(['/user-sign-up']);
              }
            }
          );
        } else {
          this.typeError('You do not have email on your facebook account');
        }
      }
    });
  }

}



