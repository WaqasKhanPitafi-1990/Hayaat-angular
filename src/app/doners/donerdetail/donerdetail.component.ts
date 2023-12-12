import { Component, OnInit, ViewEncapsulation, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DonerlistingService } from "../../services/donerlisting.service";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-donerdetail',
  templateUrl: './donerdetail.component.html',
  styleUrls: ['./donerdetail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DonerdetailComponent implements OnInit {
@Input() cardIndex;
  donorDetail= [];
  donorView = [];
  form: FormGroup;
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private donorService: DonerlistingService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private userService: UserService) {}

  ngOnInit() {
    this.createForm();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: ['', Validators]
    });
  }
  getDonorDetail(template, template2) {
    this.donorView = this.cardIndex;
    if (this.cookieService.check('token')) {
      this.openModal(template);
    } else if (!this.cookieService.check('token')) {
      this.openModal(template2);
    }
  }
  userLogin(form) {
    const params = 'username=' + form.username + '&password=' + form.password ;
    this.userService.Login(params).subscribe(
      (data: any[]) => {
        if (data['access_token'] !== '') {
          this.cookieService.set('token', 'Bearer ' + data['access_token'], data['expires_in']);
          this.modalRef.hide();
          location.reload();
        }
      }
    );
  }
}
