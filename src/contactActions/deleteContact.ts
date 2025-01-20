import { Contact } from "../contacts/contacts";
import { contacts } from "../contacts/contacts";
import { displayContacts } from "./displayContacts";

export function deleteContact(contactToDelete: Contact): void {
  const index = contacts.indexOf(contactToDelete);
  if (index > -1) {
    contacts.splice(index, 1);
    displayContacts();
  }
}
