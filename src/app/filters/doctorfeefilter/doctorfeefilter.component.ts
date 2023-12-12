import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';


@Component({
  selector: 'app-doctorfeefilter',
  templateUrl: './doctorfeefilter.component.html',
  styleUrls: ['./doctorfeefilter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorfeefilterComponent implements OnInit {

  myControl: FormControl = new FormControl();

  feeoptions = [
    '100-1000',
    '1100-2000',
    '2100-3000',
    '3100-4000'
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
    return this.feeoptions.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}
