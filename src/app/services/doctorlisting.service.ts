import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {LoginService} from "./login.service";
import {Subject} from "rxjs/Subject";

import {GlobalVariable} from '../globals';
import { environment } from '../../environments/environment';


@Injectable()
export class DoctorlistingService {
 // baseurl:string = environment.apiUrl + '';
  pharmacyReviewId;
  directDataUrl = [];
  cityDataSlug = '';
  areaDataSlug = '';
  specialityDataSlug = '';
  bloodDataSlug = '';
  routUrl = false;
  detailDirectUrl = false;
  doctorId;
  doctorSlug;
  questionSlug;
  areaHomeSlug = '';
  doctorHomeSlug = '';
  doctorParamName = '';
  doctorDetailMeta;
  constructor(private http: HttpClient, private getHeader: LoginService) { }

  Login(params) {
    return this.http.post(environment.baseUrl + '/oauth/token', params + this.getHeader.loginParams , { headers: this.getHeader.createPostHeader()}).map(
      (response) => response);
  }
  doctorsList(url = environment.apiUrl + '/home/find-doctors') {
    return this.http.get(url, {headers: this.getHeader.createHeader()}).map(
      (response) => response);

  }
  saveDoctorSlug(slug) {
    this.doctorSlug = slug;
    this.detailDirectUrl = true;
  }
  saveDoctorId(id) {
    this.doctorId = id;
  }
  doctorsDetail() {
    return this.http.get(environment.apiUrl + '/home/doctor-detail/' + this.doctorSlug, { headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  getTimeSlots(params) {
    return this.http.post(environment.apiUrl + '/timeslots', params , { headers: this.getHeader.createPostHeader()}).map(
      (response) => response);
  }
  bookDoctorAppointment(params) {
    params = params + '&doctor_id=' + this.doctorId;
    return this.http.post(environment.apiUrl + '/appointments', params , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  doctorSpecialities() {
    return this.http.get(environment.apiUrl + '/home/specialities' , { headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  addQuestion(params)  {
    return this.http.post(environment.apiUrl + '/home/ask-question ', params  , { headers: this.getHeader.headers(true)}).map(
      (response) => response);
  }
  getQuestion(url = environment.apiUrl + '/home/questions') {
    return this.http.get(url , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  getReply() {
    return this.http.get(environment.apiUrl + '/home/answers?slug=' + this.questionSlug  , { headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  saveSlug(slug) {
    this.questionSlug = slug;
  }
  addReply(params) {
    return this.http.post(environment.apiUrl + '/replies ', params  , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  getCities() {
    return this.http.get(environment.apiUrl + '/home/cities'  , { headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  getAreas(params) {
    return this.http.get(environment.apiUrl + '/home/city-areas?city_id=' + params  , { headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  filteredData(url = environment.apiUrl + '/home/find-doctors') {
    return this.http.get(url , {headers: this.getHeader.createHeader()}).map(
        (response) => response);
  }
  filter(data, city, area, speciality, blood) {
      this.directDataUrl = data;
      this.cityDataSlug = city;
      this.areaDataSlug = area;
      this.specialityDataSlug = speciality;
      this.bloodDataSlug = blood;
      this.routUrl = true;
  }
  writeFeedBack(params, id) {
    return this.http.post(environment.apiUrl + '/feedback' , params + '&id=' + id , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  writePharmacyFeedBack(params) {
    return this.http.post(environment.apiUrl + '/feedback' , params + '&id=' + this.pharmacyReviewId , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
}
