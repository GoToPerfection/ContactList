import { handleFormSubmit } from "../formFilling/handleFormSubmit.ts";
import { deleteAllContacts } from "../contactActions/deleteAllContacts.ts";
import { showModal } from "../editModal/showModal.ts";
import { searchContacts } from "../contactActions/searchContacts.ts";

export function initializeEventListeners(): void {
  document
    .getElementById("contactForm")
    .addEventListener("submit", handleFormSubmit);
  document
    .getElementById("deleteAll")
    .addEventListener("click", deleteAllContacts);
  document
  .getElementById("searchButton")
  .addEventListener("click", showModal)
  document.getElementById("searchInput")
    .addEventListener("input", searchContacts);
}
