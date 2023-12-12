import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {DoctorlistingService} from './doctorlisting.service';
import { environment } from '../../environments/environment';



@Injectable()
export class DoctorDetailResolverService implements Resolve<any> {

  constructor(private doctorService: DoctorlistingService
              ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any> {
      this.doctorService.doctorSlug = route.paramMap.get('slug');
      return this.doctorService.doctorsDetail();
  }

}

