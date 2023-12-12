import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  loggedIn = false;
  menulist = false;
  toggleMenu(): void {
    this.menulist = !this.menulist;
  }

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    if (this.cookieService.check('token')) {
      this.loggedIn = true;
    }
  }
  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/']);
    location.reload();
  }
}
