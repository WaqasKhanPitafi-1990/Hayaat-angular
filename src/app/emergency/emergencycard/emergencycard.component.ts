import { Component, OnInit } from '@angular/core';
import { EmergencylistingService } from "../../services/emergencylisting.service";
import {DoctorlistingService} from "../../services/doctorlisting.service";


@Component({
  selector: 'app-emergencycard',
  templateUrl: './emergencycard.component.html',
  styleUrls: ['./emergencycard.component.css']
})
export class EmergencycardComponent implements OnInit {
  scrollDistance = 1;
  pagination = [];
  emergencyData= [];
  noEmergency;
  citySlug = '';
  areaSlug = '';
  // hospitals = [
  //   { name:'MEDIX Hospital', address:'Main Ferozpur Road, Opposite Pak Arab Society, Lahore'},
  //   { name:'Life Line Hospital', address:'Najam Clinic, 122 -Jehanzeb Block, Allama Iqbal Town, Kali Kothi Stop, Lahore'},
  //   { name:'Hasnain Medical Comlex',address:'11-A Sanda Road, Near MAO Collage, Lahore'}
  // ]

  constructor( private emergencyService: EmergencylistingService, private doctorService: DoctorlistingService) { }

  ngOnInit() {
    if (this.doctorService.routUrl == true) {
      this.testingFunction();
      this.doctorService.routUrl = false;
    } else {
      this.emergencyListing();
    }
  }
  testingFunction() {
    if (this.doctorService.directDataUrl['emergencies'].length !== 0) {
      this.emergencyData = this.doctorService.directDataUrl['emergencies'];
      this.noEmergency = false;
    } else {
      this.noEmergency = true;
    }
    this.pagination = this.doctorService.directDataUrl['pagination'];
    this.citySlug = this.doctorService.cityDataSlug;
  }
  emergencyListing() {
    this.emergencyService.emList().subscribe(data => {
      this.emergencyData = data['data']['emergencies'];
      this.pagination = data['data']['pagination'];
    });
  }
  newFilterData(dataArray, city, area) {
    this.emergencyData = dataArray['emergencies'];
    this.pagination = dataArray['pagination'];
    this.citySlug = city;
    this.areaSlug = area;
    if (dataArray['emergencies'] == '') {
      this.noEmergency = true;
    }else {
      this.noEmergency = false;
    }
  }
  onScrollDown() {
    if (this.pagination['has_more'] === true) {
      this.emergencyService.emList(this.pagination['next_url'] + this.citySlug + this.areaSlug).subscribe(data => {
        data['data']['emergencies'].forEach((value) => {
          this.emergencyData.push(value);
        });
        this.pagination = data['data']['pagination'];
      });
    }
  }
}
