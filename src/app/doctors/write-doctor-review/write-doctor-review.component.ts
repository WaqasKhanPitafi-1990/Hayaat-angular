import { Component, OnInit, ViewEncapsulation, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {DoctorlistingService} from "../../services/doctorlisting.service";
import {IStarRatingIOnHoverRatingChangeEvent, IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven} from "angular-star-rating/dist";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-write-doctor-review',
  templateUrl: './write-doctor-review.component.html',
  styleUrls: ['./write-doctor-review.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WriteDoctorReviewComponent implements OnInit {
  @Input() doctorFeedbackId;
  doctorReviewPath = false;
  rating;
  loginGif = false;
  writeComment = false;
  form: FormGroup;
  modalRef: BsModalRef;
  onClickResult: IStarRatingOnClickEvent;
  onHoverRatingChangeResult: IStarRatingIOnHoverRatingChangeEvent;
  onRatingChangeResult: IStarRatingOnRatingChangeEven;

  constructor(
    private modalService: BsModalService,
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
    if (this.cookieService.check('token')) {
      this.writeComment = true;
    } else {
      this.writeComment = false;
    }
  }
  createForm() {
    this.form = this.fb.group({
      feedback: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }
  writeFeedback(formData) {
    this.loginGif = true;
    const params = 'feedback=' + formData.feedback + '&rating=' + this.rating + '&type=2';
    this.doctorService.writeFeedBack(params, this.doctorFeedbackId).subscribe(
      (data) => {
        if (data['success'] === true) {
          this.typeSuccess(data['message']);
          this.modalRef.hide();
          this.loginGif = false;
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
    this.toastr.success( message, 'Done!');
  }
  typeError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
}
