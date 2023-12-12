import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import {BsModalService} from "ngx-bootstrap";
import {BsModalRef} from "ngx-bootstrap";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit {

  image_src = '';
  image_small = '';
  pathTwo = false;
  pathOne = false;
  pathThree = false;
  pathFour = false;
  imagesNull = true;
  total_img_count;
  current_img = '1';
  imagePath = environment.baseUrl;
  customerDetail = [];
  productDetail = [];
  @Input() invoiceDetail;
  thumbnails = [
    {key: '1', src: 'assets/img/prescription.jpg'},
    {key: '2', src: 'assets/img/prescription2.jpg'},
    {key: '3', src: 'assets/img/prescription.jpg'}
  ];

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
              private userService: UserService) {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.getCount();
  }

  // images binding for zoomer
  getImgSrc(src, i) {
    this.image_src = environment.baseUrl + '/' + src;
    this.image_small = environment.baseUrl + '/' + src;
    this.current_img = i + 1;
  }

  getCount() {
    this.total_img_count = this.thumbnails.length;
  }
  invoiceDetailData() {
    this.userService.invoiceDetail(this.invoiceDetail).subscribe(
      (data: any[]) => {
        this.customerDetail = data['data'];
        this.productDetail = data['data']['invoiceItems'];
        if (data['data']['medias'].length !== 0) {
          this.thumbnails = data['data']['medias'];
          this.image_src = environment.baseUrl + '/' + data['data']['medias'][0]['image'];
          this.image_small = environment.baseUrl + '/' + data['data']['medias'][0]['image'];
          this.imagesNull = false;
          this.getCount();
        } else {
          this.image_small = '';
          this.image_src = '';
        }
      }
    );
  }
}
