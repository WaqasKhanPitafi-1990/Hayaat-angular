import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {Meta} from "@angular/platform-browser";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-healthpage',
  templateUrl: './healthpage.component.html',
  styleUrls: ['./healthpage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HealthpageComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title
  ) {

    this.titleService.setTitle('Digital Healthcare Blog - Healthcare guide & advice');
    meta.addTags([
      {
        name: 'keywords',
        content: 'digital healthcare blog, Digital Healthcare Solution, Find a doctor, Book appointment online, Find Blood donor, Nearest Emergency Center, pathology lab, online pharmacy, order medicine online, electronic health record, electronic medical record, EHR, EMR, Lahore, Karachi, Pakistan'
      },
      {
        name: 'description',
        content: 'Read the guides and advice about the healthcare industry. Learn more about healthcare data, industry trends, cost, pharmacies, healthcare providers & hospitals.'
      },
    ]);
  }

  ngOnInit() {
  }
}
