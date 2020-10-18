import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('message') messageRef: ElementRef;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onSendMessage(event) {
    event.preventDefault();
    const messageBody = this.messageRef.nativeElement.value;
    const subjectTitle = this.subjectRef.nativeElement.value
    const newMessage = new Message(null, subjectTitle, messageBody, 'Robert');
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.messageRef.nativeElement.value = '';
  }

}
