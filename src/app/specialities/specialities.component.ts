import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {DoctorlistingService} from "../services/doctorlisting.service";

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SpecialitiesComponent implements OnInit {
  specialityList = [];
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private doctorService: DoctorlistingService) { }

  ngOnInit() {
    this.getSpecialitiesHome();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  close(){
    this.modalRef.hide();
  }
  getSpecialitiesHome() {
    this.doctorService.doctorSpecialities().subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.specialityList = data['data'];
        }
      }
    );
  }
}
