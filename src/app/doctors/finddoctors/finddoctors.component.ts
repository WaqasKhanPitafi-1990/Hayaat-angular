import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {DoctorlistingService} from "../../services/doctorlisting.service";
import { UserService } from "../../services/user.service";
import {DoctorcardComponent} from "../doctorcard/doctorcard.component";
import {Router, UrlSegment, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, ActivatedRoute} from "@angular/router";
import { environment } from '../../../environments/environment';
import {Meta} from "@angular/platform-browser";
import {Title} from "@angular/platform-browser";
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-finddoctors',
  templateUrl: './finddoctors.component.html',
  styleUrls: ['./finddoctors.component.css']
})
export class FinddoctorsComponent implements OnInit {

  @ViewChild(DoctorcardComponent)
  private doctorCard: DoctorcardComponent;
  selectedOption = '0';
  myControlSpeciality: FormControl = new FormControl();
  myControlCity: FormControl = new FormControl();
  myControlArea: FormControl = new FormControl();
  myControlFee: FormControl = new FormControl();
  // myControlCities: FormControl = new FormControl();
  cities = [];
  specialities = [];
  areas = [];
  filteredSpecialityOptions: Observable<string[]>;
  filteredCitiesOptions: Observable<string[]>;
  filteredFeeOptions: Observable<string[]>;
  filteredAreaOptions: Observable<string[]>;
  feeOptions = [
    'All',
    '100',
    '500',
    '1000',
    '1500',
    '2000',
    '2500',
    '3000'
  ];
  url;
  searchSpeciality;
  searchCity;
  searchArea;
  searchFee;
  specialitySlug = '';
  areaSlug = '';
  citySlug = '';
  feeSlug = '';
  nameSlug = '';
  searchNameHomeSlug = '';
  urlCities = [];
  urlAreas = [];
  urlSpecialities = [];
  directParams;
  paramIndex = 1;
  cityUrlParamName = '';
  specialityUrlParamName = '';
  doctorUrlParamName = '';
  cityName;
  doctorDetailMeta;
  doctorMetaSpeciality;
  doctorMetaCity;
  metaHeading = false;


  constructor(private doctorService: DoctorlistingService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private meta: Meta,
              private titleService: Title,
              private cookieService: CookieService) {
    if (this.route.snapshot.url[0].path == 'find-a-doctor') {
      this.metaHeading = true;
      this.titleService.setTitle('Find a doctor or physician and book appointment online ');

      this.meta.addTags([
        {
          name: 'keywords',
          content: 'find a doctor, Digital Healthcare Solution, online doctor appointment, online medical appointment, book appointment online, online appointment with doctor, online doctor, find a doctor near me, find me a doctor, find a specialist doctor '
        },
        {
          name: 'description',
          content: 'Find a doctor nearby and book appointments online with local doctors, physician, surgeon, dentists, cardiologists, ENT specialists and more healthcare professionals.'
        },
      ]);
    } else {
        this.metaHeading = false;
        if (this.route.snapshot.paramMap.get('speciality') !== null) {
           this.doctorMetaSpeciality = this.route.snapshot.paramMap.get('speciality');
           this.doctorMetaCity = this.route.snapshot.paramMap.get('city');
          titleService.setTitle(this.doctorMetaSpeciality + ' in ' + this.doctorMetaCity + ' - Book appointment with ' + this.doctorMetaSpeciality + ' online in ' + this.doctorMetaCity);

          this.meta.addTags([
            {
              name: 'keywords',
              content: this.doctorMetaSpeciality + ' in ' + this.doctorMetaCity + ', ' +  this.doctorMetaSpeciality + ', ' + this.doctorMetaCity + ', ' + this.doctorMetaCity +' '+ this.doctorMetaSpeciality + ', find a doctor, book appointment online, find blood donor, nearest emergency center, book online appointment, doctor finder, digital healthcare solution, electronic health record, electronic medical record, EHR, EMR'
            },
            {
              name: 'description',
              content: 'Find the best ' + this.doctorMetaSpeciality + ' in ' +  this.doctorMetaCity +'. Select a  specialist doctor from the list of ' + this.doctorMetaSpeciality + ' in ' + this.doctorMetaCity + ' and book appointment online using Hayaat.pk, the best healthcare platform in Pakistan.'
            },
          ]);
        } else {
           // this.doctorMetaSpeciality = this.route.snapshot.paramMap.get('city');
          if (this.route.snapshot.paramMap.get('speciality') !== null) {
            this.doctorMetaSpeciality = 'doctors';
            this.doctorMetaCity = this.route.snapshot.paramMap.get('city');
          } else {
            if (this.route.snapshot.paramMap.get('city') == 'lahore' || this.route.snapshot.paramMap.get('city') == 'karachi' || this.route.snapshot.paramMap.get('city') == 'islamabad' || this.route.snapshot.paramMap.get('city') == 'Gujranwala') {
              this.doctorMetaSpeciality = 'Doctors';
              this.doctorMetaCity = this.route.snapshot.paramMap.get('city');
              titleService.setTitle('Doctors in ' + this.doctorMetaCity + ' | Find a doctor or physician in ' + this.doctorMetaCity + ' and book appointment online');
              this.meta.addTags([
                {
                  name: 'keywords',
                  content: 'doctors in ' + this.doctorMetaCity +', physicians in ' + this.doctorMetaCity + ', find a doctor in '+ this.doctorMetaCity +', online doctor appointment in ' + this.doctorMetaCity + ', online medical appointment in ' + this.doctorMetaCity +', book appointment online in '+ this.doctorMetaCity +', online appointment with doctor in ' + this.doctorMetaCity + ', online doctor in ' + this.doctorMetaCity + ', find a doctor near me in ' + this.doctorMetaCity +', find me a doctor in ' + this.doctorMetaCity +', find a specialist doctor in ' + this.doctorMetaCity +', Digital Healthcare Solution'
                },
                {
                  name: 'description',
                  content: 'Top doctors, specialists, physicians and surgeons in ' + this.doctorMetaCity  +'. Find a doctor in ' + this.doctorMetaCity + ' and book appointments online with local doctors, physician, surgeon, dentists, cardiologists, ENT specialists and more healthcare professionals in ' + this.doctorMetaCity + '.'
                },
              ]);
            } else {
              this.doctorMetaSpeciality = this.route.snapshot.paramMap.get('city');
              this.doctorMetaCity = 'Pakistan';
              titleService.setTitle('Best ' + this.doctorMetaSpeciality + ' in Pakistan - Book appointment with ' + this.doctorMetaSpeciality + ' online');
              this.meta.addTags([
                {
                  name: 'keywords',
                  content: this.doctorMetaSpeciality + ', find a doctor, book appointment online, find blood donor, nearest emergency center, book online appointment, doctor finder, digital healthcare solution, electronic health record, electronic medical record, EHR, EMR'
                },
                {
                  name: 'description',
                  content: 'Find the best ' + this.doctorMetaSpeciality + ' in Pakistan. Select a  specialist doctor from the list of ' + this.doctorMetaSpeciality + ' and book appointment online using Hayaat.pk, the best healthcare platform'
                },
              ]);
            }
          }
        }
    }
  }

