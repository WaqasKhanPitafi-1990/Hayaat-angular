import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-doctorsignup',
  templateUrl: './doctorsignup.component.html',
  styleUrls: ['./doctorsignup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorsignupComponent implements OnInit {
  cities = [];
    form: FormGroup;
    loginGif = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastsManager,
    private cookieService: CookieService) {
  }

  ngOnInit() {
    this.createForm();
    this.cityList();
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      terms: ['', Validators.required],
      city: ['', Validators.required],
      message: ['', Validators],
      gender: ['', Validators.required],
    });
  }

  cityList() {
    this.userService.getCities().subscribe(
      (data: any[]) => {
        this.cities = data['data'];
      }
    );
  }
  doctorSignUp(formData) {
    this.loginGif = true;
    if (formData.terms === true) {
      formData.terms = '1';
    } else {
      formData.terms = '0';
    }
    const params = 'name=' + formData.name + '&email=' + formData.email + '&password=' + formData.password + '&mobile=' + formData.phone +
      '&is_doner=0' + '&fcm_id=' + '&role=2' + '&city_id=1' + '&terms_and_conditions=' + formData.terms + '&message=' + formData.message +
      '&gender=' + formData.gender;
    this.userService.signUp(params).subscribe(
      (data: any[]) => {
        this.loginGif = false;
        if (data['success'] === true) {
          this.typeSuccess('User sign up successfully. You will be able to login, once account verify from Admin Team.');
          this.router.navigate(['/']);
          // const loginParams = 'username=' + formData.email + '&password=' + formData.password;
          // this.userService.Login(loginParams).subscribe(
          //   (LoginData: any[]) => {
          //     if (LoginData['access_token'] !== '') {
          //       this.cookieService.set( 'token', 'Bearer ' + LoginData['access_token'], LoginData['expires_in'] );
          //       this.router.navigate(['/user-profile']);
          //       setTimeout(() => {
          //         location.reload();
          //       }, 400);
          //       this.typeSuccess();
          //       this.loginGif = false;
          //     }
          //   }
          // );
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
  typeSuccess(message) {
    this.toastr.success( message, 'Done!');
  }
  typeError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
}
