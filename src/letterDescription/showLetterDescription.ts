import { Contact } from "../contacts/contacts";
import { toggleContacts } from "../contactActions/toggleContacts";
import { openEditModal } from "../editModal/openEditModal";
import { deleteContact } from "../contactActions/deleteContact";
import { createActionButton } from "./createActionButton";

export function showLetterDescription(letter: string, contacts: Contact[]): void {
  const letterItem = document.createElement("div");
  letterItem.className = "letter";
  letterItem.textContent = `${letter} (${contacts.length})`;
  letterItem.addEventListener("click", () => toggleContacts(letter));

  const contactDiv = document.createElement("div");
  contactDiv.className = "contact-list";
  contactDiv.id = letter;
  contactDiv.style.display = "none";

  contacts.forEach((contact) => {
    const li = document.createElement("div");
    li.textContent = `${contact.name} - ${contact.vacancy} - ${contact.phone}`;
    li.appendChild(
      createActionButton("Редактировать", () => openEditModal(contact))
    );
    li.appendChild(createActionButton("Удалить", () => deleteContact(contact)));
    contactDiv.appendChild(li);
  });

  const contactList = document.getElementById("contactList")!;
  contactList.appendChild(letterItem);
  contactList.appendChild(contactDiv);
}