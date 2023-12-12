import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {HttpClient} from "@angular/common/http";
import {LoginService} from "./login.service";

import {GlobalVariable} from '../globals';
import { environment } from '../../environments/environment';


@Injectable()
export class DonerlistingService {
  donorParamName;
  constructor(private http: HttpClient , private getHeader: LoginService) { }


  donorsList(url = environment.apiUrl + '/home/find-donors') {
    return this.http.get(url, { headers: this.getHeader.createHeader()}).map(
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
  filteredData(url = environment.apiUrl + '/home/find-donors') {
    return this.http.get(url , {headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
}
