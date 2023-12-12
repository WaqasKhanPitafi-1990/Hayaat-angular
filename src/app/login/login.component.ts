import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService ) {}
  openModal(template: TemplateRef<any>) {
       this.modalRef = this.modalService.show(template);
     }

  ngOnInit() {
  }
  redirectDoctor() {
    window.location.href = 'http://doctor.hayaat.pk';
  }
}
