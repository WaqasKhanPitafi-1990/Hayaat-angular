import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Meta} from "@angular/platform-browser";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PrivacypolicyComponent implements OnInit {

  constructor(private meta: Meta,
              private titleService: Title) {
    this.titleService.setTitle('Our privacy policy and your privacy rights at Hayaat.pk');
    this.meta.addTag( {
      name: 'description',
      content: 'We at Hayaat understand that you expect privacy of data. Hayaat Privacy Policy explains how we manage & protect your personal data & healthcare information.'
    });
    this.meta.addTag(  {
      name: 'keywords',
      content: 'Privacy Policy, data privacy, user data privacy, healthcare information, privacy of data, electronic health record security, electronic health records privacy, ehr security measures'
    });
  }

  ngOnInit() {
  }

}
