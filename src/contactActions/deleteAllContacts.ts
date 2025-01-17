import { contacts } from "../contacts/contacts";
import { displayContacts } from "./displayContacts";

export function deleteAllContacts(): void {
  contacts.length = 0;
  localStorage.removeItem("contacts");
  displayContacts();
}
