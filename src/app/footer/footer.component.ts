import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {UserService} from "../services/user.service";
import {BlogService} from "../services/blog.service";
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  form: FormGroup;
  recentBlog = [];
  imagePath = environment.baseUrl;
  constructor(private userService: UserService, private fb: FormBuilder, private blogService: BlogService) { }

  ngOnInit() {
    this.createForm();
    this.healthBlog();
  }
  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required]
    });
  }
  subscribeEmail(form) {
    const params = 'email=' + form.email;
    this.userService.subscribe(params).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
        }
      }
    );
  }
  healthBlog() {
    this.blogService.getBlogs().subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          for (let x = 0; x <= 1; x++) {
            this.recentBlog.push(data['data']['blogPosts'][x]);
          }
        }
      }
    );
  }
  scrollup() {
    window.scroll(0, 0 );
  }
}
