import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {DonerlistingService} from "../../services/donerlisting.service";
import {DonercardComponent} from "../donercard/donercard.component";
import {Router, UrlSegment, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import { environment } from '../../../environments/environment';
import {Meta} from "@angular/platform-browser";
import {Title} from "@angular/platform-browser";
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-finddoner',
  templateUrl: './finddoner.component.html',
  styleUrls: ['./finddoner.component.css']
})
export class FinddonerComponent implements OnInit {
  @ViewChild(DonercardComponent)
  private donorCard: DonercardComponent;
  myControlGroup: FormControl = new FormControl();
  myControlCity: FormControl = new FormControl();
  myControlArea: FormControl = new FormControl();
  filteredGroupOptions: Observable<string[]>;
  filteredCitiesOptions: Observable<string[]>;
  filteredAreaOptions: Observable<string[]>;
  cities = [];
  areas = [];
  bloodGroup = [];
  url;
  searchCity;
  searchArea;
  searchBloodGroup;
  bloodGroupSlug = '';
  areaSlug = '';
  citySlug = '';
  directParams;
  cityUrlParamName = '';
  bloodGroupUrlParamName = '';
  paramIndex = 1;
  selectedOption = 0;
  urlCities = [];
  urlGroups = [];
  groups = [
    'All', 'a-positive', 'a-negative', 'b-positive', 'b-negative', 'o-positive', 'o-negative', 'ab-positive', 'ab-negative'
  ];
  donorMetaBlood;
  donorMetaCity;
  metaHeading = false;
  constructor
  (
    private donorService: DonerlistingService,
    private userService: UserService,
    private router: Router,
    private meta: Meta,
    private titleService: Title,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {
    if (this.route.snapshot.url[0].path == 'blood-donors') {
      this.metaHeading = true;
      this.titleService.setTitle('Find local blood donor, register yourself & donate blood');

      meta.addTags([
        {
          name: 'keywords',
          content: 'find blood donor, local blood donor, blood donors nearby, blood group, blood donors, blood donation, blood donation near me, blood bank near me, save life, donate blood, register as blood donor  '
        },
        {
          name: 'description',
          content: 'Find the nearest blood banks and blood donors of all blood groups. Register as blood donor and help save a life today by donating blood to those in need.'
        },
      ]);
    } else {
      this.metaHeading = false;
      if (this.route.snapshot.paramMap.get('blood') !== null) {
        this.donorMetaBlood = this.route.snapshot.paramMap.get('blood');
        this.donorMetaCity =  this.route.snapshot.paramMap.get('city');
        if (this.donorMetaBlood == 'a-positive') {
          this.donorMetaBlood = 'A+'
        }
        if (this.donorMetaBlood == 'a-negative') {
          this.donorMetaBlood = 'A-'
        }
        if (this.donorMetaBlood == 'b-positive') {
          this.donorMetaBlood = 'B+'
        }
        if (this.donorMetaBlood == 'b-negative') {
          this.donorMetaBlood = 'B-'
        }
        if (this.donorMetaBlood == 'o-positive') {
          this.donorMetaBlood = 'O+'
        }
        if (this.donorMetaBlood == 'o-negative') {
          this.donorMetaBlood = 'O-'
        }
        if (this.donorMetaBlood == 'ab-positive') {
          this.donorMetaBlood = 'AB+'
        }
        if (this.donorMetaBlood == 'ab-negative') {
          this.donorMetaBlood = 'AB-'
        }
        titleService.setTitle(this.donorMetaBlood + ' blood donors in ' + this.donorMetaCity + ' | Find volunteer ' + this.donorMetaBlood + ' blood donors in ' + this.donorMetaCity);

        this.meta.addTags([
          {
            name: 'keywords',
            content: this.donorMetaBlood + ' blood donor,' + this.donorMetaBlood + ' blood, donate ' + this.donorMetaBlood + ' blood, find' + this.donorMetaBlood + ' blood donor,' + this.donorMetaBlood + ' blood donor in ' + this.donorMetaCity + ', ' + this.donorMetaBlood + ' blood in ' + this.donorMetaCity + ', donate ' + this.donorMetaBlood + ' blood in ' + this.donorMetaCity + ', find ' + this.donorMetaBlood + ' blood donor in ' + this.donorMetaCity + ', ' + 'volunteer blood donor, find blood donor, local blood donor, blood donors nearby, blood group, blood donors, blood donation, blood donation near me, blood bank near me, save life, donate blood, register as blood donor '
          },
          {
            name: 'description',
            content: 'Find ' + this.donorMetaBlood + ' blood donors in ' + this.donorMetaCity + ' from the largest verified blood donors directory of Hayaat.pk. Find the listings of volunteer ' + this.donorMetaBlood + ' blood donors in ' + this.donorMetaCity + ' from Hayaat.pk online blood bank. Find all the blood banks in ' + this.donorMetaCity + ' and blood donors of all blood groups along with ' + this.donorMetaBlood + ' blood group. Register as blood donor and help save a life today by donating blood to those in need.'
          },
        ]);
      } else {
        this.donorMetaBlood = this.route.snapshot.paramMap.get('city');
        this.donorMetaCity = 'Pakistan';
        if (this.route.snapshot.paramMap.get('city') == 'a-positive') {
          this.donorMetaBlood = 'A+';
          titleService.setTitle(this.donorMetaBlood + ' blood donors | Find volunteer ' + this.donorMetaBlood + ' blood donors in your area');

          this.meta.addTags([
            {
              name: 'keywords',
              content: this.donorMetaBlood + ' blood donor, ' + this.donorMetaBlood+ ', donate ' + this.donorMetaBlood + ' blood, find ' + this.donorMetaBlood + ' blood donor, volunteer blood donor, find blood donor, local blood donor, blood donors nearby, blood group, blood donors, blood donation, blood donation near me, blood bank near me, save life, donate blood, register as blood donor '
            },
            {
              name: 'description',
              content: 'Find ' + this.donorMetaBlood + ' blood donors in your area from the largest verified blood donors directory of Hayaat.pk. Find the listings of volunteer ' + this.donorMetaBlood + ' blood donors from Hayaat.pk online blood bank. Find the nearest blood banks and blood donors of all blood groups along with ' + this.donorMetaBlood + ' blood group. Register as blood donor and help save a life today by donating blood to those in need.'
            },
          ]);
        } else if (this.route.snapshot.paramMap.get('city') == 'a-negative') {
          this.donorMetaBlood = 'A-';
          titleService.setTitle(this.donorMetaBlood + ' blood donors | Find volunteer ' + this.donorMetaBlood + ' blood donors in your area');

          this.meta.addTags([
            {
              name: 'keywords',
              content: this.donorMetaBlood + ' blood donor, ' + this.donorMetaBlood+ ', donate ' + this.donorMetaBlood + ' blood, find ' + this.donorMetaBlood + ' blood donor, volunteer blood donor, find blood donor, local blood donor, blood donors nearby, blood group, blood donors, blood donation, blood donation near me, blood bank near me, save life, donate blood, register as blood donor '
            },
            {
              name: 'description',
              content: 'Find ' + this.donorMetaBlood + ' blood donors in your area from the largest verified blood donors directory of Hayaat.pk. Find the listings of volunteer ' + this.donorMetaBlood + ' blood donors from Hayaat.pk online blood bank. Find the nearest blood banks and blood donors of all blood groups along with ' + this.donorMetaBlood + ' blood group. Register as blood donor and help save a life today by donating blood to those in need.'
            },
          ]);
        } else if (this.route.snapshot.paramMap.get('city') == 'b-positive') {
          this.donorMetaBlood = 'B+';
          titleService.setTitle(this.donorMetaBlood + ' blood donors | Find volunteer ' + this.donorMetaBlood + ' blood donors in your area');

          this.meta.addTags([
            {
              name: 'keywords',
              content: this.donorMetaBlood + ' blood donor, ' + this.donorMetaBlood+ ', donate ' + this.donorMetaBlood + ' blood, find ' + this.donorMetaBlood + ' blood donor, volunteer blood donor, find blood donor, local blood donor, blood donors nearby, blood group, blood donors, blood donation, blood donation near me, blood bank near me, save life, donate blood, register as blood donor '
            },
            {
              name: 'description',
              content: 'Find ' + this.donorMetaBlood + ' blood donors in your area from the largest verified blood donors directory of Hayaat.pk. Find the listings of volunteer ' + this.donorMetaBlood + ' blood donors from Hayaat.pk online blood bank. Find the nearest blood banks and blood donors of all blood groups along with ' + this.donorMetaBlood + ' blood group. Register as blood donor and help save a life today by donating blood to those in need.'
            },
          ]);
        } else if (this.route.snapshot.paramMap.get('city') == 'b-negative') {
          this.donorMetaBlood = 'B-';
          titleService.setTitle(this.donorMetaBlood + ' blood donors | Find volunteer ' + this.donorMetaBlood + ' blood donors in your area');

          this.meta.addTags([
            {
              name: 'keywords',
              content: this.donorMetaBlood + ' blood donor, ' + this.donorMetaBlood+ ', donate ' + this.donorMetaBlood + ' blood, find ' + this.donorMetaBlood + ' blood donor, volunteer blood donor, find blood donor, local blood donor, blood donors nearby, blood group, blood donors, blood donation, blood donation near me, blood bank near me, save life, donate blood, register as blood donor '
            },
            {
              name: 'description',
              content: 'Find ' + this.donorMetaBlood + ' blood donors in your area from the largest verified blood donors directory of Hayaat.pk. Find the listings of volunteer ' + this.donorMetaBlood + ' blood donors from Hayaat.pk online blood bank. Find the nearest blood banks and blood donors of all blood groups along with ' + this.donorMetaBlood + ' blood group. Register as blood donor and help save a life today by donating blood to those in need.'
            },
          ]);
        } else if (this.route.snapshot.paramMap.get('city') == 'o-positive') {
          this.donorMetaBlood = 'O+';
          titleService.setTitle(this.donorMetaBlood + ' blood donors | Find volunteer ' + this.donorMetaBlood + ' blood donors in your area');

          this.meta.addTags([
            {
              name: 'keywords',
              content: this.donorMetaBlood + ' blood donor, ' + this.donorMetaBlood+ ', donate ' + this.donorMetaBlood + ' blood, find ' + this.donorMetaBlood + ' blood donor, volunteer blood donor, find blood donor, local blood donor, blood donors nearby, blood group, blood donors, blood donation, blood donation near me, blood bank near me, save life, donate blood, register as blood donor '
            },
            {
              name: 'description',
              content: 'Find ' + this.donorMetaBlood + ' blood donors in your area from the largest verified blood donors directory of Hayaat.pk. Find the listings of volunteer ' + this.donorMetaBlood + ' blood donors from Hayaat.pk online blood bank. Find the nearest blood banks and blood donors of all blood groups along with ' + this.donorMetaBlood + ' blood group. Register as blood donor and help save a life today by donating blood to those in need.'
            },
          ]);
        } else if (this.route.snapshot.paramMap.get('city') == 'o-negative') {
          this.donorMetaBlood = 'O-';
          titleService.setTitle(this.donorMetaBlood + ' blood donors | Find volunteer ' + this.donorMetaBlood + ' blood donors in your area');

          this.meta.addTags([
            {
              name: 'keywords',
              content: this.donorMetaBlood + ' blood donor, ' + this.donorMetaBlood+ ', donate ' + this.donorMetaBlood + ' blood, find ' + this.donorMetaBlood + ' blood donor, volunteer blood donor, find blood donor, local blood donor, blood donors nearby, blood group, blood donors, blood donation, blood donation near me, blood bank near me, save life, donate blood, register as blood donor '
            },
            {
              name: 'description',
              content: 'Find ' + this.donorMetaBlood + ' blood donors in your area from the largest verified blood donors directory of Hayaat.pk. Find the listings of volunteer ' + this.donorMetaBlood + ' blood donors from Hayaat.pk online blood bank. Find the nearest blood banks and blood donors of all blood groups along with ' + this.donorMetaBlood + ' blood group. Register as blood donor and help save a life today by donating blood to those in need.'
            },
          ]);
        } else if (this.route.snapshot.paramMap.get('city') == 'ab-positive') {
          this.donorMetaBlood = 'AB+';
          titleService.setTitle(this.donorMetaBlood + ' blood donors | Find volunteer ' + this.donorMetaBlood + ' blood donors in your area');

          this.meta.addTags([
            {
              name: 'keywords',
              content: this.donorMetaBlood + ' blood donor, ' + this.donorMetaBlood+ ', donate ' + this.donorMetaBlood + ' blood, find ' + this.donorMetaBlood + ' blood donor, volunteer blood donor, find blood donor, local blood donor, blood donors nearby, blood group, blood donors, blood donation, blood donation near me, blood bank near me, save life, donate blood, register as blood donor '
            },
            {
              name: 'description',
              content: 'Find ' + this.donorMetaBlood + ' blood donors in your area from the largest verified blood donors directory of Hayaat.pk. Find the listings of volunteer ' + this.donorMetaBlood + ' blood donors from Hayaat.pk online blood bank. Find the nearest blood banks and blood donors of all blood groups along with ' + this.donorMetaBlood + ' blood group. Register as blood donor and help save a life today by donating blood to those in need.'
            },
          ]);
        } else if (this.route.snapshot.paramMap.get('city') == 'ab-negative') {
          this.donorMetaBlood = 'AB-';
          titleService.setTitle(this.donorMetaBlood + ' blood donors | Find volunteer ' + this.donorMetaBlood + ' blood donors in your area');

          this.meta.addTags([
            {
              name: 'keywords',
              content: this.donorMetaBlood + ' blood donor, ' + this.donorMetaBlood+ ', donate ' + this.donorMetaBlood + ' blood, find ' + this.donorMetaBlood + ' blood donor, volunteer blood donor, find blood donor, local blood donor, blood donors nearby, blood group, blood donors, blood donation, blood donation near me, blood bank near me, save life, donate blood, register as blood donor '
            },
            {
              name: 'description',
              content: 'Find ' + this.donorMetaBlood + ' blood donors in your area from the largest verified blood donors directory of Hayaat.pk. Find the listings of volunteer ' + this.donorMetaBlood + ' blood donors from Hayaat.pk online blood bank. Find the nearest blood banks and blood donors of all blood groups along with ' + this.donorMetaBlood + ' blood group. Register as blood donor and help save a life today by donating blood to those in need.'
            },
          ]);
        } else {
          this.donorMetaCity = this.route.snapshot.paramMap.get('city');
          this.donorMetaBlood = '';
          titleService.setTitle('Blood donors in '+ this.donorMetaCity + ' | Find volunteer blood donors in ' + this.donorMetaCity);

          this.meta.addTags([
            {
              name: 'keywords',
              content: 'blood donors in ' + this.donorMetaCity +', blood donor in ' + this.donorMetaCity +', find blood donor in ' + this.donorMetaCity +', ' + this.donorMetaCity + ' blood donors, blood bank in ' + this.donorMetaCity +', donate blood in ' + this.donorMetaCity +', volunteer blood donor in ' + this.donorMetaCity + ', find blood donor, local blood donor, blood donors nearby, blood group, blood donors, blood donation, blood donation near me, blood bank near me, save life, donate blood, register as blood donor'
            },
            {
              name: 'description',
              content: 'Find blood donors in ' + this.donorMetaCity + ' from the largest verified blood donors directory. Find the listings of volunteer blood donors in ' + this.donorMetaCity + ' from Hayaat.pk online blood bank. Register as blood donor and help save a life today by donating blood to those in need. Find all the blood banks in ' + this.donorMetaCity + ' and blood donors of all blood groups.'
            },
          ]);
        }
      }
    }
  }

  ngOnInit() {
    if (location.pathname !== '/blood-donors') {
      this.getUrlParams();
    }
    this.getCities();
    this.bloodGroup.push({id: 0 , name: 'All', slug: 'all'},
      {id: 1 , name: 'A+ (Positive)', slug: 'a-positive'},
      {id: 2 , name: 'A- (Negative)', slug: 'a-negative'},
      {id: 3 , name: 'B+ (Positive)', slug: 'b-positive'},
      {id: 4 , name: 'B- (Negative)', slug: 'b-negative'},
      {id: 5 , name: 'O+ (Positive)', slug: 'o-positive'},
      {id: 6 , name: 'O- (Negative)', slug: 'o-negative'},
      {id: 7 , name: 'AB+ (Positive)', slug: 'ab-positive'},
      {id: 8 , name: 'AB- (Negative)', slug: 'ab-negative'},
      );
    this.filteredGroupOptions = this.myControlGroup.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterBloodGroup(val))
      );
  }

  getCities() {
    this.donorService.getCities().subscribe(
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
    this.donorService.getAreas(this.searchCity).subscribe(
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
  filterBloodGroup(val: string): string[] {
    return this.bloodGroup.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  filterCities(val: string): string[] {
    return this.cities.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  filterArea(val: string): string[] {
    return this.areas.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  // on change functions on all four auto complete filters
  donorBloodGroup(value) {
    if (value !== 0) {
      const selected = this.bloodGroup.find(b => b.name === value);
      this.searchBloodGroup = selected.slug;
      this.bloodGroupSlug = '&blood_group=' + this.searchBloodGroup;
      this.bloodGroupUrlParamName = '/' + selected.slug.toLowerCase();
      this.navigateUrl();
    }else {
      this.bloodGroupSlug = '';
      this.bloodGroupUrlParamName = '';
      this.searchedData();
    }
  }
  donorCity(value) {
    if (value !== 'All') {
      const selected = this.cities.find(b => b.name === value);
      this.searchCity = selected.slug;
      this.areaList();
      this.citySlug = '&city=' + this.searchCity;
      this.cityUrlParamName  = '/' + selected.slug.toLowerCase();
      this.navigateUrl();
    }else {
      this.citySlug = '';
      this.cityUrlParamName = '';
      this.searchedData();
    }
  }

  donorArea(value) {
    const selected = this.areas.find(b => b.name === value);
    this.searchArea = selected.id;
    if (this.searchArea !== 0) {
      this.areaSlug = '&area=' + this.searchArea;
    }else {
      this.areaSlug = '';
    }
    this.searchedData();
  }
  // end functions
  donorByGender(value) {
    this.selectedOption = value;
    let url = environment.apiUrl + '/home/find-donors';
    if (value === '0') {
      url = environment.apiUrl + '/home/find-donors?' + this.bloodGroupSlug + this.areaSlug + this.citySlug;
      if (url.includes('?')) {
         const charIndex = url.indexOf('?');
         url = url.replace(url.charAt(charIndex + 1), '');
      }
    } else {
      url = environment.apiUrl + '/home/find-donors?gender='
        + value + this.bloodGroupSlug + this.areaSlug + this.citySlug;
    }
    this.donorService.filteredData(url).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.donorCard.newFilterData(data['data'], this.bloodGroupSlug, this.citySlug , this.areaSlug);
        }
      }
    );
  }
  searchedData() {
    this.url = environment.apiUrl + '/home/find-donors?'
      + this.bloodGroupSlug + this.areaSlug + this.citySlug ;
    if (this.url.includes('?')) {
      const charIndex = this.url.indexOf('?');
      const newUrl = this.url.replace(this.url.charAt(charIndex + 1), '');
      this.donorService.filteredData(newUrl).subscribe(
        (data: any[]) => {
          if (data['success'] === true) {
            this.donorCard.newFilterData(data['data'], this.bloodGroupSlug, this.citySlug , this.areaSlug );
          }
        }
      );
    }
  }
  searchDonorKeyUp(value) {
    const url = environment.apiUrl + '/home/find-donors?search_query='
      + value + this.bloodGroupSlug + this.areaSlug + this.citySlug;
    this.donorService.filteredData(url).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.donorCard.newFilterData(data['data'], this.bloodGroupSlug, this.citySlug , this.areaSlug );
        }
      }
    );
  }

  navigateUrl() {
    this.bloodGroupSlug = '';
    if (this.cityUrlParamName === '') {
      const cityId = this.cookieService.get('city');
      const cityName = this.cities.find(x => x.id == cityId);
      this.cityUrlParamName = '/' + cityName.slug;
    }
    const navigateLink = '/donors' + this.cityUrlParamName + this.bloodGroupUrlParamName;
    this.router.navigate([navigateLink]);
    setTimeout(() => {
      this.getUrlParams();
    }, 1000);
  }

  getUrlParams () {
    const tree: UrlTree = this.router.parseUrl(location.pathname);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
    this.directParams = s;
    this.userService.getCities().subscribe(
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
          const selected = this.cities.find(b => b.slug.toLowerCase() === path);
          this.searchCity = selected.slug;
          this.citySlug = '&city=' + this.searchCity;
          this.cityUrlParamName = '/' + this.searchCity;
          cityParam = false;
        } else {
          this.citySlug = '';
          this.cityUrlParamName = '';
        }
      }
    });
    this.setGroupsParam();
  }
  setGroupsParam() {
    let groupParam = true;
    this.directParams.forEach((value) => {
      const path = value.path;
      if (groupParam === true) {
        if (this.groups.includes(path)) {
          const selected = this.bloodGroup.find(b => b.slug.toLowerCase() === path);
          this.searchBloodGroup = selected.slug;
          this.bloodGroupSlug = '&blood_group=' + this.searchBloodGroup;
          this.bloodGroupUrlParamName = '/' + selected.slug.toLowerCase();
          groupParam = false;
        } else {
          this.bloodGroupSlug = '';
          this.bloodGroupUrlParamName = '';
        }
      }
    });
    this.creatingUrl();
  }
  creatingUrl() {
    this.url = environment.apiUrl + '/home/find-donors?'
      + this.bloodGroupSlug + this.citySlug;
    if (this.url.includes('?')) {
      const charIndex = this.url.indexOf('?');
      const newUrl = this.url.replace(this.url.charAt(charIndex + 1), '');
      this.donorService.filteredData(newUrl).subscribe(
        (data: any[]) => {
          if (data['success'] === true) {
            this.donorCard.newFilterData(data['data'], this.bloodGroupSlug , this.citySlug, this.areaSlug = '');
          }
        }
      );
    }
  }
}
