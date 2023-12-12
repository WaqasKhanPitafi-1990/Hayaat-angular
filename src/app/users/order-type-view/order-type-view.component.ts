import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import {BsModalService} from "ngx-bootstrap";
import {BsModalRef} from "ngx-bootstrap";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-order-type-view',
  templateUrl: './order-type-view.component.html',
  styleUrls: ['./order-type-view.component.css']
})
export class OrderTypeViewComponent implements OnInit {
  @Input() prescriptionData;
  @Input() invoiceData;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
