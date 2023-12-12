import { Component, OnInit, ViewChild } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {ModalDirective} from "ngx-bootstrap";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {UserService} from "../services/user.service";
import { environment } from '../../environments/environment';
import {AuthService} from "angularx-social-login";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  globalCity;
  form: FormGroup;
  @ViewChild('staticModal') staticModal: ModalDirective;
  isModalShown: boolean = false;
  loggedIn = false;
  imageFound = false;
  cities = [];
  profileData = [];
  ImageUrl = environment.baseUrl;
  constructor(public cookieService: CookieService,
              private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    if (this.cookieService.check('token')) {
      this.loggedIn = true;
      this.userProfile();
    }
    this.showModal();
    this.createForm();
    this.getCities();
    if (this.cookieService.check('city')) {
      this.isModalShown = false;
    }
  }
  logout() {
    this.cookieService.delete('token');
    this.authService.signOut();
    this.router.navigate(['/']);
    location.reload();
  }
  createForm() {
    this.form = this.fb.group({
      city: ['', Validators.required],
    });
  }
  showModal(): void {
    this.isModalShown = true;
  }
  getCities() {
    this.userService.getCities().subscribe(
      (data: any[]) => {
        this.cities = data['data'];
      });
  }
  saveCity(formData) {
    if (formData.city !== '') {
      this.globalCity = formData.city;
      this.cookieService.set('city', this.globalCity);
      this.isModalShown = false;
    } else {}
  }
  userProfile() {
    this.userService.getProfile().subscribe(
      (data: any[]) => {
        this.profileData = data['data']['profile_data'];
        if (this.profileData['avatar'] === null) {
         this.imageFound = true;
        }
      }
    );
  }
}
