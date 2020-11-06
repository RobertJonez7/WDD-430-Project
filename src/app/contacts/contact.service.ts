import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MockContacts';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    private contacts: Contact[] = [];
    maxDocumentId: number;
    contactSelected = new Subject<Contact>();
    contactChangedEvent = new Subject<Contact[]>();

    constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxDocumentId = this.getMaxId();
    }

    getContacts() {
        return this.contacts.slice();
    }

    getContact(id: any): Contact {
        return this.contacts[id];
    }

    getMaxId(): number {
        let maxId = 0;
    
        this.contacts.forEach(val => {
          let currentId = parseInt(val.id);
          if(currentId > maxId) {
            maxId = currentId;
          }
        })
    
        return maxId;
      }
    
      addContact(newContact: Contact) {
        if(!newContact) {
          return;
        }
    
        this.maxDocumentId++;
        let newId = parseInt(newContact.id);
        newId = this.maxDocumentId;
    
        this.contacts.push(newContact);
        let documentListClone = this.contacts.slice();
        this.contactChangedEvent.next(documentListClone);
      }
    
      updateContact(originalContact: Contact, newContact: Contact) {
        if(!originalContact || !newContact) {
          return;
        }
    
        const pos = this.contacts.indexOf(originalContact);
    
        if(pos < 0) {
          return;
        }
    
        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        let documentListClone = this.contacts.slice();
        this.contactChangedEvent.next(documentListClone);
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
        this.contactChangedEvent.next(this.contacts.slice());
    }
}