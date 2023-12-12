import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reports = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.userService.getReportList().subscribe(
      (data) => {
        this.reports = data['data'];
      }
    );
  }
}
