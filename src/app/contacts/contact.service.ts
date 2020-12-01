import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    private contacts: Contact[] = [];
    maxDocumentId: number;
    contactSelected = new Subject<Contact>();
    contactChangedEvent = new Subject<Contact[]>();

    constructor(private http: HttpClient) {
      //this.getContacts();
    }
    
    getContacts() {
      this.http.get('http://localhost:3000/contacts').subscribe((contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxDocumentId = this.getMaxId();
          this.contactChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.log(error);
      });
      return this.contacts;
    }

    getContact(id: string): Contact {
      for (let contact of this.contacts) {
        if (contact.id === id) {
          return contact;
        }
      }
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
      newContact.id = this.maxDocumentId.toString();
    
      this.contacts.push(newContact);
      this.storeContacts();
    }

    storeContacts() {
      const contactsArray = JSON.stringify(this.contacts);
      this.http.put('http://localhost:3000/contacts', contactsArray)
      .subscribe(() => {
          this.contactChangedEvent.next(this.contacts.slice());
      });
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
      this.storeContacts();
    }

    deleteContact(contact: Contact) {
      if (!contact) {
          return;
      }
      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
          return;
      }
      this.contacts.splice(pos, 1);
      this.storeContacts();
    }
}