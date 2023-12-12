import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {GlobalVariable} from "../../globals";
import { environment } from '../../../environments/environment';
import {DoctorlistingService} from "../../services/doctorlisting.service";
import {Title, Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-doctorinfo',
  templateUrl: './doctorinfo.component.html',
  styleUrls: ['./doctorinfo.component.css'],
  encapsulation: ViewEncapsulation.None,
  // directives: [DoctorratingsComponent]
})
export class DoctorinfoComponent implements OnInit {
  @Input() doctorInfo;
    eduArr;
    drService;
    reviews = false;
    doctorLocation: any = [];

  constructor(private doctorService: DoctorlistingService,
              private meta: Meta,
              private titleService: Title) {
    // console.log('const ere');
    // this.titleService.setTitle( '- Book appointment online ');
    //
    // this.meta.addTags([
    //   {
    //     name: 'keywords',
    //     content: 'find a doctor, book appointment online, book online appointment, doctor finder, online doctor appointment, online medical appointment, online appointment with doctor, online doctor, find a doctor near me, find me a doctor, find a specialist doctor, digital healthcare solution, electronic health record, electronic medical record, EHR, EMR'
    //   },
    //   {
    //     name: 'description',
    //     content: 'Book an appointment with '
    //   },
    // ]);
  }

  ngOnInit() {
    this.doctorDetailData();
  }
  doctorDetailData() {
    this.doctorService.doctorsDetail().subscribe(
      (data) => {
        this.doctorLocation =  data['data']['locations'];
        this.doctorLocation.forEach((value) => {
          value.lat = parseFloat(value.lat);
          value.long = parseFloat(value.long);
        });
      });
  }

  checkSplit() {
    this.eduArr = this.doctorInfo.education.split(',');
    this.drService = this.doctorInfo.services.split(',');
    if (this.doctorInfo['feedbacks'].length === 0) {
      this.reviews = true;
    }
  }
  // google maps zoom level
  imagepath: string = environment.baseUrl;
  zoom: number = 14;
  // initial center position for the map
  // lat: number = 51.673858;
  // lng: number = 7.815982;
  // //Lahore
  lat: number = 31.582045;
  lng: number = 74.329376;


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }
}
