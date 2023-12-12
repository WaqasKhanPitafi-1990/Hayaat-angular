import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-blogcategories',
  templateUrl: './blogcategories.component.html',
  styleUrls: ['./blogcategories.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogcategoriesComponent implements OnInit {
  categories= [
    {name: 'Self-Medication', link: 'https://hayaat.pk/blog/search/1'},
    {name: 'Diet and nutrients', link: 'https://hayaat.pk/blog/search/1'},
    {name: 'Diabetes', link: 'https://hayaat.pk/blog/search/1'}
    ]



  constructor() { }

  ngOnInit() {
  }

}
