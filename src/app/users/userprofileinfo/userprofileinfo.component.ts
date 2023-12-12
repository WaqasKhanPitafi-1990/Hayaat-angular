import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ToastsManager} from "ng2-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {PharmacyService} from "../../services/pharmacy.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-userprofileinfo',
  templateUrl: './userprofileinfo.component.html',
  styleUrls: ['./userprofileinfo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserprofileinfoComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  @Input()
   checked: boolean = false;
   form: FormGroup;
   loginGif = false;
   userCity;
   userGender;
   promoId;
   day;
   year;
   month;
   userAppointment = [];
   pastAppointment = [];
   userInfo = [];
   cities = [];
   medicalRecords = [];
  bloodGroups = [
    {id: 1 , name: 'A+ (Positive)' },
    {id: 2 , name: 'A- (Negative)' },
    {id: 3 , name: 'B+ (Positive)' },
    {id: 4 , name: 'B- (Negative)' },
    {id: 5 , name: 'O+ (Positive)' },
    {id: 6 , name: 'O- (Negative)' },
    {id: 7 , name: 'AB+ (Positive)' },
    {id: 8 , name: 'AB- (Negative)' }
  ];
  promoCodes = [];
   gender = [
     {id: 1, name: 'male'},
     {id: 2, name: 'female'}
     ];
  areas = [];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastsManager,
    private pharmacyService: PharmacyService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.cityList();
    this.areaList();
    this.userProfile();
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      image: ['', Validators],
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      area: ['', Validators.required],
      group: ['', Validators.required],
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      confirmPass: ['', Validators.required],
      promoCode: ['', Validators.required],
      avatar: null
    });
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.form.get('avatar').setValue(files);
    }
  }
  getDateOfBirth(date) {
    this.day = date.getDate();
    this.month = date.getMonth() + parseInt('1', 10);
    this.year = date.getYear().toString().slice(1, 3);
    // const params = '&date=' + '20' + this.year + '-' + this.month + '-' + this.day;
  }
  saveProfile(formData) {
    this.loginGif = true;
    const input = new FormData();
    if (formData.avatar !== null) {
      const file: File = formData.avatar[0];
      input.append('avatar', file);
    }
    input.append('address', formData.address);
    input.append('mobile', formData.phone);
    input.append('name', formData.name);
    input.append('city', formData.city);
    input.append('date_of_birth', '20' + this.year + '-' + this.month + '-' + this.day);
    input.append('gender', formData.gender);
    const options = input;
    this.userService.updateProfile(options).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.passSuccess(data['message']);
          this.loginGif = false;
          this.userProfile();
          this.childEvent.next('true');
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.passError(err.error.message);
          this.loginGif = false;
        }
      }
    );
  }
  updateDonor(formData) {
    this.loginGif = true;
    const params = 'blood_group=' + formData.group + '&area_id=' + formData.area;
    this.userService.updateDonor(params).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.passSuccess(data['message']);
          this.loginGif = false;
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.passError(err.error.message);
          this.loginGif = false;
        }
      }
    );
  }
  updatePass(formData) {
    this.loginGif = true;
    if (formData.newPass !== formData.confirmPass) {
      this.passError('Passwords Not Match');
    } else {
      const params = 'old_password=' + formData.oldPass + '&password=' + formData.newPass + '&password_confirmation=' + formData.confirmPass;
      this.userService.updatePassword(params).subscribe(
        (data: any[]) => {
          if (data['success'] === true) {
            this.passSuccess(data['message']);
            this.loginGif = false;
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.passError(err.error.message);
            this.loginGif = false;
          }
        }
      );
    }
  }

  userProfile() {
    this.userService.getProfile().subscribe(
      (data: any[]) => {
        this.userAppointment = data['data']['upcomming_appointments']['appointments'];
        this.pastAppointment = data['data']['past_appointments']['appointments'];
        this.userInfo = data['data']['profile_data'];
        this.pharmacyService.userProfileInfo = data['data']['profile_data'];
        this.medicalRecords = data['data']['documents']['listing'];
        this.promoCodes = data['data']['promocodes'];
        this.userCity = this.userInfo['city'];
        this.userGender = this.userInfo['gender'];
        if (this.promoCodes.length === 1 && this.promoCodes[0]['is_default'] === 1) {
          this.promoId = this.promoCodes[0]['id'];
        } else {
          this.promoCodes.forEach((value) => {
            if (value.is_default === 1) {
              this.promoId = value.id;
            }
          });
        }
        this.userAppointment.forEach(function (value, index) {
          if (value.status == 1) {
            value.status = 'Pending';
          } else if (value.status == 2) {
            value.status = 'Approved';
          } else if (value.status == 3) {
            value.status = 'Rejected';
          } else if (value.status == 4) {
            value.status = 'Attended';
          } else if (value.status == 5) {
            value.status = 'Archived';
          } else if (value.status == 6) {
            value.status = 'Canceled';
          }
        });
        this.pastAppointment.forEach(function (value, index) {
          if (value.status == 1) {
            value.status = 'Pending';
          } else if (value.status == 2) {
            value.status = 'Approved';
          } else if (value.status == 3) {
            value.status = 'Rejected';
          } else if (value.status == 4) {
            value.status = 'Attended';
          } else if (value.status == 5) {
            value.status = 'Archived';
          } else if (value.status == 6) {
            value.status = 'Canceled';
          }
        });
      }
    );
  }
  cityList() {
    this.userService.getCities().subscribe(
      (data: any[]) => {
        this.cities = data['data'];
      }
    );
  }
  areaList() {
    this.userService.getAreas(this.cookieService.get('city')).subscribe(
      (data: any[]) => {
        this.areas = data['data'];
      }
    );
  }
  savePromoCode(formData) {
    this.loginGif = true;
    const params = 'code=' + formData.promoCode;
    this.userService.addPromoCode(params).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.loginGif = false;
          this.passSuccess(data['message']);
          this.promoId = '';
          this.userProfile();
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.passError(err.error.message);
          this.loginGif = false;
        }
      }
    );
  }
  deletePromo(id) {
    this.userService.deletePromoCode(id).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.passSuccess(data['message']);
          this.userProfile();
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.passError(err.error.error);
        }
      }
    );
  }
  setDefault() {
    const params = 'is_default=1' + '&_method=put';
    this.userService.defaultPromo(params, this.promoId).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.passSuccess(data['message']);
          this.promoId = '';
          this.userProfile();
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.passError(err.error.error);
        }
      }
    );
  }
  deleteAppointment(id) {
    if (confirm('Do you want to cancel your appointment')) {
      const params = '_method=put' + '&status=6';
      this.userService.cancelAppointment(params, id).subscribe(
        (data: any[]) => {
          if (data['success'] === true) {
            this.passSuccess(data['message']);
            this.userProfile();
          } else if (data['logged_in'] === false) {
            this.passError(data['message']);
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.passError(err.error.message);
          }
        }
      );
    }
  }
  archiveRequest(id) {
    if (confirm('Are you sure you want to archive')) {
      const params = '_method=put' + '&status=5';
      this.userService.archiveAppointment(params, id).subscribe(
        (data: any[]) => {
          if (data['success'] === true) {
            this.passSuccess(data['message']);
            this.userProfile();
          } else if (data['logged_in'] === false) {
            this.passError(data['message']);
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.passError(err.error.message);
          }
        }
      );
    }
  }
  passSuccess(message) {
    this.toastr.success( message, 'Done!');
  }
  passError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }

}
