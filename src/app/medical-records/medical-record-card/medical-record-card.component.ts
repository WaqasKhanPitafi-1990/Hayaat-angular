import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-medical-record-card',
  templateUrl: './medical-record-card.component.html',
  styleUrls: ['./medical-record-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedicalRecordCardComponent implements OnInit {
  medicalRecords = [];
  day;
  month;
  year;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userProfile();
  }
  userProfile() {
    this.userService.getProfile().subscribe(
      (data: any[]) => {
       this.medicalRecords = data['data']['documents']['listing'];
      }
    );
  }
  getTimeSlot(date) {
    // console.log(date.toString().split(' '));
    this.day = date.getDate();
    this.month = date.getMonth() + parseInt('1', 10);
    this.year = date.getYear().toString().slice(1, 3);
  }
}
