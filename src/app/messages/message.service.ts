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
    
  }

  getMessages() {
    this.http.get('http://localhost:3000/messages').subscribe((messages: Message[]) => {
        this.messages = messages;
        this.messageChangedEvent.next([...this.messages]);
    },
    (error: any) => {
      console.log(error);
    });
    return this.messages;
  }

  storeMessages() {
    const messageArray = JSON.stringify(this.messages);
    this.http.put('http://localhost:3000/messages', messageArray)
    .subscribe(() => {
        this.messageChangedEvent.next([...this.messages]);
    });
  }

  // getMessages() {
  //   return this.messages;
  // }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }
}
