import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {LoginService} from "./login.service";
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {
  homeAreas;
  socialLoginEmail;
  socialLoginName;
  constructor(private http: HttpClient, public getHeader: LoginService ) { }

  Login(params) {
    return this.http.post(environment.baseUrl + '/oauth/token', params + this.getHeader.loginParams , { headers: this.getHeader.createPostHeader()}).map(
      (response) => response);
  }
  signUp(params) {
    return this.http.post(environment.apiUrl + '/auth/signup', params  , { headers: this.getHeader.createPostHeader()}).map(
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
  contactUs(params) {
    return this.http.post(environment.apiUrl + '/home/contact', params  , { headers: this.getHeader.createPostHeader()}).map(
      (response) => response);
  }
  subscribe(params) {
    return this.http.post(environment.apiUrl + '/home/subscribe-newsletter', params  , { headers: this.getHeader.createPostHeader()}).map(
      (response) => response);
  }
  getProfile() {
    return this.http.get(environment.apiUrl + '/profile'  , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  updateProfile(params) {
    return this.http.post(environment.apiUrl + '/profile?_method=put', params  , { headers: this.getHeader.headers(true)}).map(
  (response) => response);
  }
  updateDonor(params) {
    return this.http.post(environment.apiUrl + '/donor/update?_method=put', params  , { headers: this.getHeader.headers()}).map(
  (response) => response);
  }
  updatePassword(params) {
    return this.http.post(environment.apiUrl + '/password/change?_method=put', params  , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  areaHomeData(value) {
    this.homeAreas = value;
  }
  forgetPass(params) {
    return this.http.post(environment.apiUrl + '/auth/forgot-password', params  , { headers: this.getHeader.createPostHeader()}).map(
      (response) => response);
  }
  addPromoCode(params) {
    return this.http.post(environment.apiUrl + '/promocodes', params  , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  deletePromoCode(id) {
    return this.http.post(environment.apiUrl + '/promocodes/' + id, '_method=delete'  , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  defaultPromo(params, id) {
    return this.http.post(environment.apiUrl + '/promocodes/' + id, params  , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  googleLogin(params) {
    return this.http.post(environment.apiUrl + '/social_auth', params , { headers: this.getHeader.createPostHeader()}).map(
      (response) => response);
  }
  facebookLogin(params) {
    return this.http.post(environment.apiUrl + '/social_auth', params , { headers: this.getHeader.createPostHeader()}).map(
      (response) => response);
  }
  cancelAppointment(params, id) {
    return this.http.post(environment.apiUrl + '/appointments/' + id , params , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  archiveAppointment(params, id) {
    return this.http.post(environment.apiUrl + '/appointments/' + id , params , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  invoiceDetail(id): Observable <any> {
    return this.http.get(environment.apiUrl + '/invoices/' + id, { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  resetPassword(params) {
    return this.http.post(environment.apiUrl + '/auth/password/reset' , params , { headers: this.getHeader.createPostHeader()}).map(
      (response) => response);
  }
  getReportList(): Observable <any> {
    return this.http.get(environment.apiUrl + '/lab_reports', { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
}
