import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {DoctorlistingService} from "../services/doctorlisting.service";
import {DoctorcardComponent} from "../doctors/doctorcard/doctorcard.component";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../services/user.service";
import { environment } from '../../environments/environment';
import {ToastsManager} from "ng2-toastr";
import {Meta, Title} from "@angular/platform-browser";


@Component({
  selector: 'app-homecontent',
  templateUrl: './homecontent.component.html',
  styleUrls: ['./homecontent.component.css']
})
export class HomecontentComponent implements OnInit {
  @ViewChild(DoctorcardComponent)
  doctorCard: DoctorcardComponent;
  myControlSpeciality: FormControl = new FormControl();
  myControlCity: FormControl = new FormControl();
  myControlArea: FormControl = new FormControl();
  myControlGroup: FormControl = new FormControl();
  cities = [];
  specialities = [];
  areas = [];
  bloodGroup = [];
  areasHome = [];
  homeSpecialities = [];
  filteredSpecialityOptions: Observable<string[]>;
  filteredCitiesOptions: Observable<string[]>;
  filteredAreaOptions: Observable<string[]>;
  filteredGroupOptions: Observable<string[]>;
  searchSpeciality;
  searchCity;
  searchArea;
  searchBloodGroup;
  doctorName = '';
  questionName = '';
  specialitySlug = '';
  areaSlug = '';
  citySlug = '';
  cityQuery = '';
  bloodGroupSlug = '';
  constructor(
    private userService: UserService,
    private doctorService: DoctorlistingService,
    private router: Router,
    private cookieService: CookieService,
    private toastr: ToastsManager,
    private meta: Meta,
    private title: Title) {

    title.setTitle('Find doctor, Blood donor & Nearest Emergency Center - Hayaat.pk');

    meta.addTags([
      {
        name: 'keywords',
        content: 'Digital Healthcare Solution, electronic health record, electronic medical record, EHR, EMR, Find a doctor, Book appointment online, Find Blood donor, Nearest Emergency Center, pathology lab, online pharmacy, order medicine online, Lahore, Karachi, Pakistan '
      },
      {
        name: 'description',
        content: 'Are you trying to find a doctor, hospital, blood donor, pharmacy, pathology lab or nearest emergency center? Use Hayaat to find a doctor and book appointments online in Pakistan.'
      },
      {
        name: 'og:title',
        content: 'Find doctor, Blood donor & Nearest Emergency Center - Hayaat.pk'
      },
      {
        name: 'og:description',
        content: 'Are you trying to find a doctor, hospital, blood donor, pharmacy, pathology lab or nearest emergency center? Use Hayaat to find a doctor and book appointments online in Pakistan.'
      },
      {
        name: 'og:url',
        content: 'https://hayaat.pk'
      },
      {
        name: 'og:image',
        content: environment.baseUrl + '/assets/images/Home.png'
      }
    ]);

  }

