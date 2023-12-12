import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Router } from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ToastsManager} from "ng2-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {SocialUser} from "angularx-social-login";
import {AuthService} from "angularx-social-login";
import {PharmacyService} from '../../services/pharmacy.service';


@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersignupComponent implements OnInit {
  form: FormGroup;
  private user: SocialUser;
  private loggedIn: boolean;
  selectedDonor = '0';
  loginGif = false;
  loginEmailView;
  loginNameView;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private toastr: ToastsManager,
    private authService: AuthService,
    private pharmacyService: PharmacyService) {
  }

  ngOnInit() {
    this.createForm();
    this.loginEmailView = this.userService.socialLoginEmail;
    this.loginNameView = this.userService.socialLoginName;
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      terms: ['', Validators.required],
    });
  }
  activateClassDonor(value) {
    this.selectedDonor = value;
  }
  userSignUp(formData) {
    this.loginGif = true;
    if (formData.terms === true) {
      formData.terms = '1';
    } else {
      formData.terms = '0';
    }
    const params = 'name=' + formData.name + '&email=' + formData.email + '&password=' + formData.password + '&mobile=' + formData.phone +
      '&is_donor=' + this.selectedDonor + '&fcm_id=' + '&role=1' + '&city_id=1' + '&terms_and_conditions=' + formData.terms;
    this.userService.signUp(params).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          const loginParams = 'username=' + formData.email + '&password=' + formData.password;
          this.userService.Login(loginParams).subscribe(
            (LoginData: any[]) => {
              if (LoginData['access_token'] !== '') {
                this.cookieService.set( 'token', 'Bearer ' + LoginData['access_token'], LoginData['expires_in'] );
                this.router.navigate(['/user-profile']);
                location.reload();
                this.typeSuccess();
                this.loginGif = false;
              }
            }
          );
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
  typeSuccess() {
    this.toastr.success( 'Sign Up Successfully', 'Welcome!');
  }
  typeError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }

  // social login functions

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
  //     this.user = user;
  //     this.loggedIn = (user != null);
  //     if (this.loggedIn === true) {
  //       const params = 'email=' + this.user.email + '&name=' + this.user.name + '&platform=3';
  //       this.userService.googleLogin(params).subscribe(
  //         (data) => {
  //           if (data['data']['access_token'] !== '') {
  //             this.cookieService.set('token', 'Bearer ' + data['data']['access_token']);
  //             this.router.navigate(['/user-profile']);
  //             location.reload();
  //           }
  //         },
  //         (err) => {
  //           if (err instanceof HttpErrorResponse) {
  //             this.typeError(err.error.message);
  //             this.loginGif = false;
  //           }
  //         }
  //       );
  //     }
  //   });
  // }
  //
  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
  //     this.user = user;
  //     this.loggedIn = (user != null);
  //     if (this.loggedIn === true) {
  //       if (this.user.email !== undefined) {
  //         const params = 'email=' + this.user.email + '&name=' + this.user.name + '&platform=2';
  //         this.userService.facebookLogin(params).subscribe(
  //           (data) => {
  //             if (data['data']['access_token'] !== '') {
  //               this.cookieService.set('token', 'Bearer ' + data['data']['access_token']);
  //               this.router.navigate(['/user-profile']);
  //               location.reload();
  //             }
  //           },
  //           (err) => {
  //             if (err instanceof HttpErrorResponse) {
  //               this.typeError(err.error.message);
  //               this.loginGif = false;
  //             }
  //           }
  //         );
  //       } else {
  //         this.typeError('You do not have email on your facebook account');
  //       }
  //     }
  //   });
  // }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this.user = user;
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
              this.loginEmailView = this.user.email;
              this.loginNameView = this.user.name
            }
          }
        );
      }
    });

  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
      this.user = user;
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
                this.loginEmailView = this.user.email;
                this.loginNameView = this.user.name
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


