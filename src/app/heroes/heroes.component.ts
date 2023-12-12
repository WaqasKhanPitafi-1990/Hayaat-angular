import { Component, OnInit } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService,
              meta: Meta, title: Title) {


    title.setTitle('My about-us page');

    meta.addTags([
      {
        name: 'author', content: 'Simon'
      },
      {
        name: 'keywords', content: 'about us'
      },
      {
        name: 'description', content: 'about-us page.'
      },
    ]);

  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
