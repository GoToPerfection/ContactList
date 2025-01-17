import { Contact } from "../contacts/contacts";
import { validateInputs } from "../validation/validation";
import { displayErrors } from "../validation/validation";
import { saveContacts } from "../contactActions/saveContacts";
import { displayContacts } from "../contactActions/displayContacts";

export function openEditModal(contact: Contact): void {
  const name = prompt("Введите новое имя:", contact.name) || contact.name;
  const vacancy = prompt("Введите новую вакансию:", contact.vacancy) || contact.vacancy;
  const phone = prompt("Введите новый телефон:", contact.phone) || contact.phone;

  const validationErrors = validateInputs(name, vacancy, phone);
  if (validationErrors.length > 0) {
    displayErrors(validationErrors);
    return;
  }

  contact.name = name;
  contact.vacancy = vacancy;
  contact.phone = phone;
  saveContacts();
  displayContacts();
}