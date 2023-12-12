import { Component, OnInit, Input } from '@angular/core';
import { DoctorlistingService} from '../../services/doctorlisting.service';
import {FormControl, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-doctorcard',
  templateUrl: './doctorcard.component.html',
  styleUrls: ['./doctorcard.component.css']
})
export class DoctorcardComponent implements OnInit {
  noDoctor = false;
  scrollDistance = 1;
  doctorData= [];
  pagination = [];
  specialitySlug = '';
  areaSlug = '';
  citySlug = '';
  feeSlug = '';
  selected = 4;
  ctrl = new FormControl(null, Validators.required);
  imagePath = environment.baseUrl;
  constructor(private doctorService: DoctorlistingService, private cookieService: CookieService
              ) {

  }

  ngOnInit() {
    if (location.pathname === '/find-a-doctor') {
      this.doctorListingData();
    }
  }
  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }
  doctorListingData() {
    let cityId;
    if (this.cookieService.check('city')) {
      cityId = '?city=' + this.cookieService.get('city');
    } else {
      cityId = '';
    }
    this.doctorService.doctorsList(environment.apiUrl + '/home/find-doctors' + cityId).subscribe(data => {
      this.doctorData = data['data']['doctors'];
      this.pagination = data['data']['pagination'];
    });
  }
  saveId(slug) {
    this.doctorService.saveDoctorSlug(slug);
  }
  saveDoctorIdClick(Id) {
    this.doctorService.saveDoctorId(Id);
  }
  newFilterData(dataArray, speciality, city, area, fee ) {
    this.specialitySlug = speciality;
    this.areaSlug = area;
    this.citySlug = city;
    this.feeSlug = fee;
    this.doctorData = dataArray['doctors'];
    this.pagination = dataArray['pagination'];
    if (dataArray['doctors'] == '') {
      this.noDoctor = true;
    }else {
      this.noDoctor = false;
    }
  }
  onScrollDown() {
    if (this.pagination['has_more'] === true) {
      this.doctorService.doctorsList(this.pagination['next_url'] + this.specialitySlug + this.areaSlug + this.citySlug + this.feeSlug).subscribe(data => {
        data['data']['doctors'].forEach((value) => {
          this.doctorData.push(value);
        });
        this.pagination = data['data']['pagination'];
      });
    }
  }
}
