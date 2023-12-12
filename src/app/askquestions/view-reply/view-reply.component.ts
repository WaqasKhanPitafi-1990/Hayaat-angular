import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DoctorlistingService} from "../../services/doctorlisting.service";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-view-reply',
  templateUrl: './view-reply.component.html',
  styleUrls: ['./view-reply.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewReplyComponent implements OnInit {
  loginGif = false;
  replyData: any = [];
  form: FormGroup;
  constructor(
    private doctorService: DoctorlistingService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastsManager,
    private route: ActivatedRoute) {
   this.doctorService.questionSlug = this.route.snapshot.paramMap.get('slug');
  }

  ngOnInit() {
    this.createForm();
    this.replies();
  }

  createForm() {
    this.form = this.fb.group({
      reply: ['', Validators.required],
    });
  }
  replies() {
    this.doctorService.getReply().subscribe(
      (data) => {
        this.replyData = data['data'];
      }
    );
  }
  saveReply(formData) {
    this.loginGif = true;
    const params = 'answer=' + formData.reply + '&question_id=' + this.replyData['id'];
    this.doctorService.addReply(params).subscribe(
      (data) => {
        if (data['success'] === true) {
          this.replies();
          this.replySuccess(data['message']);
          this.loginGif = false;
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.replyError(err.error.message);
          this.loginGif = false;
        }
      }
    );
  }
  replySuccess(message) {
    this.toastr.success( message, 'Done!');
  }
  replyError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
}
