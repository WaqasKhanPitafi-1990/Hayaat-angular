import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BlogService } from "../../services/blog.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-healthblog',
  templateUrl: './healthblog.component.html',
  styleUrls: ['./healthblog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HealthblogComponent implements OnInit {
  scrollDistance = 1;
  blogData = [];
  pagination = [];
  blogSLug = '';
  noBlog = false;
  scrollFlag = false;
  imagePath = environment.baseUrl;
  constructor(private blogService: BlogService) { }
  ngOnInit() {
    this.healthBlog();
  }
  healthBlog() {
    this.blogService.getBlogs().subscribe(
      (data: any[]) => {
        this.blogData = data['data']['blogPosts'];
        this.pagination = data['data']['pagination'];
        this.scrollFlag = true;
      }
    );
  }
  blogId(id) {
    this.blogService.saveBlogId(id);
  }
  onScrollDown() {
    if (this.scrollFlag === true) {
      if (this.pagination['has_more'] === true) {
        this.scrollFlag = false;
        this.blogService.getBlogs(this.pagination['next_url']).subscribe(
          (data: any[]) => {
            if (data['success'] === true) {
              data['data']['blogPosts'].forEach((value) => {
                this.blogData.push(value);
              });
              this.pagination = data['data']['pagination'];
              this.scrollFlag = true;
            }
         });
      }
    }
  }
}
