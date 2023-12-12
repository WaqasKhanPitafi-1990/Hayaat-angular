import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-cityfilter',
  templateUrl: './cityfilter.component.html',
  styleUrls: ['./cityfilter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CityfilterComponent implements OnInit {

  myControl: FormControl = new FormControl();

  cityoptions = [
    'lahore',
    'karachi',
    'Islamabad',
    'peshawar'
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
    return this.cityoptions.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}
