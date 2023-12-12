import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {LoginService} from "./login.service";
import { environment } from '../../environments/environment';

@Injectable()
export class BlogService {
  blogId;
  directUrlBlog = false;
  constructor(private http: HttpClient, private getHeader: LoginService) { }

  getBlogs(url = environment.apiUrl + '/home/blog-posts ') {
    return this.http.get(url , { headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  saveBlogId(id) {
    this.blogId = id ;
    this.directUrlBlog = true;
  }
  blogDetail() {
    return this.http.get(environment.apiUrl + '/home/blog-post/' + this.blogId , { headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  directUrlBlogDetail(slug) {
    return this.http.get(environment.apiUrl + '/home/blog-post/' + slug , { headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  createComment(params) {
    return this.http.post(environment.apiUrl + '/comments', params ,  { headers: this.getHeader.headers()}).map(
      (response) => response);
  }

  filteredData(url = environment.apiUrl + '/home/blog-posts'):  Observable <any> {
    return this.http.get(url , {headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
  recentBlog() {
    return this.http.get(environment.apiUrl + '/home/recent-blogs' ,  { headers: this.getHeader.createHeader()}).map(
      (response) => response);
  }
}
