import { contacts } from "../contacts/contacts.ts";
import { createActionButton } from "../letterDescription/createActionButton.ts";
import { openEditModal } from "../editModal/openEditModal.ts";
import { deleteContact } from "./deleteContact.ts";

export function searchContacts(): void {
  const query = (this as HTMLInputElement).value.toLowerCase();
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  const results = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(query) ||
      contact.phone.includes(query)
  );

  if (results.length === 0) {
    searchResults.textContent = `Ничего не найдено для '${query}'`;
  } else {
    results.forEach((contact) => {
      const li = document.createElement("div");
      li.textContent = `${contact.name} - ${contact.vacancy} - ${contact.phone}`;
      li.appendChild(
        createActionButton("Редактировать", () => openEditModal(contact))
      );
      li.appendChild(
        createActionButton("Удалить", () => {
          deleteContact(contact);
          searchContacts.call(document.getElementById("searchInput"));
        })
      );
      searchResults.appendChild(li);
    });
  }
}
