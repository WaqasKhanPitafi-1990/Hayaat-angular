import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-medical-record-images',
  templateUrl: './medical-record-images.component.html',
  styleUrls: ['./medical-record-images.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedicalRecordImagesComponent implements OnInit {
  image_src = 'assets/images/prescription.jpg';
  image_small = 'assets/images/prescription.jpg';
  modalRef: BsModalRef;
  thumbnails = [
    'assets/images/prescription.jpg',
    'assets/images/prescription2.jpg',
  ];
  constructor(private modalService: BsModalService) {
  }
  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getImgSrc(src, i) {
    this.image_src = src;
    this.image_small = src;
   // console.log(src);
  }
}
