import { Component, OnInit, ViewEncapsulation, TemplateRef, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DoctorlistingService} from "../../services/doctorlisting.service";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ToastsManager} from "ng2-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-askquestionmodal',
  templateUrl: './askquestionmodal.component.html',
  styleUrls: ['./askquestionmodal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AskquestionmodalComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  loginGif = false;
  form: FormGroup;
  modalRef: BsModalRef;
  specialities = [];
  questionFor = [
    {id: 1, name: 'Public'},
    {id: 2, name: 'Doctor Only'}
  ];


  constructor(
    private modalService: BsModalService,
    private doctorService: DoctorlistingService,
    private fb: FormBuilder,
    private toastr: ToastsManager,
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    this.getSpecialities();
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      specialityName: ['', Validators.required],
      message: ['', Validators.required],
      questionType: ['', Validators.required],
      image: ['', Validators.required],
      avatar: null,
      username: ['', Validators],
      password: ['', Validators],
    });
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.form.get('avatar').setValue(files);
    }
  }
  saveQuestionLogin (template, templateLogin) {
    if (this.cookieService.check('token')) {
      this.openModal(template);
    } else {
      this.openModal(templateLogin);
    }
  }
  saveQuestion(formData) {
    this.loginGif = true;
    const input = new FormData();
    if (formData.avatar !== null) {
      const file: File = formData.avatar[0];
      input.append('file', file);
    }
    input.append('title', formData.title);
    input.append('description', formData.message);
    input.append('category', formData.specialityName);
    input.append('for', formData.questionType);
    const options = input;
    this.doctorService.addQuestion(options).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.modalRef.hide();
          this.questionSuccess(data['message']);
          this.loginGif = false;
          this.childEvent.next('true');
        } else if (data['success'] === false) {
           this.questionError(data['message']);
           this.loginGif = false;
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.questionError(err.error.message);
          this.loginGif = false;
        }
      }
    );
  }

  userLogin(form) {
    this.loginGif = true;
    const params = 'username=' + form.username + '&password=' + form.password ;
    this.userService.Login(params).subscribe(
      (data: any[]) => {
        if (data['access_token'] !== '') {
          this.cookieService.set('token', 'Bearer ' + data['access_token'], data['expires_in']);
          this.modalRef.hide();
          this.questionSuccess('Login Successfully');
          this.loginGif = false;
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.questionError(err.error.message);
          this.loginGif = false;
        }
      }
    );
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getSpecialities() {
    this.doctorService.doctorSpecialities().subscribe(
      (data: any[]) => {
        this.specialities = data['data'];
      }
    );
  }
  questionSuccess(message) {
    this.toastr.success( message, 'Done!');
  }
  questionError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
}
