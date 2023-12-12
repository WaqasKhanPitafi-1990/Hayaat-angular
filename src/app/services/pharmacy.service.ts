import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {LoginService} from './login.service';
import { environment } from '../../environments/environment';
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class PharmacyService {
  pharmacyId;
  pharmacyImage;
  branchId;
  userProfileInfo = [];
  userLoginInfo = [];

  constructor(private http: HttpClient, private getHeader: LoginService, private cookieService: CookieService) { }

  pharmacies(url = environment.apiUrl + '/home/pharmacy') {
    // return this.http.get(url + '?city=' + this.cookieService.get('city'), { headers: this.getHeader.createHeader()}).map(
    return this.http.get(url , { headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  savePharmacyId(id, image) {
    this.pharmacyId = id;
    this.pharmacyImage = image;
  }
  saveBranchId(id) {
    this.branchId = id;
  }
  pharmacyBranches() {
    return this.http.get(environment.apiUrl + '/home/pharmacy-branches/' + this.pharmacyId + '?city=' + this.cookieService.get('city'), { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  checkUser(params) {
    return this.http.post(environment.apiUrl + '/home/check-user', params , { headers: this.getHeader.createPostHeader()}).map(
      (response) => response);
  }
  checkPasswordLogin(params) {
    return this.http.post(environment.baseUrl + '/oauth/token ', params + this.getHeader.loginParams , { headers: this.getHeader.createPostHeader()}).map(
      (response) => response);
  }

  submitOrder(params) {
    return this.http.post(environment.apiUrl + '/home/pharmacy-order ', params  , { headers: this.getHeader.headers(true)}).map(
      (response) => response);
  }
  ordersList(url) {
    return this.http.get(url, { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  getCities() {
    return this.http.get(environment.apiUrl + '/home/cities'  , { headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  getAreas(params) {
    return this.http.get(environment.apiUrl + '/home/city-areas?city_id=' + params, { headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  filteredData(url = environment.apiUrl + '/home/pharmacy') {
    return this.http.get(url , {headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  filteredBranchData(url = environment.apiUrl + '/home/pharmacy-branches/') {
    return this.http.get(url  , {headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  getDefaultPromo() {
    return this.http.get(environment.apiUrl + '/home/default-promo?branch_id=' + this.branchId , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  getPharmacyOrderData() {
    return this.http.get(environment.apiUrl + '/home/pharmacy-order', { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  cancelPharmacyOrder(params, id) {
    return this.http.post(environment.apiUrl + '/orders/cancel/' + id , params, { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  pharmacyDetail() {
    return this.http.get(environment.apiUrl + '/home/pharmacy/' + this.pharmacyId , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  getProvinces() {
    return this.http.get(environment.apiUrl + '/provinces', { headers: this.getHeader.headers()}).map(
    (response) => response);
  }
  getCity(id) {
    return this.http.get(environment.apiUrl + '/home/province-cities?province_id=' + id  , { headers: this.getHeader.headers()}).map(
    (response) => response);
  }
}
