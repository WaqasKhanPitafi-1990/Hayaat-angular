import { Component, OnInit} from '@angular/core';
import { DonerlistingService } from "../../services/donerlisting.service";
import {DoctorlistingService} from "../../services/doctorlisting.service";
import {CookieService} from "ngx-cookie-service";
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-donercard',
  templateUrl: './donercard.component.html',
  styleUrls: ['./donercard.component.css']
})
export class DonercardComponent implements OnInit {
  scrollDistance = 1;
  noDonor;
  donorData= [];
  pagination = [];
  bloodGroupSlug = '';
  areaSlug = '';
  citySlug = '';
  donorNum = false;

  constructor(
    private donorService: DonerlistingService,
    private doctorService: DoctorlistingService,
    private cookieService: CookieService) { }

  ngOnInit() {
    if (location.pathname === '/blood-donors') {
      this.donorListing();
    }
    if (this.cookieService.check('token')) {
     this.donorNum = true;
    } else {
      this.donorNum = false;
    }
  }
  // testingFunction() {
  //   console.log('testing function');
  //   if (this.doctorService.directDataUrl['donors'].length !== 0) {
  //     this.donorData = this.doctorService.directDataUrl['donors'];
  //     this.noDonor = false;
  //   } else {
  //     this.noDonor = true;
  //   }
  //   this.pagination = this.doctorService.directDataUrl['pagination'];
  //   this.bloodGroupSlug = this.doctorService.bloodDataSlug;
  //   this.citySlug = this.doctorService.cityDataSlug;
  //   this.areaSlug = this.doctorService.areaDataSlug;
  // }
  newFilterData(dataArray, bloodGroup, city , area ) {
    this.bloodGroupSlug = bloodGroup;
    this.areaSlug = area;
    this.citySlug = city;
    this.donorData = dataArray['donors'];
    this.pagination = dataArray['pagination'];
    if (dataArray['donors'] == '') {
      this.noDonor = true;
    }else {
      this.noDonor = false;
    }
  }
  donorListing() {
    let cityId;
    if (this.cookieService.check('city')) {
      cityId = '?city=' + this.cookieService.get('city');
    } else {
      cityId = 1;
    }
    this.donorService.donorsList(environment.apiUrl + '/home/find-donors' + cityId).subscribe(data => {
      this.donorData = data['data']['donors'];
      this.pagination = data['data']['pagination'];
    });
  }
  onScrollDown() {
    if (this.pagination['has_more'] === true) {
      this.donorService.donorsList(this.pagination['next_url'] + this.bloodGroupSlug + this.areaSlug + this.citySlug).subscribe(data => {
        if (data['success'] === true) {
          data['data']['donors'].forEach((value) => {
            this.donorData.push(value);
          });
          this.pagination = data['data']['pagination'];
        }
      });
    }
  }
}
