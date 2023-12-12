import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {PharmacyService} from "../../services/pharmacy.service";
import {CookieService} from "ngx-cookie-service";
import { environment } from '../../../environments/environment';
import {Title, Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-pharmacylistcontent',
  templateUrl: './pharmacylistcontent.component.html',
  styleUrls: ['./pharmacylistcontent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PharmacylistcontentComponent implements OnInit {
  scrollDistance = 1;
  pagination = [];
  pharmacies = [];
  noPharmacy;
  loggedIn = false;
  isDefault = false;
  imagePath = environment.baseUrl;
  viewSuccess = false;
  constructor(private pharmacyService: PharmacyService,
              private cookieService: CookieService,
              private meta: Meta,
              private titleService: Title,) {
    this.titleService.setTitle('Order Medicines Online - Most reliable online medical stores portal');

    this.meta.addTags([
      {
        name: 'keywords',
        content: 'order medicine online, buy medicine online, online medical store, online chemists, Online Pharmacy, buy original medicine,  medicine delivery service, medicine delivery, '
      },
      {
        name: 'description',
        content: 'Buy medicines online and get it delivered at your doorsteps from chemists and medical stores. Hayaat.pk is the most reliable source to order medicines online in Pakistan. '
      },
    ]);
  }

  ngOnInit() {
      this.getPharmacies();
  }

  getPharmacies() {
    this.pharmacyService.pharmacies().subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.pharmacies = data['data']['pharmacies'];
          this.viewSuccess = true;
        }
      }
    );
  }
  getPharmacySlug(slug) {
    this.pharmacyService.pharmacyId = slug;
  }

  // getDefaultPharmacyId(id) {
  //   this.pharmacyService.savePharmacyId(id, '');
  // }
  // getPharmacyId(id, i) {
  //   this.pharmacyService.savePharmacyId(id, this.pharmacies[i]['logo']);
  // }
  // getPharmacies() {
  //   this.pharmacyService.pharmacies().subscribe(
  //     (data: any[]) => {
  //       if (data['data']['is_logged_in'] == false && data['data']['is_default'] == 0) {
  //         this.pharmacies = data['data']['pharmacies'];
  //         this.pagination = data['data']['pagination'];
  //         this.isDefault = true;
  //       } else if (data['data']['is_logged_in'] == true && data['data']['is_default'] == 0) {
  //         this.pharmacies = data['data']['pharmacies'];
  //         this.pagination = data['data']['pagination'];
  //         this.pharmacyService.userLoginInfo =  data['data'];
  //         // this.loggedIn = true;
  //         this.isDefault = true;
  //       } else if (data['data']['is_logged_in'] == true && data['data']['is_default'] == 1) {
  //         this.pharmacies = data['data'];
  //         this.loggedIn = true;
  //       }
  //     }
  //   );
  // }
  // newFilterData(dataArray) {
  //   this.pharmacies = dataArray['pharmacies'];
  //   this.pagination = dataArray['pagination'];
  //   if (dataArray['pharmacies'] == '') {
  //     this.noPharmacy = true;
  //   }else {
  //     this.noPharmacy = false;
  //   }
  // }
  // onScrollDown() {
  //   if (this.loggedIn == false  || this.loggedIn == true && this.isDefault == true) {
  //     if (this.pagination['has_more'] == true) {
  //       this.pharmacyService.pharmacies(this.pagination['next_url']).subscribe(
  //         (data: any[]) => {
  //           data['data']['pharmacies'].forEach((value) => {
  //             this.pharmacies.push(value);
  //           });
  //           this.pagination = data['data']['pagination'];
  //         });
  //     }
  //   }
  // }
}
