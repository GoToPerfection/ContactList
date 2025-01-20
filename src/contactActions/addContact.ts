import { contacts } from "../contacts/contacts";

export function addContact(name: string, vacancy: string, phone: string): void {
  contacts.push({ id: Date.now(), name, vacancy, phone });

}
