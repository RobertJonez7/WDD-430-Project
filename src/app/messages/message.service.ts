import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {
    this.initializeMessages();
  }

  initializeMessages() {
    this.http.get('https://wdd430-f248b.firebaseio.com/messages.json').subscribe((messages: Message[]) => {
        this.messages = messages;
        this.messageChangedEvent.next([...this.messages]);
    },
    (error: any) => {
      console.log(error);
    });
  }

  storeMessages() {
    const messageArray = JSON.stringify(this.messages);
    this.http.put('https://wdd430-f248b.firebaseio.com/messages.json', messageArray)
    .subscribe(() => {
        this.messageChangedEvent.next([...this.messages]);
    });
  }

  getMessages() {
    return this.messages;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }
}
