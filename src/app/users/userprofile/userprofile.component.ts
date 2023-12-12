import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from "../../services/user.service";
import {CookieService} from "ngx-cookie-service";
import {GlobalVariable} from "../../globals";
import {PharmacyService} from "../../services/pharmacy.service";
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserprofileComponent implements OnInit {
  imagePath = environment.baseUrl;
  profileData: any = [];
  profile = [];
  noImageFound = false;
  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private pharmacyService: PharmacyService,
    ) { }

  ngOnInit() {
    this.userProfile();
  }
  checkEvent(value) {
    if (value) {
      this.userProfile();
    }
  }
  userProfile() {
   this.userService.getProfile().subscribe(
     (data) => {
         if (data['success'] === true) {
           this.profileData = data['data']['profile_data'];
           this.profile = data['data'];
           if (data['data']['profile_data']['avatar'] === null) {
             this.noImageFound = true;
           } else {
             this.noImageFound = false;
           }
         }
       }
     );
   }
}
