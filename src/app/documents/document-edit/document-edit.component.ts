import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  edit: boolean = false;

  constructor(
    private documentService: DocumentsService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.edit = false;
      let id = params['id'];
      if (id === null || id === undefined) {
        return;
      }

      let document = this.documentService.getDocument(id);
      if (!document) {
        return;
      }

      this.originalDocument = document;
      this.edit = true;
      this.document = JSON.parse(JSON.stringify(document));
    });
  }

  onSubmit(form: NgForm) {
    let document = new Document('', form.value.name, form.value.description, form.value.url, null);

    if (this.edit === true) {
      this.documentService.updateDocument(this.originalDocument, document);
    } else {
      this.documentService.addDocument(document);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

}
