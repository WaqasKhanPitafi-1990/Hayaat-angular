import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {PharmacyService} from "../../services/pharmacy.service";
import { environment } from '../../../environments/environment';
import {Router, UrlSegment, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, ActivatedRoute} from "@angular/router";
import {DoctorlistingService} from "../../services/doctorlisting.service";
import {Title, Meta} from '@angular/platform-browser';


@Component({
  selector: 'app-pharmacybrancheslist',
  templateUrl: './pharmacybrancheslist.component.html',
  styleUrls: ['./pharmacybrancheslist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PharmacybrancheslistComponent implements OnInit {
  orderNow = false;
  imagePath = environment.baseUrl;
  directParams;
  branches= [];
  pharmacyDetail: any = [];
  noPharmacyBranch;
  pharmacyBranchLogo;
  constructor(private pharmacyService: PharmacyService,
              private router: Router,
              private doctorService: DoctorlistingService,
              private title: Title,
              private meta: Meta,
              private route: ActivatedRoute) {
    this.pharmacyDetail = this.route.snapshot.data['pharmacyDetail']['data'];
    this.doctorService.pharmacyReviewId = this.route.snapshot.data['pharmacyDetail']['id'];

    this.title.setTitle(this.pharmacyDetail['name'] + ' | Order medicines online from ' + this.pharmacyDetail['name']);

    this.meta.addTags([
      {
        name: 'keywords',
        content: this.pharmacyDetail['name'] +', order medicine from ' + this.pharmacyDetail['name']+ ', buy medicine from '+ this.pharmacyDetail['name'] +', order medicine online, buy medicine online, online medical store, online chemists, Online Pharmacy, buy original medicine,  medicine delivery service, medicine delivery'
      },
      {
        name: 'description',
        content: 'Buy medicines online and get it delivered at your doorsteps from '+ this.pharmacyDetail['name'] +'. Order prescription medicines online at '+this.pharmacyDetail['name'] +' from the convenience of your home and pay on delivery.'
      },
    ]);
  }

  ngOnInit() {
    if (location.pathname !== '/pharmacy/csh-pharmacy') {
      this.orderNow = true;
    }
  }
}
