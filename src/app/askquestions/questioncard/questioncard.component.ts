import { Component, OnInit } from '@angular/core';
import {DoctorlistingService} from "../../services/doctorlisting.service";

@Component({
  selector: 'app-questioncard',
  templateUrl: './questioncard.component.html',
  styleUrls: ['./questioncard.component.css']
})
export class QuestioncardComponent implements OnInit {
  scrollDistance = 1;
  questionsPublic = [];
  questionsMy = [];
  pagination= [];
  noQuestion;
  noQuestionMy;
  questionSlugUrl = '';
  loginFirst = false;
  constructor(private doctorService: DoctorlistingService) { }

  ngOnInit() {
    if (location.pathname === '/ask-questions') {
      this.getAskQuestion();
    }
  }

  reloadCall(call) {
    if (call) {
      this.getAskQuestion();
    }
  }
  getAskQuestion() {
    this.doctorService.getQuestion().subscribe(
      (data: any[]) => {
        if (data['data']['is_logged_in'] === false) {
          this.loginFirst = true;
        } else {
          this.loginFirst = false;
        }
        if (data['data']['my_questions']['questions'].length !== 0) {
          this.questionsMy = data['data']['my_questions']['questions'];
          this.noQuestionMy = false;
        } else {
          this.noQuestionMy = true;
        }
        if (data['data']['public']['questions'].length !== 0) {
          this.questionsPublic = data['data']['public']['questions'];
          this.noQuestion = false;
        } else {
          this.noQuestion = true;
        }
        this.pagination = data['data']['public']['pagination'];
        this.questionsPublic.forEach(function (value, index) {
          if (value.questioner_gender = 1) {
            value.questioner_gender = 'Male';
          } else {
            value.questioner_gender = 'Female';
          }
        });
      }
    );
  }
  questionSlug(slug) {
    this.doctorService.saveSlug(slug);
  }
  newFilterData(dataArray, question) {
    this.questionsPublic = dataArray['public']['questions'];
    this.pagination = dataArray['public']['pagination'];
    this.questionSlugUrl = question;
    if (dataArray['public']['questions'].length !== 0 ) {
      this.noQuestion = false;
    }else {
      this.noQuestion = true;
    }
  }
  onScrollDown() {
    if (this.pagination['has_more'] == true) {
      this.doctorService.getQuestion(this.pagination['next_url'] + this.questionSlugUrl).subscribe(
        (data: any[]) => {
        data['data']['public']['questions'].forEach((value) => {
          this.questionsPublic.push(value);
        });
        this.pagination = data['data']['public']['pagination'];
      });
    }
  }
}
