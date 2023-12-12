import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {BlogService} from './blog.service';
import { environment } from '../../environments/environment';

@Injectable()
export class BlogDetailResolverService implements Resolve<any> {

  constructor(private blogService: BlogService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any> {
    this.blogService.blogId = route.paramMap.get('slug');
    return this.blogService.blogDetail();
  }
}
