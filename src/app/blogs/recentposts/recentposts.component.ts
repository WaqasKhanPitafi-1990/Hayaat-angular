import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-recentposts',
  templateUrl: './recentposts.component.html',
  styleUrls: ['./recentposts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecentpostsComponent implements OnInit {

  posts= [
    // {name: 'Precautions against Hazardous Smog', date: '2017 Nov,09' , link: 'https://hayaat.pk/blog/Precautions-against-Hazardous-Smog'},
    // {name: 'Top 5 Home Remedies to Get Rid of Chest Acne', date: '2017 Nov,09' , link: 'https://hayaat.pk/blog/Top-5-Home-Remedies-to-Get-Rid-of-Chest-Acne'},
    // {name: 'Ways to Ease Mood Swings Without Taking Pills', date: '2017 Nov,09', link: 'https://hayaat.pk/blog/Ways-to-Ease-Mood-Swings-Without-Taking-Pills'}
  ];


  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.blogService.recentBlog().subscribe(
      (data) => {
        this.posts = data['data'];
      }
    );
  }
}
