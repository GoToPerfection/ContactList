import { validateInputs } from "../validation/validation";
import { displayErrors } from "../validation/validation";
import { addContact } from "../contactActions/addContact";
import { clearForm } from "./clearForm";
import { displayContacts } from "../contactActions/displayContacts";

export function handleFormSubmit(event: Event): void {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value.trim();
  const vacancy = (document.getElementById("vacancy") as HTMLInputElement).value.trim();
  const phone = (document.getElementById("phone") as HTMLInputElement).value.trim();

  const validationErrors = validateInputs(name, vacancy, phone);
  if (validationErrors.length > 0) {
    displayErrors(validationErrors);
    return;
  }

  addContact(name, vacancy, phone);
  clearForm();
  displayContacts();
}