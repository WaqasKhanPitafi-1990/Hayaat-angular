import { Component, OnInit } from '@angular/core';
import {LabService} from '../../services/lab.service';
import {FormControl} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import { environment } from '../../../environments/environment';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-lab-test-detail',
  templateUrl: './lab-test-detail.component.html',
  styleUrls: ['./lab-test-detail.component.css']
})
export class LabTestDetailComponent implements OnInit {
  testListAll = [];
  testListCommon = [];
  check = [];
  checkAll = [];
  testId = [];
  labs = [];
  indeterminate = false;
  imgLoader = false;
  imgLoaderTest = false;
  imgPath = environment.baseUrl;
  constructor(private labService: LabService,
              private toastr: ToastsManager,
              private title: Title,
              private meta: Meta) {
    this.title.setTitle('Select a lab test - Order lab tests online');

    this.meta.addTags([
      {
        name: 'keywords',
        content: 'Order lab, lab test online, lab test, order lab test, diagnostic center, pathology services, pathology center, online lab tests, pathology lab service, lab service'
      },
      {
        name: 'description',
        content: 'Choose a lab test from the list of available diagnostic tests. Choose from the list of pathology labs and order test online. Affordable, convenient & confidential lab tests from the best diagnostic centers in Pakistan.'
      },
    ]);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.imgLoaderTest = true;
    this.labService.getTestList().subscribe(
      (data) => {
        if (data['success'] == true) {
          this.imgLoaderTest = false;
          this.testListAll = data['data']['testItems_all'];
          this.testListCommon = data['data']['testItems_common'];
        }
      }
    );
  }

  getValue(id, i) {
    if (this.checkAll.length !== 0) {
      if (this.checkAll[i] === true) {
        this.testId.push(id);
      } else if (this.checkAll[i] === false) {
        for (let x = 0; x <= this.testId.length; x++) {
          if (this.testId[x] === id) {
            this.testId.splice(x, 1);
          }
        }
      }
    } else {
      if (this.check[i] === true) {
        this.testId.push(id);
      } else if (this.check[i] === false) {
        for (let x = 0; x <= this.testId.length; x++) {
          if (this.testId[x] === id) {
            this.testId.splice(x, 1);
          }
        }
      }
    }
  }
  getLab() {
    if(this.testId.length === 0) {
      this.typeError('Please select test first');
    } else {
      this.imgLoader = true;
      let params = '';
      for (let x = 0; x <= this.testId.length; x++) {
        if (this.testId[x] !== undefined) {
          params += this.testId[x] + ',';
        }
      }
      this.labService.getLabByTest(params).subscribe(
        (data) => {
          if (data['success'] === true) {
            this.imgLoader = false;
            this.labs = data['data']['Labs'];
          }
        }
      );
    }
  }
  getLabId (id) {
    this.labService.labData = this.labs.find(x =>x.id === id);
    this.labService.orderWithLab = true;

  }
  typeSuccess() {
    this.toastr.success( 'Login Successfully', 'Welcome!');
  }
  typeError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
}
