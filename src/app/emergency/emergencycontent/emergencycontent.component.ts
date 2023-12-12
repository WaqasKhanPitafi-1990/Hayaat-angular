
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {EmergencylistingService} from "../../services/emergencylisting.service";
import {EmergencycardComponent} from "../emergencycard/emergencycard.component";
import {Router, UrlSegment, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET} from "@angular/router";
import { environment } from '../../../environments/environment';
import {Meta} from "@angular/platform-browser";
import {Title} from "@angular/platform-browser";




@Component({
  selector: 'app-emergencycontent',
  templateUrl: './emergencycontent.component.html',
  styleUrls: ['./emergencycontent.component.css']
})


export class EmergencycontentComponent implements OnInit {

  @ViewChild(EmergencycardComponent)
  private emergencyCard: EmergencycardComponent;
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
  directParams;
  urlCities = [];
  constructor( private emergencyService: EmergencylistingService,
               private router: Router,
               private meta: Meta,
               private titleService: Title) {

    this.titleService.setTitle('Find nearest emergency center - Find Urgent Care');
    meta.addTags([
      {
        name: 'keywords',
        content: 'nearest emergency center, emergency center, emergency care, emergency center nearby, immediate care, hospital emergency, closest emergency center, 24 hour emergency care'
      },
      {
        name: 'description',
        content: 'Are you looking for the best Emergency Center near you? With Hayaat web & mobile healthcare app, you can find 24 hours emergency care by finding nearby emergency center anytime, anywhere.'
      },
    ]);
  }

  ngOnInit() {
    if (location.pathname !== '/nearest-emergency-centers') {
      this.getUrlParams();
    }
    this.getCities();
  }
  getCities() {
    this.emergencyService.getCities().subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.cities = data['data'];
          this.cities.unshift({id: 0, name: 'All'});
          this.filteredCitiesOptions = this.myControlCity.valueChanges
            .pipe(
              startWith(''),
              map(val => this.filterCities(val))
            );
        }
      }
    );
  }
  areaList() {
    this.emergencyService.getAreas(this.searchCity).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.areas = data['data'];
          this.areas.unshift({id: 0, name: 'All'});
          this.filteredAreaOptions = this.myControlArea.valueChanges
            .pipe(
              startWith(''),
              map(val => this.filterArea(val))
            );
        }
      }
    );
  }
  filterCities(val: string): string[] {
    return this.cities.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  filterArea(val: string): string[] {
    return this.areas.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  emergencyCity(value) {
    const selected = this.cities.find(b => b.name === value);
    this.searchCity = selected.id;
    if (selected.name !== 'All') {
      this.areaList();
    }
    if (this.searchCity !== 0) {
      this.citySlug = '&city=' + this.searchCity;
    }else {
      this.citySlug = '';
    }
    this.searchedData();
  }
  emergencyArea(value) {
    const selected = this.areas.find(b => b.name === value);
    this.searchArea = selected.id;
    if (this.searchArea !== 0) {
      this.areaSlug = '&area=' + this.searchArea;
    }else {
      this.areaSlug = '';
    }
    this.searchedData();
  }
  searchedData() {
    this.url = environment.apiUrl + '/home/find-emergencies?'
        + this.areaSlug + this.citySlug ;
    console.log(this.url);
    if (this.url.includes('?')) {
      const charIndex = this.url.indexOf('?');
      const newUrl = this.url.replace(this.url.charAt(charIndex + 1), '');
      console.log(newUrl);
      this.emergencyService.filteredData(newUrl).subscribe(
        (data: any[]) => {
          console.log(data);
          if (data['success'] === true) {
            this.emergencyCard.newFilterData(data['data'], this.citySlug, this.areaSlug);
          }
        }
      );
    }
  }



  getUrlParams () {
    const tree: UrlTree = this.router.parseUrl(location.pathname);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
    this.directParams = s;
    this.emergencyService.getCities().subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.cities = data['data'];
          this.cities.forEach((value) => {
            this.urlCities.push(value.name.toLowerCase());
          });
          this.setCityParam();
        }
      }
    );
  }
  setCityParam() {
    let cityParam = true;
    this.directParams.forEach((value, index) => {
      const path = value.path;
      if (cityParam === true) {
        if (this.urlCities.includes(path)) {
          const selected = this.cities.find(b => b.name.toLowerCase() === path);
          this.searchCity = selected.id;
          this.citySlug = '&city=' + this.searchCity;
          cityParam = false;
        } else {
          this.citySlug = '';
        }
      }
    });
    this.creatingUrl();
  }
  // setGroupsParam() {
  //   let groupParam = true;
  //   this.directParams.forEach((value) => {
  //     const path = value.path;
  //     if (groupParam === true) {
  //       if (this.urlGroups.includes(path)) {
  //         const selected = this.groups.find(b => b.name.toLowerCase() === path);
  //         this.searchBloodGroup = selected.id;
  //         this.bloodGroupSlug = '&blood_group=' + this.searchBloodGroup;
  //         groupParam = false;
  //       } else {
  //         this.bloodGroupSlug = '';
  //       }
  //     }
  //   });
  //   this.creatingUrl();
  // }
  creatingUrl() {
    this.url = environment.apiUrl + '/home/find-emergencies?'
       + this.citySlug;
    if (this.url.includes('?')) {
      const charIndex = this.url.indexOf('?');
      const newUrl = this.url.replace(this.url.charAt(charIndex + 1), '');
      console.log(newUrl);
      this.emergencyService.filteredData(newUrl).subscribe(
        (data: any[]) => {
          if (data['success'] === true) {
            this.emergencyCard.newFilterData(data['data'] , this.citySlug, this.areaSlug);
          }
        }
      );
    }
  }



}
