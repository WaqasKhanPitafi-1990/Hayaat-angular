import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../services/blog.service";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-sidebar-blog',
  templateUrl: './sidebar-blog.component.html',
  styleUrls: ['./sidebar-blog.component.css']
})
export class SidebarBlogComponent implements OnInit {
  imagePath = environment.baseUrl;
 recentBlog = [];
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getRecentBlog();
  }
  getRecentBlog() {
    this.blogService.getBlogs().subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          for (let x = 0; x <= 2; x++) {
            this.recentBlog.push(data['data']['blogPosts'][x]);
          }
        }
      }
    );
  }
}
