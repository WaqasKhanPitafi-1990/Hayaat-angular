import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.cookieService.check('token')) {
      return true;
    }else {
      return false;
    }
  }
}
