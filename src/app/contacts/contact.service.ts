import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MockContacts';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    private contacts: Contact[] = [];
    contactSelected = new EventEmitter<Contact>();
    contactChangedEvent = new EventEmitter<Contact[]>();

    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    getContacts() {
        return this.contacts.slice();
    }

    getContact(id: number): Contact {
        return this.contacts[id];
    }

    deleteContact(contact: Contact): void {
        if (!contact) {
          return;
        }
    
        const pos = this.contacts.indexOf(contact);
    
        if (pos < 0) {
          return;
        }
    
        this.contacts.splice(pos, 1);
        this.contactChangedEvent.emit(this.contacts.slice());
    }
}