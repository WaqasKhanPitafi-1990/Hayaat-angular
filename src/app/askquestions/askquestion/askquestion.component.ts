import { Component, OnInit, ViewChild } from '@angular/core';
import {DoctorlistingService} from "../../services/doctorlisting.service";
import {QuestioncardComponent} from "../questioncard/questioncard.component";
import {Router, UrlSegment, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET} from "@angular/router";
import { environment } from '../../../environments/environment';
import {Meta} from "@angular/platform-browser";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-askquestion',
  templateUrl: './askquestion.component.html',
  styleUrls: ['./askquestion.component.css']
})
export class AskquestionComponent implements OnInit {
  @ViewChild(QuestioncardComponent)
  private questionCard: QuestioncardComponent;
  directParams;
  questionSlug = '';
  url;
  searchQuestion;
  questions = [];
  urlQuestions = [];
  constructor(private doctorService: DoctorlistingService,
              private router: Router,
              private meta: Meta,
              private titleService: Title) {
    this.titleService.setTitle('Ask Questions from Doctors and Healthcare Specialists - Healthcare forum');
    meta.addTags([
      {
        name: 'keywords',
        content: 'ask a doctor, ask questions, healthcare forum, health forum online, healthcare discussion, healthcare discussion forum, health question forum, ask a doctor forum, Health question answers, patient forum discussions'
      },
      {
        name: 'description',
        content: 'You can ask a question and get instant medical advice and expert answers from doctors and physician at the country\'s top hospital & medical institutions.'
      },
    ]);
  }

  ngOnInit() {
    if (location.pathname !== '/ask-questions') {
      this.getUrlParams();
    }
  }
  questionByKeyUp(value) {
    const url = environment.apiUrl + '/home/questions?search_query=' + value;
    this.doctorService.filteredData(url).subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.questionCard.newFilterData(data['data'], this.questionSlug);
        }
      }
    );
  }
  getUrlParams () {
    const tree: UrlTree = this.router.parseUrl(location.pathname);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
    this.directParams = s;
    this.doctorService.getQuestion().subscribe(
      (data: any[]) => {
        if (data['success'] === true) {
          this.questions = data['data']['questions'];
          this.questions.forEach((value) => {
            this.urlQuestions.push(value.slug.toLowerCase());
          });
          this.setQuestionParam();
        }
      }
    );
  }
  setQuestionParam() {
    let questionParam = true;
    this.directParams.forEach((value, index) => {
      const path = value.path;
      if (questionParam === true) {
        if (this.urlQuestions.includes(path)) {
          const selected = this.questions.find(b => b.slug.toLowerCase() === path);
          this.searchQuestion = selected.slug;
          this.questionSlug = '&slug=' + this.searchQuestion;
          questionParam = false;
        } else {
          this.questionSlug = '';
        }
      }
    });
    this.creatingUrl();
  }
  creatingUrl() {
    this.url = environment.apiUrl + '/home/questions?'
      + this.questionSlug;
    if (this.url.includes('?')) {
      const charIndex = this.url.indexOf('?');
      const newUrl = this.url.replace(this.url.charAt(charIndex + 1), '');
      console.log(newUrl);
      this.doctorService.filteredData(newUrl).subscribe(
        (data: any[]) => {
          if (data['success'] === true) {
            this.questionCard.newFilterData(data['data'], this.questionSlug);
          }
        }
      );
    }
  }
}
