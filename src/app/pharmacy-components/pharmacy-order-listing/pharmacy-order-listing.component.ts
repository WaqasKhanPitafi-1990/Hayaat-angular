import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import {PharmacyService} from "../../services/pharmacy.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastsManager} from "ng2-toastr";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pharmacy-order-listing',
  templateUrl: './pharmacy-order-listing.component.html',
  styleUrls: ['./pharmacy-order-listing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PharmacyOrderListingComponent implements OnInit {
  selectedLoaderId;
  page = 1;
  countHistory;
  countPending;
  accepted = [];
  history = [];
  pending = [];
  pagination_pending = [];
  pagination_history = [];
  pagination = [];
  imgPath = environment.baseUrl;
  imgLoader = false;
  constructor(private pharmacyService: PharmacyService,
              private toastr: ToastsManager) { }

  ngOnInit() {
    this.orders();
  }
  orders() {
    this.imgLoader = true;
    const url = environment.apiUrl + '/orders';
    this.pharmacyService.ordersList(url).subscribe(
      (data: any[]) => {
        if (data['success'] == true) {
          this.imgLoader = false;
          this.accepted = data['data']['accepted']['listing'];
          this.history = data['data']['history']['listing'];
          this.pending = data['data']['pending']['listing'];
          this.pagination_pending = data['data']['pending']['pagination'];
          this.pagination_history = data['data']['history']['pagination'];
          this.countHistory = data['data']['history']['pagination']['last_page'] + '0';
          this.countPending = data['data']['pending']['pagination']['last_page'] + '0';
        } else {
          this.imgLoader = false;
        }
      }
    );
  }
  cancelOrder(id) {
    this.selectedLoaderId = id;
    if (confirm('Are you sure to delete this order')) {
      const params = 'status=14';
      this.pharmacyService.cancelPharmacyOrder(params, id).subscribe(
        (data: any[]) => {
          if (data['success'] === true) {
            this.typeSuccess(data['message']);
            this.orders();
            this.selectedLoaderId = '';
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.typeError(err.error.message);
            this.selectedLoaderId = '';
          }
        }
      );
    } else {
      this.selectedLoaderId = '';
    }
  }
  pageChanged(event, type) {
    if (type == 'pending') {
      const url = environment.apiUrl + '/orders?page=' + event;
      this.pharmacyService.ordersList(url).subscribe(
        (data: any[]) => {
          this.pending = [];
          this.pending = data['data']['pending']['listing'];
          this.pagination_pending = data['data']['pending']['pagination'];
          this.countPending = data['data']['pending']['pagination']['last_page'] + '0';
          this.imgLoader = false;
        }
      );
    }else if (type == 'history') {
      const url = environment.apiUrl + '/orders?page=' + event;
      this.pharmacyService.ordersList(url).subscribe(
        (data: any[]) => {
          this.history = [];
          this.history = data['data']['history']['listing'];
          this.pagination_history = data['data']['history']['pagination'];
          this.countHistory = data['data']['history']['pagination']['last_page'] + '0';
          this.imgLoader = false;
        }
      );
    }
  }
  typeSuccess(message) {
    this.toastr.success( message, 'Success!');
  }
  typeError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
}
