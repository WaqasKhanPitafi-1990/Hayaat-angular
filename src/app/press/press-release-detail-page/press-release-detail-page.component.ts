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

@Component({
  selector: 'app-press-release-detail-page',
  templateUrl: './press-release-detail-page.component.html',
  styleUrls: ['./press-release-detail-page.component.css']
})
export class PressReleaseDetailPageComponent implements OnInit {

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
    private router: Router) { }

  ngOnInit() {
    if ( this.blogService.directUrlBlog === true) {
      this.blog();
      this.blogService.directUrlBlog = false;
    } else {
      this.getUrlParams();
    }
    this.createForm();
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
  getUrlParams () {
    const tree: UrlTree = this.router.parseUrl(location.pathname);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
    this.directParams = s;
    this.blogService.directUrlBlogDetail(this.directParams[1]).subscribe(
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
