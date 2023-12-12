import { Component, OnInit, ViewEncapsulation, Input, TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DoctorlistingService } from "../../services/doctorlisting.service";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../../services/user.service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ToastsManager} from "ng2-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {Meta, Title} from "@angular/platform-browser";


@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookappointmentComponent implements OnInit {
  @Input() appointmentInfo;
  @Input() doctorTime;
  @Input() doctorSingleLocation;
  form: FormGroup;
  modalRef: BsModalRef;
  locationValue;
  timeSlot = [];
  timeToday = [];
  slotId;
  day;
  month;
  year;
  slotTime;
  selectedItem;
  selectedOption = '0';
  someOneElse = false;
  loginGif = false;
  gender = [
    {id: '1', name: 'Male'},
    {id: '2', name: 'Female'}
  ];
  relations = [
    {id: '1', name: 'Parents'},
    {id: '2', name: 'Children'},
    {id: '3', name: 'Siblings'},
    {id: '4', name: 'Others'}
  ];
  constructor(
      private fb: FormBuilder,
      private doctorService: DoctorlistingService,
      private cookieService: CookieService,
      private userService: UserService,
      private modalService: BsModalService,
      private toastr: ToastsManager,
      private meta: Meta,
      private titleService: Title
     ) {

  }

  ngOnInit() {
    this.createForm();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  createForm() {
    this.form = this.fb.group({
      location: ['', Validators],
      me: ['', Validators],
      elseOne: ['', Validators],
      slot: ['', Validators],
      reason: ['', Validators],
      username: ['', Validators],
      password: ['', Validators],
      remember: ['', Validators],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      genderName: ['', Validators.required],
      relationName: ['', Validators.required]
    });
  }
  getLocation(locationVal , i) {
    this.timeToday = [];
    this.locationValue = locationVal;
    if (this.doctorTime[i].is_today === 1) {
      this.doctorTime[i].today.forEach((value) => {
        this.timeToday.push(value);
      });
    } else {
      this.timeToday.push('Not Available');
    }
  }
  getTimeSlot(date) {
    console.log(this.appointmentInfo);
    if (this.doctorSingleLocation !== '') {
      this.locationValue = this.doctorSingleLocation;
    }
    this.day = date.getDate();
    this.month = date.getMonth() + parseInt('1', 10);
    this.year = date.getYear().toString().slice(1, 3);
    const params = '&date=' + '20' + this.year + '-' + this.month + '-' + this.day + '&location_id=' + this.locationValue;
    this.doctorService.getTimeSlots(params).subscribe(
      (data: any[]) => {
        if (data['success'] == true) {
          this.timeSlot = data['data'];
          // this.timeSlot.forEach((value) => {
          //   if (value.is_booked == 1) {
          //     this.timeSlot['start_time'] = 'Booked';
          //   }
          // });
        } if (data['data'].length === 0) {
          this.loginError(data['message']);
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.error.date) {
            this.loginError(err.error.date[0]);
          }
          this.loginError(err.error.location_id[0]);
          this.loginGif = false;
        }
      }
    );
  }
  activateClass(slot, id, startTime) {
    this.selectedItem = slot;
    this.slotId = id;
    this.slotTime = startTime;
  }
  activateClassOption(value) {
   this.selectedOption = value;
   if (value === '1') {
     this.someOneElse = true;
   } else {
     this.someOneElse = false;
   }
  }
  userLogin(form) {
    this.loginGif = true;
    const params = 'username=' + form.username + '&password=' + form.password ;
    this.userService.Login(params).subscribe(
      (data: any[]) => {
        if (data['access_token'] !== '') {
          this.cookieService.set('token', 'Bearer ' + data['access_token'], data['expires_in']);
          this.modalRef.hide();
          this.loginSuccess();
          this.loginGif = false;
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.loginError(err.error.message);
          this.loginGif = false;
        }
      }
    );
  }
  bookAppointment(form, template) {
    this.loginGif = true;
    let params;
    if (this.doctorSingleLocation !== 0) {
      form.location = this.doctorSingleLocation;
    }
    if (this.selectedOption === '0') {
       params = 'for_someone_else=' + this.selectedOption +
        '&reason=' + form.reason + '&doctor_location_id=' + form.location + '&timeslot_number=' + this.slotId +
        '&date=' + '20' + this.year + '-' + this.month + '-' + this.day + '&time=' + this.slotTime;
    } else if (this.selectedOption === '1') {
      params = 'for_someone_else=' + this.selectedOption +
        '&reason=' + form.reason + '&doctor_location_id=' + form.location + '&timeslot_number=' + this.slotId +
        '&date=' + '20' + this.year + '-' + this.month + '-' + this.day + '&time=' + this.slotTime +
      '&name=' + form.name + '&mobile=' + form.mobile + '&gender=' + form.genderName + '&relation=' + form.relationName;
    }
    this.doctorService.bookDoctorAppointment(params).subscribe(
      (data: any[]) => {
        if (data['logged_in'] === false) {
          this.openModal(template);
          this.loginGif = false;
        } else if (data['success'] === true) {
          this.appointmentSuccess(data['message']);
          this.loginGif = false;
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.appointmentError(err.error.message);
          this.loginGif = false;
        }
      }
    );
  }
  loginSuccess() {
    this.toastr.success( 'Login Successfully', 'Welcome!');
  }
  loginError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
  appointmentSuccess(message) {
    this.toastr.success( message, 'Done!');
  }
  appointmentError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
}
