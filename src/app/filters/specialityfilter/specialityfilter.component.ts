import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {DoctorlistingService} from "../../services/doctorlisting.service";
import {DoctorcardComponent} from "../../doctors/doctorcard/doctorcard.component";

@Component({
  selector: 'app-specialityfilter',
  templateUrl: './specialityfilter.component.html',
  styleUrls: ['./specialityfilter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SpecialityfilterComponent implements OnInit {
  @ViewChild(DoctorcardComponent)
  private doctorCard: DoctorcardComponent;
  myControl: FormControl = new FormControl();
  searchSpeciality;
  specialityOptions = [];
  specialities = [];
  filteredSpecialityOptions: Observable<string[]>;


  constructor(private doctorService: DoctorlistingService) { }

  ngOnInit() {
    this.getSpecialities();
  }

  filterSpeciality(val: string): string[] {
    return this.specialities.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  getSpecialities() {
    this.doctorService.doctorSpecialities().subscribe(
      (data: any[]) => {
        if (data['success'] == true) {
          console.log(data);
          this.specialities = data['data'];
          // data['data'].forEach((value, index) => {
          //   this.specialities.push(value.name);
          // });
          this.filteredSpecialityOptions = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(val => this.filterSpeciality(val))
            );
        }
      }
    );
  }


  doctorSpeciality(value) {
    console.log(value);
    const selected = this.specialities.find(b => b.name === value);
    this.searchSpeciality = selected.id;
    // this.searchedData();
  }
  // displayFn(val) {
  //   return val ? val.name : val;
  // }
  // searchedData() {
  //   this.doctorService.filteredData(this.searchSpeciality, ).subscribe(
  //     (data: any[]) => {
  //       console.log(data);
  //       if (data['success'] == true) {
  //         this.doctorCard.newFilterData(data['data']['doctors']);
  //       }
  //     }
  //   );
  // }
}
