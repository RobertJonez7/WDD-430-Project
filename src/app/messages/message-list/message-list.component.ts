import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onMessageAdded(newMessage: Message) {
    this.messages.push(newMessage);
  }

}
