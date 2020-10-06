import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Text', 'Contains text document', 'www.text.com', null),
    new Document('2', 'Powerpoint', 'Contains powerpoint', 'www.powerpoint.com', null),
    new Document('3', 'PDF', 'Contains PDF', 'www.pdf.com', null),
    new Document('4', 'Excel', 'Contains excel spreadsheet', 'www.excel.com', null),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
