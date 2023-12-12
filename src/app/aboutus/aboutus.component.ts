import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Meta} from "@angular/platform-browser";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AboutusComponent implements OnInit {

  constructor(
    private meta: Meta,
    private titleService: Title
  ) {
    this.titleService.setTitle('Find blood, doctor rating & review, book appointment online');

    meta.addTags([
      {
        name: 'keywords',
        content: 'Digital Healthcare Solution, Find a doctor, Book appointment online, Find Blood donor, Nearest Emergency Center, pathology lab, online pharmacy, order medicine online, Lahore, Karachi, Pakistan, electronic health record, electronic medical record, EHR, EMR, '
      },
      {
        name: 'description',
        content: 'Looking for a blood donor or an emergency center? Need help finding the right doctor? Trying to find online pharmacy or pathology lab? Select a doctor from the list of specialists and book appointment online'
      },
    ]);
  }
  ngOnInit() {
  }

}
