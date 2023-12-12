import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../services/blog.service";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-press-release-card',
  templateUrl: './press-release-card.component.html',
  styleUrls: ['./press-release-card.component.css']
})
export class PressReleaseCardComponent implements OnInit {
  scrollDistance = 1;
  blogData = [];
  pagination = [];
  blogSLug = '';
  noBlog = false;
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
      }
    );
  }
  blogId(id) {
    this.blogService.saveBlogId(id);
  }
  onScrollDown() {
    if (this.pagination['has_more'] == true) {
      this.blogService.getBlogs(this.pagination['next_url']).subscribe(
        (data: any[]) => {
          data['data']['blogPosts'].forEach((value) => {
            this.blogData.push(value);
          });
          this.pagination = data['data']['pagination'];
        });
    }
  }
}
