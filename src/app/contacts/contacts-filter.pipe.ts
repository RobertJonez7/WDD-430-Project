import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): Contact[] {
    if (!contacts.length || !term) {
      return contacts;
    }

    let filteredArray = contacts.filter((contact: Contact) => {
      return contact.name.toLowerCase().includes(term);
    });

    return filteredArray;
  }

}
