import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {UserService} from "../services/user.service";
import {ToastsManager} from "ng2-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ForgetpasswordComponent implements OnInit {
  form: FormGroup;
  modalRef: BsModalRef;
  loginGif = false;
  constructor(private modalService: BsModalService,
              private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastsManager) {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
    });
  }
  forgetPassword(formData) {
    this.loginGif = true;
    const params = 'email=' + formData.email;
    this.userService.forgetPass(params).subscribe(
      (data) => {
            if (data['success'] === true) {
              this.modalRef.hide();
              this.typeSuccess(data['message']);
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
  typeSuccess(message) {
    this.toastr.success( message, 'Done!');
  }
  typeError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
}
