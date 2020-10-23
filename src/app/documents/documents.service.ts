import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MocksDocuments';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private documents: Document[] = [];
  documentSelected = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: number) {
    return this.documents[id];
  }

  deleteDocument(document: Document): void {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);

    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
