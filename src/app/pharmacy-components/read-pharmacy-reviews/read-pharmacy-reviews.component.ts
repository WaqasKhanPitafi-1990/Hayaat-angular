import { Component, OnInit, ViewEncapsulation, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {PharmacyService} from "../../services/pharmacy.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-read-pharmacy-reviews',
  templateUrl: './read-pharmacy-reviews.component.html',
  styleUrls: ['./read-pharmacy-reviews.component.css']
})
export class ReadPharmacyReviewsComponent implements OnInit {
  imagePath = environment.baseUrl;
  @Input() reviewsDetail;
  modalRef: BsModalRef;
  reviewDetail = [];
  constructor(private modalService: BsModalService, private pharmacyService: PharmacyService) { }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
  }

}
