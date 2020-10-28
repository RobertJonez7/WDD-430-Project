import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  constructor(private contactService: ContactService) { }

  contacts: Contact[];
  subscription: Subscription;

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    
    this.subscription = this.contactService.contactChangedEvent.subscribe((contacts) => {
      this.contacts = contacts.slice();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