  ngOnInit() {
    if (location.pathname !== '/find-a-doctor') {
      if (this.doctorService.areaHomeSlug !== '') {
        this.areaSlug = '&area=' + this.doctorService.areaHomeSlug;
        this.doctorService.areaHomeSlug = '';
      } else {
        this.areaSlug = '';
      }
      if (this.doctorService.doctorHomeSlug !== '') {
        this.searchNameHomeSlug = '&search_query=' + this.doctorService.doctorHomeSlug;
        this.doctorService.doctorHomeSlug = '';
      } else {
        this.searchNameHomeSlug = '';
      }
      this.getUrlParams();
    }
    this.getSpecialities();
    this.getCities();
    this.filteredFeeOptions = this.myControlFee.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterFee(val))
      );
  }

  getSpecialities() {
    this.doctorService.doctorSpecialities().subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.specialities = data['data'];
          this.specialities.unshift({id: 0, name: 'All'});
          this.filteredSpecialityOptions = this.myControlSpeciality.valueChanges
            .pipe(
              startWith(''),
              map(val => this.filterSpeciality(val))
            );
        }
      }
    );
  }

  getCities() {
    this.userService.getCities().subscribe(
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
    this.doctorService.getAreas(this.searchCity).subscribe(
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

  filterSpeciality(val: string): string[] {
    return this.specialities.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  filterCities(val: string): string[] {
    return this.cities.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  filterFee(val: string): string[] {
    return this.feeOptions.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  filterArea(val: string): string[] {
    return this.areas.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  // auto complete drop down code end

  // on change functions on all four auto complete filters
  doctorCity(value) {
    if (value !== 'All') {
      const selected = this.cities.find(b => b.name === value);
      this.searchCity = selected.slug;
      this.citySlug = '&city=' + this.searchCity;
      this.cityUrlParamName = '/' + selected.slug.toLowerCase();
      this.areaList();
      this.navigateUrl();
    } else {
      this.citySlug = '';
      this.cityUrlParamName = '';
      this.searchedData();
    }
  }
  doctorSpeciality(value) {
    if (value !== 'All') {
      const selected = this.specialities.find(b => b.name === value);
      this.searchSpeciality = selected.slug;
      this.specialitySlug = '&speciality=' + this.searchSpeciality;
      this.specialityUrlParamName = '/' + selected.slug.toLowerCase();
      this.navigateUrl();
    } else {
      this.specialitySlug = '';
      this.specialityUrlParamName = '';
      this.searchedData();
    }
  }

  doctorArea(value) {
    if (value !== 'All') {
      const selected = this.areas.find(b => b.name === value);
      this.searchArea = selected.id;
      this.areaSlug = '&area=' + this.searchArea;
    } else {
      this.areaSlug = '';
    }
    this.searchedData();
  }

  doctorFee(value) {
    this.searchFee = value;
    if (this.searchFee !== 'All') {
      this.feeSlug = '&fee=' + this.searchFee;
    } else {
      this.feeSlug = '';
    }
    this.searchedData();
  }

  // end functions
  doctorByGender(value) {
    this.selectedOption = value;
    let url = environment.apiUrl + '/home/find-doctors';
    if (value === '0') {
      url = environment.apiUrl + '/home/find-doctors?' + this.specialitySlug + this.areaSlug + this.citySlug + this.feeSlug;
      if (url.includes('?')) {
        const charIndex = url.indexOf('?');
        url = url.replace(url.charAt(charIndex + 1), '');
      }
    } else {
      url = environment.apiUrl + '/home/find-doctors?gender='
        + value + this.specialitySlug + this.areaSlug + this.citySlug + this.feeSlug;
    }
    this.doctorService.filteredData(url).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.doctorCard.newFilterData(data['data'], this.specialitySlug, this.areaSlug, this.citySlug, this.feeSlug);
        }
      }
    );
  }

  searchedData() {
    this.url = environment.apiUrl + '/home/find-doctors?'
      + this.specialitySlug + this.areaSlug + this.citySlug + this.feeSlug;
    if (this.url.includes('?')) {
      const charIndex = this.url.indexOf('?');
      const newUrl = this.url.replace(this.url.charAt(charIndex + 1), '');
      this.doctorService.filteredData(newUrl).subscribe(
        (data: any[]) => {
          if (data['success'] === true) {
            this.doctorCard.newFilterData(data['data'], this.specialitySlug, this.areaSlug, this.citySlug, this.feeSlug);
          }
        }
      );
    }
  }

  searchDoctorKeyUp(value) {
    const url = environment.apiUrl + '/home/find-doctors?search_query='
      + value + this.specialitySlug + this.areaSlug + this.citySlug + this.feeSlug;
    this.doctorService.filteredData(url).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.doctorCard.newFilterData(data['data'], this.specialitySlug, this.areaSlug, this.citySlug, this.feeSlug);
        }
      }
    );
  }
  navigateUrl() {
    this.areaSlug = '';
    this.citySlug = '';
    this.searchNameHomeSlug = '';
    this.specialitySlug = '';
    if (this.cityUrlParamName === '') {
      const cityId = this.cookieService.get('city');
      const cityName = this.cities.find(x => x.id == cityId);
      this.cityUrlParamName = '/' + cityName.slug;
    }
    const navigateLink = '/doctors' + this.cityUrlParamName + this.specialityUrlParamName + this.doctorUrlParamName;
    this.router.navigate([navigateLink]);
    setTimeout(() => {
      this.getUrlParams();
    }, 1000);
  }
  getUrlParams() {
    const tree: UrlTree = this.router.parseUrl(location.pathname);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
    this.directParams = s;
    this.userService.getCities().subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.cities = data['data'];
          this.cities.forEach((value) => {
            this.urlCities.push(value.slug.toLowerCase());
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
          const selected = this.cities.find(b => b.slug.toLowerCase() === path);
          this.searchCity = selected.slug;
          this.citySlug = '&city=' + this.searchCity;
          this.cityUrlParamName = '/' + this.searchCity;
          this.paramIndex += 1;
          cityParam = false;
        } else {
          this.citySlug = '';
          this.cityUrlParamName = '';
        }
      }
    });
    this.doctorService.doctorSpecialities().subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.specialities = data['data'];
          this.specialities.forEach((valueSpeciality) => {
            this.urlSpecialities.push(valueSpeciality.slug.toLowerCase());
          });
          this.setSpecialityParam();
        }
      }
    );
  }

  setSpecialityParam() {
    let specialityParam = true;
    this.directParams.forEach((value) => {
      const path = value.path;
      if (specialityParam === true) {
        if (this.urlSpecialities.includes(path)) {
          const selected = this.specialities.find(b => b.slug.toLowerCase() === path);
          this.searchSpeciality = selected.slug;
          this.specialitySlug = '&speciality=' + this.searchSpeciality;
          this.specialityUrlParamName = '/' + this.searchSpeciality;
          this.paramIndex += 1;
          specialityParam = false;
        } else {
          this.specialitySlug = '';
          this.specialityUrlParamName = '';
        }
      }
    });
    this.creatingUrl();
  }

  creatingUrl() {
    const lastParam = this.directParams[this.paramIndex];
    if (lastParam === undefined) {
      this.nameSlug = '';
    } else {
      this.nameSlug = '&slug=' + lastParam.path;
    }
    this.url = environment.apiUrl + '/home/find-doctors?'
      + this.specialitySlug + this.areaSlug + this.citySlug + this.feeSlug + this.nameSlug + this.searchNameHomeSlug;
    if (this.url.includes('?')) {
      const charIndex = this.url.indexOf('?');
      const newUrl = this.url.replace(this.url.charAt(charIndex + 1), '');
      this.doctorService.filteredData(newUrl).subscribe(
        (data: any[]) => {
          if (data['success'] === true) {
             this.doctorCard.newFilterData(data['data'], this.specialitySlug, this.areaSlug, this.citySlug, this.feeSlug);
          }
        }
      );
    }
  }
}


