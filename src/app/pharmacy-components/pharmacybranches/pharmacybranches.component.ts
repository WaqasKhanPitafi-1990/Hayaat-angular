import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {PharmacyService} from "../../services/pharmacy.service";
import {PharmacybrancheslistComponent} from "../pharmacybrancheslist/pharmacybrancheslist.component";
import { environment } from '../../../environments/environment';
import {Router, UrlSegment, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pharmacybranches',
  templateUrl: './pharmacybranches.component.html',
  styleUrls: ['./pharmacybranches.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PharmacybranchesComponent implements OnInit {

  @ViewChild(PharmacybrancheslistComponent)
  private pharmacyBranchCard: PharmacybrancheslistComponent;
  myControlCity: FormControl = new FormControl();
  myControlArea: FormControl = new FormControl();
  // myControlPharmacy: FormControl = new FormControl();
  cities = [];
  areas = [];
  pharmacies = [];
  filteredCitiesOptions: Observable<string[]>;
  filteredAreaOptions: Observable<string[]>;
  // filteredPharmacyOptions: Observable<string[]>;
  searchCity;
  searchArea;
  // searchPharmacy;
  citySlug = '';
  areaSlug = '';
  // pharmacySlug = '';
  url;
  directParams;
  constructor(private pharmacyService: PharmacyService,
              private router: Router) { }

  ngOnInit() {
    // if (location.pathname !== '/pharmacy') {
    //   this.getUrlParams();
    // }
    // this.getPharmacy();
    // this.getCities();
  }
  // getCities() {
  //   this.pharmacyService.getCities().subscribe(
  //     (data: any[]) => {
  //       if (data['success'] == true) {
  //         this.cities = data['data'];
  //         this.cities.unshift({id: 0, name: 'All'});
  //         this.filteredCitiesOptions = this.myControlCity.valueChanges
  //           .pipe(
  //             startWith(''),
  //             map(val => this.filterCities(val))
  //           );
  //       }
  //     }
  //   );
  // }
  // getPharmacy() {
  //   this.pharmacyService.pharmacies().subscribe(
  //     (data: any[]) => {
  //       console.log(data);
  //       if (data['success'] == true) {
  //         this.pharmacies = data['data']['pharmacies'];
  //         this.pharmacies.unshift({id: 0, name: 'All'});
  //         this.filteredPharmacyOptions = this.myControlPharmacy.valueChanges
  //           .pipe(
  //             startWith(''),
  //             map(val => this.filterPharmacies(val))
  //           );
  //       }
  //     }
  //   );
  // }
  // areaList() {
  //   this.pharmacyService.getAreas(this.searchCity).subscribe(
  //     (data: any[]) => {
  //       console.log(data);
  //       if (data['success'] == true) {
  //         this.areas = data['data'];
  //         this.areas.unshift({id: 0, name: 'All'});
  //         this.filteredAreaOptions = this.myControlArea.valueChanges
  //           .pipe(
  //             startWith(''),
  //             map(val => this.filterArea(val))
  //           );
  //       }
  //     }
  //   );
  // }
  // filterCities(val: string): string[] {
  //   return this.cities.filter(option =>
  //     option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  // }
  // filterArea(val: string): string[] {
  //   return this.areas.filter(option =>
  //     option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  // }
  // filterPharmacies(val: string): string[] {
  //   return this.pharmacies.filter(option =>
  //     option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  // }
  // pharmacyCity(value) {
  //   const selected = this.cities.find(b => b.name === value);
  //   this.searchCity = selected.id;
  //   if (selected.name !== 'All') {
  //     this.areaList();
  //   }
  //   if (this.searchCity !== 0) {
  //     this.citySlug = '&city=' + this.searchCity;
  //   }else {
  //     this.citySlug = '';
  //   }
  //   this.searchedData();
  // }
  // pharmacyArea(value) {
  //   const selected = this.areas.find(b => b.name === value);
  //   this.searchArea = selected.id;
  //   if (this.searchArea !== 0) {
  //     this.areaSlug = '&area=' + this.searchArea;
  //   }else {
  //     this.areaSlug = '';
  //   }
  //   this.searchedData();
  // }
  // pharmacyCurrent(value) {
  //   const selected = this.pharmacies.find(b => b.name === value);
  //   this.searchPharmacy = selected.id;
  //   if (this.searchPharmacy !== 0) {
  //     this.pharmacySlug = '&pharmacy=' + this.searchPharmacy;
  //   }else {
  //     this.pharmacySlug = '';
  //   }
  //   this.searchedData();
  // }
  // pharmacyBranchByKeyUp(value) {
  //   const url = environment.apiUrl + '/home/pharmacy-branches/' + this.pharmacyService.pharmacyId  + '?search_query=' + value;
  //   this.pharmacyService.filteredData(url).subscribe(
  //     (data: any[]) => {
  //       if (data['success'] == true) {
  //         this.pharmacyBranchCard.newFilterData(data['data']['branches']);
  //       }
  //     }
  //   );
  // }
  // searchedData() {
  //   this.url = environment.apiUrl + '/home/pharmacy-branches/' + this.pharmacyService.pharmacyId  + '?'
  //     + this.areaSlug + this.citySlug ;
  //   if (this.url.includes('?')) {
  //     const charIndex = this.url.indexOf('?');
  //     const newUrl = this.url.replace(this.url.charAt(charIndex + 1), '');
  //     this.pharmacyService.filteredBranchData(newUrl).subscribe(
  //       (data: any[]) => {
  //         if (data['success'] == true) {
  //           this.pharmacyBranchCard.newFilterData(data['data']['branches']);
  //         }
  //       }
  //     );
  //   }
  // }
  // getUrlParams() {
  //   const tree: UrlTree = this.router.parseUrl(location.pathname);
  //   const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
  //   const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
  //   this.directParams = s;
  //   this.url = environment.apiUrl + '/home/pharmacy-branches/' + this.directParams[1];
  //     this.pharmacyService.filteredBranchData(this.url).subscribe(
  //       (data: any[]) => {
  //         if (data['success'] == true) {
  //           this.pharmacyBranchCard.newFilterData(data['data']['branches']);
  //         }
  //       }
  //     );
  //   // }
  // }
}
