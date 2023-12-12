import { Component, OnInit} from '@angular/core';
import { EmergencyMapService } from "../../services/emergencymap.service";
import { GlobalVariable } from "../../globals";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-emergencymap',
  templateUrl: './emergencymap.component.html',
  styleUrls: ['./emergencymap.component.css']
})
export class EmergencymapComponent implements OnInit {

  markers = [];
  imagepath: string = environment.baseUrl;
  zoom: number = 14;
  lat: number = 31.582045;
  lng: number = 74.329376;
  latitude: number = undefined;
  longitude: number = undefined;
  dir = undefined;

  constructor( private emergencymap: EmergencyMapService) { }
  ngOnInit() {
    this.emergencymap.emList();
    this.emergencymap.emList().subscribe(data => {
      this.markers = data['data']['emergencies'];
    });
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
