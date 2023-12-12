import { Component, OnInit, ViewEncapsulation, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { GlobalVariable } from "../../globals";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-view-emergency-map',
  templateUrl: './view-emergency-map.component.html',
  styleUrls: ['./view-emergency-map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewEmergencyMapComponent implements OnInit {
  @Input() emergencyLngLat;
  modalRef: BsModalRef;
  markers = [];
  latitude: number = undefined;
  longitude: number = undefined;
  // google maps zoom level
  imagepath: string = environment.baseUrl;
  zoom: number = 14;
  lat: number = 31.582045;
  lng: number = 74.329376;
  dir = undefined;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.markers = this.emergencyLngLat;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public getDirection(lats, lngs) {
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
}
