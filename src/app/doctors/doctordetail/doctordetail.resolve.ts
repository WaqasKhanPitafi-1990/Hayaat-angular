import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { DoctorlistingService } from '../../services/doctorlisting.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class DoctorDetailResolve implements Resolve<any> {
  constructor(private  doctorService: DoctorlistingService){}
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot,
  ): Observable<any> {
    return this.doctorService.doctorsDetail();
  }
}
