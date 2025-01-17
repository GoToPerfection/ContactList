import { contacts } from "../contacts/contacts";
import { saveContacts } from "./saveContacts";

export function addContact(name: string, vacancy: string, phone: string): void {
  contacts.push({ id: Date.now(), name, vacancy, phone });
  saveContacts();
}
