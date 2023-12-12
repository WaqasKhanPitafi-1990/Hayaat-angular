import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {PharmacyService} from './pharmacy.service';

@Injectable()
export class PharmacyDetailResolverService implements Resolve<any>{

  constructor(private pharmacyService: PharmacyService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any> {
    this.pharmacyService.pharmacyId = route.paramMap.get('slug');
    return this.pharmacyService.pharmacyDetail();
  }
}
