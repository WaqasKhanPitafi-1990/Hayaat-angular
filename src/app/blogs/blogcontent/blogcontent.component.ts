import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-blogcontent',
  templateUrl: './blogcontent.component.html',
  styleUrls: ['./blogcontent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogcontentComponent implements OnInit {
@Input() blogContent;
  constructor() { }

  ngOnInit() {
  }

}
