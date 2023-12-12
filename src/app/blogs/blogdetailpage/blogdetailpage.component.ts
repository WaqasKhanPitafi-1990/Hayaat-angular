import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import {BlogService} from "../../services/blog.service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {CookieService} from "ngx-cookie-service";
import { environment } from '../../../environments/environment';
import {ToastsManager} from "ng2-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {Router, UrlSegment, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET} from "@angular/router";
import {Title, Meta} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blogdetailpage',
  templateUrl: './blogdetailpage.component.html',
  styleUrls: ['./blogdetailpage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogdetailpageComponent implements OnInit {
  directParams;
  imagePath = environment.baseUrl;
  form: FormGroup;
  modalRef: BsModalRef;
  blogData: any = [];
  constructor(
      private blogService: BlogService,
      private modalService: BsModalService,
      private fb: FormBuilder,
      private userService: UserService,
      private cookieService: CookieService,
      private toastr: ToastsManager,
      private router: Router,
      private meta: Meta,
      private title: Title,
      private route: ActivatedRoute) {

    this.blogData = this.route.snapshot.data['blogDetail']['data'];
    this.title.setTitle(this.blogData['title']);
    if ((this.blogData['meta_keyword'] && this.blogData['meta_description']) !== null || (this.blogData['meta_keyword'] && this.blogData['meta_description']) !== '') {
      meta.addTags([
        {
          name: 'keywords',
          content: this.blogData['meta_keyword']
        },
        {
          name: 'description',
          content: this.blogData['meta_description']
        },
      ]);
    } else {
      meta.addTags([
        {
          name: 'keywords',
          content: 'digital healthcare blog, Digital Healthcare Solution, Find a doctor, Book appointment online, Find Blood donor, Nearest Emergency Center, pathology lab, online pharmacy, order medicine online, electronic health record, electronic medical record, EHR, EMR, Lahore, Karachi, Pakistan'
        },
        {
          name: 'description',
          content: 'Read the guides and advice about the healthcare industry. Learn more about healthcare data, industry trends, cost, pharmacies, healthcare providers & hospitals.'
        },
      ]);
    }
  }

  ngOnInit() {
    this.createForm();
    window.scroll(0,0);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  createForm() {
    this.form = this.fb.group({
      description: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: ['', Validators],
    });
  }
  comment(form, template) {
    const params = 'description=' + form.description + '&blog=' + this.blogData['id'] + '&parent=' + '0';
    this.blogService.createComment(params).subscribe(
      (data) => {
        if (data['logged_in'] === false) {
          this.openModal(template);
        } else if ( data['success'] === true) {
          this.commentSuccess(data['message']);
          this.blog();
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.commentError(err.error.message);
        }
      }
    );
  }
  userLogin(form) {
    const params = 'username=' + form.username + '&password=' + form.password ;
    this.userService.Login(params).subscribe(
      (data) => {
        if (data['access_token'] !== '') {
          this.cookieService.set('token', 'Bearer ' + data['access_token'], data['expires_in']);
          this.modalRef.hide();
          this.commentSuccess('Login Successfully');
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.commentError(err.error.message);
        }
      }
    );
  }

  blog() {
    this.blogService.blogDetail().subscribe(
      (data) => {
        this.blogData = data['data'];
      }
    );
  }
  commentSuccess(message) {
    this.toastr.success( message, 'Done!');
  }
  commentError(message) {
    this.toastr.error(message, 'Oopss!!!');
  }
}
