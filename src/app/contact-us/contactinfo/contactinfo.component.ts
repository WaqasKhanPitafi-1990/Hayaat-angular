import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Meta} from "@angular/platform-browser";
import {Title} from "@angular/platform-browser";
import { EmergencyMapService } from "../../services/emergencymap.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contactinfo',
  templateUrl: './contactinfo.component.html',
  styleUrls: ['./contactinfo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactinfoComponent implements OnInit {
  markers = [];
  imagepath: string = environment.baseUrl;
  zoom: number = 14;
  lat: number = 31.582045;
  lng: number = 74.329376;
  latitude: number = undefined;
  longitude: number = undefined;
  dir = undefined;
  constructor(  private meta: Meta,
                private titleService: Title,
                private emergencyMap: EmergencyMapService) {
    this.titleService.setTitle('Hayaat.pk - Find a doctor and book an appointment online ');

    this.meta.addTag({
      name: 'description',
      content: 'Hayaat is a comprehensive healthcare solution to find a doctor, hospital, blood donor or nearest emergency center? Use Hayaat or contact us for more'
    });
    this.meta.addTag({
      name: 'keywords',
      content: 'Digital Healthcare Solution, Find a doctor, Book appointment online, Find Blood donor, Nearest Emergency Center, pathology lab, online pharmacy, order medicine online, Lahore, Karachi, Pakistan, electronic health record, electronic medical record, EHR, EMR, '
    });
  }

  ngOnInit() {

  }
  private setCurrentPosition(lats, lngs) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.dir = {
          origin: {lat: this.latitude, lng: this.longitude},
          destination: {lat: lats, lng: lngs}
        };
      });
    }
  }

  public getDirection(lats, lngs) {
    this.setCurrentPosition(lats, lngs);
  }
}
