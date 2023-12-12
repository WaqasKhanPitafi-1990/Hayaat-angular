import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import {BsModalService} from "ngx-bootstrap";
import {BsModalRef} from "ngx-bootstrap";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-prescription-view',
  templateUrl: './prescription-view.component.html',
  styleUrls: ['./prescription-view.component.css']
})
export class PrescriptionViewComponent implements OnInit {
  @Input() prescriptions;
  imagePath = environment.baseUrl;
  image_src;
  image_small;
  modalRef: BsModalRef;
  thumbnails = [
    'assets/images/prescription.jpg',
    'assets/images/prescription2.jpg',
  ];
  constructor(private modalService: BsModalService) {
  }
  ngOnInit() {
    this.image_src = environment.baseUrl + '/' + this.prescriptions[0]['image'];
    this.image_small = environment.baseUrl + '/' + this.prescriptions[0]['image'];
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
