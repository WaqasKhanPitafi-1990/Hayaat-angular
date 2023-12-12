import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-hayaat-order-services',
  templateUrl: './hayaat-order-services.component.html',
  styleUrls: ['./hayaat-order-services.component.css']
})
export class HayaatOrderServicesComponent implements OnInit {

  constructor(   private title: Title,
                 private meta: Meta
  ) {
    this.title.setTitle('Buy medicines online or Book lab test online - Request A Test or Medicine');

    this.meta.addTags([
      {
        name: 'keywords',
        content: 'order medicine online, lab test online, lab test request online, buy medicine online, Request a lab test, online medical store, online chemists, Online Pharmacy, buy original medicine,  medicine delivery service, medicine delivery, online medical store'
      },
      {
        name: 'description',
        content: 'Order medicines online or order lab test in Pakistan from the comfort of your home. Ordering lmedicines and ab tests online with Hayaat.pk is easy, secure and fast. Buy genuine medicines from registered chemists and book lab tests online from reliable test labs & diagnostic centers. '
      },
    ]);
  }

  ngOnInit() {
  }

}
