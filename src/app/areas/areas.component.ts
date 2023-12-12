import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {UserService} from "../services/user.service";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AreasComponent implements OnInit {
  areasList = [];
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private userService: UserService, private cookieService: CookieService) {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.areaListHome();
  }
  close(){
    this.modalRef.hide();
  }
  areaListHome() {
    let cityId;
    if (this.cookieService.check('city')) {
      cityId = this.cookieService.get('city');
    } else {
      cityId = 1;
    }
    this.userService.getAreas(cityId).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
         this.areasList = data['data'];
        }
      }
    );
  }
}
