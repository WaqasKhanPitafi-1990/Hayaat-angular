import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DoctorlistingService} from '../../services/doctorlisting.service';
import { environment } from '../../../environments/environment';
import {Router, UrlSegment, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, ActivatedRoute} from '@angular/router';
import {Meta} from '@angular/platform-browser';
import {Title} from '@angular/platform-browser';




@Component({
  selector: 'app-doctordetail',
  templateUrl: './doctordetail.component.html',
  styleUrls: ['./doctordetail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DoctordetailComponent implements OnInit {
  doctorDetail: any = [];
  doctorToday: any = [];
  singleLocationId;
  doctorSpeciality: any = [];
  facebookIcon = false;
  twitterIcon = false;
  googlePlusIcon = false;
  linkedInIcon = false;
  doctorWebsite = false;
  imagePath = environment.baseUrl;
  directParams;
  url;
  metaTag = false;



  constructor(private doctorService: DoctorlistingService,
              private router: Router,
              private meta: Meta,
              private titleService: Title,
              private route: ActivatedRoute) {

    this.doctorDetail = this.route.snapshot.data['detail']['data'];
  }

  ngOnInit() {
    this.doctorDetailData();
    this.titleService.setTitle(this.doctorDetail['name'] + ', ' + this.doctorDetail['specialities'][0]['name'] + ' in ' + this.doctorDetail['locations'][0]['city'] + '- Book appointment online ');

    this.meta.addTags([
      {
        name: 'keywords',
        content: this.doctorDetail['name'] + ', ' + this.doctorDetail['specialities'][0]['name'] + ', ' + this.doctorDetail['locations'][0]['city'] + ', ' + this.doctorDetail['name'] + ' '+ this.doctorDetail['specialities'][0]['name'] +' '+  this.doctorDetail['locations'][0]['city'] + ', ' + 'find a doctor, book appointment online, book online appointment, doctor finder, online doctor appointment, online medical appointment, online appointment with doctor, online doctor, find a doctor near me, find me a doctor, find a specialist doctor, digital healthcare solution, electronic health record, electronic medical record, EHR, EMR'
      },
      {
        name: 'description',
        content: 'Book an appointment with ' + this.doctorDetail['name'] + ', ' + this.doctorDetail['specialities'][0]['name'] + ' in ' + this.doctorDetail['locations'][0]['city'] + '. Read patients reviews about ' + this.doctorDetail['name'] + ' ' + this.doctorDetail['specialities'][0]['name'] + ' in ' + this.doctorDetail['locations'][0]['city'] + ', see up to date availability and book an appointment instantly. Find more details about ' + this.doctorDetail['name'] + ' ' + this.doctorDetail['specialities'][0]['name'] + ' at Hayaat.pk '
      },
    ]);
  }
  doctorDetailData() {
      this.doctorService.doctorId = this.doctorDetail['id'];
      this.doctorSpeciality = this.doctorDetail['specialities'];
      this.doctorToday = this.doctorDetail['locations'];
      this.singleLocationId = this.doctorToday[0]['id'];
      if (this.doctorDetail['facebook'] !== null || this.doctorDetail['facebook'] !== '') {
        this.facebookIcon = true;
      } else if (this.doctorDetail['google_plus'] !== null || this.doctorDetail['google_plus'] !== '') {
        this.googlePlusIcon = true;
      } else if (this.doctorDetail['linked_in'] !== null || this.doctorDetail['linked_in'] !== '') {
        this.linkedInIcon = true;
      } else if (this.doctorDetail['twitter'] !== null || this.doctorDetail['twitter'] !== '') {
        this.twitterIcon = true;
      } else if (this.doctorDetail['website'] !== null || this.doctorDetail['website'] !== '') {
        this.doctorWebsite = true;
      }

  }
}
