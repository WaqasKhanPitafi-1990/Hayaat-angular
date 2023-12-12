import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { GlobalVariable } from '../globals';
import { environment } from '../../environments/environment';
import {LoginService} from './login.service';
import {CookieService} from 'ngx-cookie-service';


@Injectable()
export class LabService {
  labId;
  labData = [];
  orderWithLab = false;
  constructor(private http: HttpClient, private getHeader: LoginService, private cookieService: CookieService) { }
  getTestList(): Observable<any> {
    return this.http.get(environment.apiUrl + '/home/lab-testlist'  , { headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  getLabOrderData(): Observable<any> {
    return this.http.get(environment.apiUrl + '/home/lab-order'  , { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  labBranches() {
    console.log(this.labId);
    return this.http.get(environment.apiUrl + '/home/lab-branches/' + this.labId + '?city=' + this.cookieService.get('city') + '&all=1', { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
  submitOrder(params) {
    return this.http.post(environment.apiUrl + '/home/lab-order ', params  , { headers: this.getHeader.headers(true)}).map(
      (response) => response);
  }
  getLabByTest(params){
    return this.http.get(environment.apiUrl + '/home/labs-by-test?testItems=' + params, { headers: this.getHeader.headers()}).map(
      (response) => response);
  }
}
