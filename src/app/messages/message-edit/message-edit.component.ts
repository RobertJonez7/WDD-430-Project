import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('message') messageRef: ElementRef;
  @Output() messageAdded = new EventEmitter<Message>();

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage(event) {
    event.preventDefault();
    const messageBody = this.messageRef.nativeElement.value;
    const subjectTitle = this.subjectRef.nativeElement.value
    const newMessage = new Message(null, subjectTitle, messageBody, 'Robert');
    this.messageAdded.emit(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.messageRef.nativeElement.value = '';
  }

}
