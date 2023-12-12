import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {PharmacyService} from "../../services/pharmacy.service";
import {PharmacylistcontentComponent} from "../pharmacylistcontent/pharmacylistcontent.component";
import { environment } from '../../../environments/environment';
import {Meta} from "@angular/platform-browser";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PharmacyComponent implements OnInit {
  @ViewChild(PharmacylistcontentComponent)
  private pharmacyCard: PharmacylistcontentComponent;
  myControlCity: FormControl = new FormControl();
  myControlArea: FormControl = new FormControl();
  cities = [];
  areas = [];
  filteredCitiesOptions: Observable<string[]>;
  filteredAreaOptions: Observable<string[]>;
  searchCity;
  searchArea;
  citySlug = '';
  areaSlug = '';
  url;
  constructor(private pharmacyService: PharmacyService,
              private meta: Meta,
              private titleService: Title) {

    this.meta.updateTag({
      name: 'description',
      content: 'Buy medicines online and get it delivered at your doorsteps from chemists and medical stores. Hayaat.pk is the most reliable source to order medicines online in Pakistan. '
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'order medicine online, buy medicine online, online medical store, online chemists, Online Pharmacy, buy original medicine,  medicine delivery service, medicine delivery, '
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Order Medicines Online - Most reliable online medical stores portal');
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
  // areaList() {
  //   this.pharmacyService.getAreas(this.searchCity).subscribe(
  //     (data: any[]) => {
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
  // pharmacyByKeyUp(value) {
  //   const url = environment.apiUrl + '/home/pharmacy?search_query=' + value;
  //   this.pharmacyService.filteredData(url).subscribe(
  //     (data: any[]) => {
  //       if (data['success'] == true) {
  //         this.pharmacyCard.newFilterData(data['data']);
  //       }
  //     }
  //   );
  // }
  // searchedData() {
  //   this.url = environment.apiUrl + '/home/pharmacy?'
  //     + this.areaSlug + this.citySlug ;
  //   if (this.url.includes('?')) {
  //     const charIndex = this.url.indexOf('?');
  //     const newUrl = this.url.replace(this.url.charAt(charIndex + 1), '');
  //     this.pharmacyService.filteredData(newUrl).subscribe(
  //       (data: any[]) => {
  //         if (data['success'] == true) {
  //           this.pharmacyCard.newFilterData(data['data']);
  //         }
  //       }
  //     );
  //   }
  // }
}
