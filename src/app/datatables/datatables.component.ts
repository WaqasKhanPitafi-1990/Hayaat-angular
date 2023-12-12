import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-datatables',
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DatatablesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      ajax: 'assets/data.json',
      columns: [{
        title: 'Patient Name',
        data: 'patientName'
      }, {
        title: 'Doctor',
        data: 'Doctor'
      }, {
        title: 'Address',
        data: 'Address'
      }, {
        title: 'Date/time',
        data: 'datetime'
      }, {
        title: 'Status',
        data: 'status'
      }]
    };
  }

}




