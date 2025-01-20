import { Contact } from "../contacts/contacts.ts";
import { contacts } from "../contacts/contacts.ts";
import { showLetterDescription } from "../letterDescription/showLetterDescription.ts"

const alphabet: string[] = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

export function displayContacts(): void {
  const contactList = document.getElementById("contactList")!;
  contactList.innerHTML = "";

  const alphabetContacts: { [key: string]: Contact[] } = contacts.reduce((acc, contact) => {
    const firstLetter = contact.name.charAt(0).toUpperCase();
    acc[firstLetter] = acc[firstLetter] || [];
    acc[firstLetter].push(contact);
    return acc;
  }, {} as { [key: string]: Contact[] });

  alphabet.forEach((letter) => {
    if (alphabetContacts[letter]) {
      showLetterDescription(letter, alphabetContacts[letter]);
    }
  });
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem("contacts", JSON.stringify(contacts));
}