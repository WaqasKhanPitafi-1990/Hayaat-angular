import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { UserService} from "../../services/user.service";

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactformComponent implements OnInit {
  form: FormGroup;
  categoryId;
  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required],
      // address: ['', Validators.required],
      // delivery: ['', Validators.required],
      // payment: ['', Validators.required],
      // image: ['', Validators.required],
      // defaultBranch: ['', Validators],
      // terms: ['', Validators.required],
      // avatar: null
    });
  }
  selectCategory(value) {
    this.categoryId = value;
  }
  contactForm(formData) {
    console.log(formData);
    const params = 'name=' + formData.name + '&email=' + formData.email + '&phone=' + formData.phone + '&category=' + this.categoryId
    + '&message=' + formData.message;
    this.userService.contactUs(params).subscribe(
      (data: any[]) => {
        console.log(data);
      }
    );
  }
}
