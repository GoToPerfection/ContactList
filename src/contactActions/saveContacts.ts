import { contacts } from "../contacts/contacts";

export function saveContacts(): void {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem("contacts", JSON.stringify(contacts));
}
