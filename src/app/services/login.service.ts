import { Injectable } from '@angular/core';
import { HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class LoginService {
  loginParams = '&grant_type=password&client_id=8&client_secret=mgcdSwLcnTAgz80TrUCIu0yGs3EQaujyWhG6GAPq';
  constructor(private cookieService: CookieService) {
  }
  headers(multipart = false) {
    if (this.cookieService.check('token') ) {
      if ( multipart ) {
        return this.createAuthMultipartHeader();
      }else {
        return this.createAuthHeader();
      }
    } else {
      return this.createHeader();
    }
  }
  createHeader() {
    return new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
  }
  createAuthHeader() {
    return new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Accept', 'application/json')
      .append('Authorization', this.cookieService.get('token'));
  }
  createPostHeader(/*token = null*/) {
    if ( true ) {
      return new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Accept', 'application/json');
    }
  }
  createAuthMultipartHeader() {
    // console.log(this.cookieService.check('token'));
    if ( true ) {
      return new HttpHeaders()
        // .append('Content-Type', 'multipart/form-data')
        .append('Accept', 'application/json')
        .append('Authorization', this.cookieService.get('token'));
    }
  }
}
