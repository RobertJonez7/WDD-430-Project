import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MocksDocuments';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private documents: Document[] = [];
  maxDocumentId: number;
  documentSelected = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: number) {
    return this.documents[id];
  }

  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach(val => {
      let currentId = parseInt(val.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    })

    return maxId;
  }

  addDocument(newDocument: Document) {
    if(!newDocument) {
      return;
    }

    this.maxDocumentId++;
    let newId = parseInt(newDocument.id);
    newId = this.maxDocumentId;

    this.documents.push(newDocument);
    let documentListClone = this.documents.slice();
    this.documentChangedEvent.next(documentListClone);
  }

  updateDocument(originalDoc: Document, newDoc: Document) {
    if(!originalDoc || !newDoc) {
      return;
    }

    const pos = this.documents.indexOf(originalDoc);

    if(pos < 0) {
      return;
    }

    newDoc.id = originalDoc.id;
    this.documents[pos] = newDoc;
    let documentListClone = this.documents.slice();
    this.documentChangedEvent.next(documentListClone);
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
    this.documentChangedEvent.next(this.documents.slice());
  }
}