  ngOnInit() {
    this.getSpecialities();
    this.getSpecialitiesHome();
    this.getCities();
    this.areaListHome();
    this.bloodGroup.push({id: 0 , name: 'All'},
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
  getSpecialities() {
    this.doctorService.doctorSpecialities().subscribe(
      (data: any[]) => {
        if (data['success'] == true) {
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
    this.doctorService.getCities().subscribe(
      (data: any[]) => {
        if (data['success'] == true) {
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
        if (data['success'] == true) {
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
  filterArea(val: string): string[] {
    return this.areas.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  filterBloodGroup(val: string): string[] {
    return this.bloodGroup.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  doctorSpeciality(value) {
    const selected = this.specialities.find(b => b.name === value);
    this.searchSpeciality = selected.slug;
    if (selected.id !== 0) {
      this.specialitySlug = '/' + this.searchSpeciality;
    }else {
      this.specialitySlug = '';
    }
  }
  doctorCity(value) {
    const selected = this.cities.find(b => b.name === value);
    this.searchCity = selected.slug;
    if (selected.name !== 'All') {
      this.areaList();
    }
    if (selected.id !== 0) {
      this.citySlug = '/' + this.searchCity;
      this.cityQuery = '&city=' + this.searchCity;
    }else {
      this.citySlug = '';
      this.cityQuery = '';
    }
  }
  doctorArea(value) {
    const selected = this.areas.find(b => b.name === value);
    this.searchArea = selected.id;
    if (this.searchArea !== 0) {
      this.areaSlug = '&area=' + this.searchArea;
    }else {
      this.areaSlug = '';
    }
  }
  donorBloodGroup(value) {
    const selected = this.bloodGroup.find(b => b.name === value);
    this.searchBloodGroup = selected.slug;
    if (selected.id !== 0) {
      this.bloodGroupSlug = '/' + this.searchBloodGroup;
    }else {
      this.bloodGroupSlug = '';
    }
  }
  doctorNameOnKeyUp(value) {
    // this.doctorName = '&search_query=' + value;
    this.doctorName = value;
  }
  questionKeyUp(value) {
    this.questionName = '&search_query=' + value;
    }
  searchDoctor() {
    if (this.doctorName === '' && this.specialitySlug === '' && this.citySlug === '' && this.areaSlug === '') {
      this.typeError();
    }else {
      const navigateUrl = '/doctors' + this.citySlug + this.specialitySlug;
      if (this.searchArea === undefined) {
        this.doctorService.areaHomeSlug = '';
      } else {
        this.doctorService.areaHomeSlug = this.searchArea;
      }
      this.doctorService.doctorHomeSlug = this.doctorName;
      this.router.navigate([navigateUrl]);
      // const url = environment.apiUrl + '/home/find-doctors?' + this.doctorName
      //   + this.specialitySlug + this.citySlug + this.areaSlug;
      // if (url.includes('?')) {
      //   const charIndex = url.indexOf('?');
      //   const newUrl = url.replace(url.charAt(charIndex + 1), '');
      //   this.doctorService.filteredData(newUrl).subscribe(
      //     (data: any[]) => {
      //       if (data['success'] == true) {
      //        this.doctorService.filter(data['data'], this.citySlug, this.areaSlug, this.specialitySlug, this.bloodGroupSlug);
      //         this.router.navigate(['/find-a-doctor']);
      //       }
      //     }
      //   );
      // }
    }
  }
  searchDonor() {
    if (this.searchBloodGroup === '') {
      this.typeError();
    }else {
      const navigateUrl = '/donors' + this.bloodGroupSlug;
      // this.doctorService.routUrl = true;
      this.router.navigate([navigateUrl]);
      // const url = environment.apiUrl + '/home/find-donors?' + this.bloodGroupSlug;
      // this.doctorService.filteredData(url).subscribe(
      //   (data: any[]) => {
      //     if (data['success'] == true) {
      //       this.doctorService.filter(data['data'], this.citySlug, this.areaSlug, this.specialitySlug, this.bloodGroupSlug);
      //       this.router.navigate(['/blood-donors']);
      //     }
      //   }
      // );
    }
  }
  searchEmergency() {
    if (this.citySlug == '' && this.areaSlug == '') {
      console.log('enter something');
    }else {
      const url = environment.apiUrl + '/home/find-emergencies?' + this.cityQuery + this.areaSlug;
      if (url.includes('?')) {
        console.log(url);
        const charIndex = url.indexOf('?');
        const newUrl = url.replace(url.charAt(charIndex + 1), '');
        console.log(newUrl);
        this.doctorService.filteredData(newUrl).subscribe(
          (data: any[]) => {
            console.log(data);
            if (data['success'] == true) {
              this.doctorService.filter(data['data'], this.citySlug, this.areaSlug, this.specialitySlug, this.bloodGroupSlug);
              this.router.navigate(['/nearest-emergency-centers']);
            }
          }
        );
      }
    }
  }
  searchQuestion() {
    if (this.questionName == '') {
      console.log('enter something');
    }else {
      const url = environment.apiUrl + '/home/questions?' + this.questionName;
      if (url.includes('?')) {
        const charIndex = url.indexOf('?');
        const newUrl = url.replace(url.charAt(charIndex + 1), '');
        this.doctorService.filteredData(url).subscribe(
          (data: any[]) => {
            console.log(data);
            if (data['success'] == true) {
              this.doctorService.filter(data['data'], this.citySlug, this.areaSlug, this.specialitySlug, this.bloodGroupSlug);
              this.router.navigate(['/ask-questions']);
            }
          }
        );
      }
    }
  }
  areaListHome() {
    let cityId;
    if (this.cookieService.check('city')) {
      cityId = this.cookieService.get('city');
    } else {
      cityId = 1;
    }
    this.userService.getAreas(cityId).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          for (let x = 0; x <= 10; x++) {
            this.areasHome.push(data['data'][x]);
          }
        }
      }
    );
  }
  getSpecialitiesHome() {
    this.doctorService.doctorSpecialities().subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          for (let x = 0; x <= 10; x++) {
            this.homeSpecialities.push(data['data'][x]);
          }
        }
      }
    );
  }
  typeSuccess() {
    this.toastr.success( 'Sign Up Successfully', 'Welcome!');
  }
  typeError() {
    this.toastr.error('Please select something', 'Oopss!!!');
  }
  scrollUp() {
    window.scroll(0, 0 );
  }
}
