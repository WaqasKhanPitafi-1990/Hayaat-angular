import { Component, OnInit, ViewEncapsulation, TemplateRef, Input, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {DoctorlistingService} from "../../services/doctorlisting.service";
import {IStarRatingIOnHoverRatingChangeEvent, IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven} from "angular-star-rating/dist";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-write-pharmacy-reviews',
  templateUrl: './write-pharmacy-reviews.component.html',
  styleUrls: ['./write-pharmacy-reviews.component.css']
})
export class WritePharmacyReviewsComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  rating;
  loginGif = false;
  writeComment = false;
  form: FormGroup;
  modalRef: BsModalRef;
  onClickResult: IStarRatingOnClickEvent;
  onHoverRatingChangeResult: IStarRatingIOnHoverRatingChangeEvent;
  onRatingChangeResult: IStarRatingOnRatingChangeEven;

  constructor(private modalService: BsModalService,
              private cookieService: CookieService,
              private fb: FormBuilder,
              private doctorService: DoctorlistingService,
              private toastr: ToastsManager) {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      feedback: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }

  writePharmacyFeedback(formData) {
    this.loginGif = true;
    const params = 'feedback=' + formData.feedback + '&rating=' + this.rating + '&type=1';
    this.doctorService.writePharmacyFeedBack(params).subscribe(
      (data) => {
        if (data['success'] === true) {
          this.typeSuccess(data['message']);
          this.modalRef.hide();
          this.loginGif = false;
          this.childEvent.next('true');
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.typeError(err.error.message);
          this.loginGif = false;
        }
      }
    );
  }

  onClick = ($event: IStarRatingOnClickEvent) => {
    this.onClickResult = $event;
    this.rating = this.onClickResult.rating;
  }

  onRatingChange = ($event: IStarRatingOnRatingChangeEven) => {
    this.onRatingChangeResult = $event;
  }

  onHoverRatingChange = ($event: IStarRatingIOnHoverRatingChangeEvent) => {
    this.onHoverRatingChangeResult = $event;
  }

  typeSuccess(message) {
    this.toastr.success(message, 'Done!');
  }

  typeError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
}
