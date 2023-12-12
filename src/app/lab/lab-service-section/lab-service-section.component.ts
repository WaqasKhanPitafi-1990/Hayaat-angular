import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-lab-service-section',
  templateUrl: './lab-service-section.component.html',
  styleUrls: ['./lab-service-section.component.css']
})
export class LabServiceSectionComponent implements OnInit {

  constructor(private title: Title,
              private meta: Meta,) {
    this.title.setTitle('Order lab tests online - Book affordable diagnostic center for lab tests');

    this.meta.addTags([
      {
        name: 'keywords',
        content: 'Order lab, lab test online, lab test, order lab test, diagnostic center, pathology services, pathology center, online lab tests, pathology lab service, lab service'
      },
      {
        name: 'description',
        content: 'Order fast and convenient lab testing online from best pathology labs in Pakistan. Book diagnostic center for lab tests online that are secure and affordable. Select a test, see lab test pricings and upload prescription for the test request. Order your lab tests online today.'
      },
    ]);
  }

  ngOnInit() {
  }

}
