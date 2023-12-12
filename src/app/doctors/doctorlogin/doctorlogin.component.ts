import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DoctorlistingService} from "../../services/doctorlisting.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ToastsManager} from "ng2-toastr";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-doctorlogin',
  templateUrl: './doctorlogin.component.html',
  styleUrls: ['./doctorlogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorloginComponent implements OnInit {
  form: FormGroup;
  loginGif = false;
  constructor(
    private doctorService: DoctorlistingService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastsManager) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      // remember: ['', Validators],
    });
  }
  doctorLogin(formData) {
    this.loginGif = true;
    let params;
    // if (formData.remember == '') {
       params = 'username=' + formData.name + '&password=' + formData.password;
    // } else {
    //   params = 'username=' + formData.name + '&password=' + formData.password + '&remember=' + formData.remember;
    // }
    this.doctorService.Login(params).subscribe(
      (data: any[]) => {
        if (data['access_token']) {
          this.cookieService.set( 'token', 'Bearer ' + data['access_token'], data['expires_in'] );
          window.location.href = 'http://devdoctor.hayaat.pk';
          this.typeSuccess();
          this.loginGif = false;
        } else if (data['success'] == false) {
          this.typeError(data['message']);
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
  typeSuccess() {
    this.toastr.success( 'Login Successfully', 'Welcome!');
  }
  typeError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
}
