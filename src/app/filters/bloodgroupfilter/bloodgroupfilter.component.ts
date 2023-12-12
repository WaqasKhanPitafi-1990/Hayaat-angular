import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-bloodgroupfilter',
  templateUrl: './bloodgroupfilter.component.html',
  styleUrls: ['./bloodgroupfilter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BloodgroupfilterComponent implements OnInit {

  myControl: FormControl = new FormControl();

  bloodgroupoptions = [
    'A+ (Positive)',
    'A- (Negative)',
    'B+ (Positve)',
    'B- (Negative)',
    'O+ (Positive)',
    'O- (Negative)',
    'AB+ (Positve)',
    'AB- (Negative)'
  ];
  filteredOptions: Observable<string[]>;


  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    return this.bloodgroupoptions.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}
