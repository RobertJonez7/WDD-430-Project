import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private documents: Document[] = [];
  maxDocumentId: number;
  documentSelected = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.initializeDocuments();
  }

  initializeDocuments() {
    this.http.get('https://wdd430-f248b.firebaseio.com/documents.json').subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documentChangedEvent.next([...this.documents]);
    },
    (error: any) => {
      console.log(error);
    });
  }

  getDocuments() {
    return [...this.documents];
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

  addDocument(document: Document) {
    if (!document) {
      return;
    }
    
    this.maxDocumentId++;
    document.id = this.maxDocumentId.toString();
    this.documents.push(document);
    this.storeDocuments();
  }

  storeDocuments() {
    const documentsArray = JSON.stringify(this.documents);
    this.http.put('https://wdd430-f248b.firebaseio.com/documents.json', documentsArray)
    .subscribe(() => {
        this.documentChangedEvent.next([...this.documents]);
    });
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
    this.storeDocuments();
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
    this.storeDocuments();
  }
}
