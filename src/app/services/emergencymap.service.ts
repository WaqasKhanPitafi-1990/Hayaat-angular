import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { GlobalVariable } from '../globals';
import { environment } from '../../environments/environment';


@Injectable()
export class EmergencyMapService {
  constructor(private http: HttpClient) { }

  emList() {
    return this.http.get(environment.apiUrl + '/home/find-emergencies?all=1&city=' + GlobalVariable.CITY).map(
      (response) => response);
  }

}
