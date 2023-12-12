import { Component, OnInit, Input } from '@angular/core';
// import {OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent} from "angular-star-rating/src/star-rating-struct";


@Component({
  selector: 'app-doctorratings',
  templateUrl: './doctorratings.component.html',
  styleUrls: ['./doctorratings.component.css']
})
export class DoctorratingsComponent implements OnInit {
@Input() colorFeedback;
@Input() doctorFeedback;


  constructor() { }

  ngOnInit() {
    console.log(this.colorFeedback);
  }

}
