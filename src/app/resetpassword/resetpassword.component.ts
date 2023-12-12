import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {UserService} from '../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastsManager} from 'ng2-toastr';
import {Router, UrlSegment, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET} from "@angular/router";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResetpasswordComponent implements OnInit {
  token;
  loginGif = false;
  form: FormGroup;
  constructor( private fb: FormBuilder,
               private userService: UserService,
               private toastr: ToastsManager,
               private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.getUrlParams();
  }
  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      newPass: ['', Validators],
      confirmPass: ['', Validators.required],
    });
  }
  getUrlParams () {
    const tree: UrlTree = this.router.parseUrl(location.pathname);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
    this.token = s[1]['path'];
  }
  updatePass(formData) {
    this.loginGif = true;
    const params = 'token=' + this.token + '&email=' + formData.email +
      '&password=' + formData.newPass + '&password_confirmation=' + formData.confirmPass;
    this.userService.resetPassword(params).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.typeSuccess(data['message']);
          this.loginGif = false;
          this.router.navigate(['/user-login']);
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
