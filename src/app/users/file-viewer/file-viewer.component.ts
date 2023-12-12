import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import {BsModalService} from "ngx-bootstrap";
import {BsModalRef} from "ngx-bootstrap";
import { environment } from '../../../environments/environment';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})
export class FileViewerComponent implements OnInit {
  @Input() reports;
  pdfSrc = '';
  imagePath = environment.baseUrl;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,
              private sanitizer: DomSanitizer) {
  }
  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getIndex(i) {
    this.pdfSrc = this.imagePath + '/' +this.reports[i]['image'];
  }
  getSrc() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
  }
}
