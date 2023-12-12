import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';


@Component({
  selector: 'app-areafilter',
  templateUrl: './areafilter.component.html',
  styleUrls: ['./areafilter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AreafilterComponent implements OnInit {

  myControl: FormControl = new FormControl();

  areaoptions = [
    'Cant',
    'Gulburg',
    'Township',
    'Johar Town',
    'Modal Town'
  ]
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
    return this.areaoptions.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}
