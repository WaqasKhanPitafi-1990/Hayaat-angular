import { Component, ViewContainerRef} from '@angular/core';
import {ToastsManager} from "ng2-toastr";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
//  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public toastr: ToastsManager, vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }
}
