import { Contact } from "../contacts/contacts";
import { validateInputs } from "../validation/validation";
import { displayErrors } from "../validation/validation";
import { displayContacts } from "../contactActions/displayContacts";

export function openEditModal(contact: Contact): void {
  const modal = document.getElementById("editModal") as HTMLDialogElement;
  const nameInput = document.getElementById("editName") as HTMLInputElement;
  const vacancyInput = document.getElementById("editVacancy") as HTMLInputElement;
  const phoneInput = document.getElementById("editPhone") as HTMLInputElement;
  const saveButton = document.getElementById("saveButton") as HTMLButtonElement;
  const closeButton = document.querySelector(".close") as HTMLElement;

  nameInput.value = contact.name;
  vacancyInput.value = contact.vacancy;
  phoneInput.value = contact.phone;

  modal.showModal();

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  saveButton.onclick = () => {
    const name = nameInput.value || contact.name;
    const vacancy = vacancyInput.value || contact.vacancy;
    const phone = phoneInput.value || contact.phone;

    const validationErrors = validateInputs(name, vacancy, phone);
    if (validationErrors.length > 0) {
      displayErrors(validationErrors);
      return;
    }

    contact.name = name;
    contact.vacancy = vacancy;
    contact.phone = phone;
    
    displayContacts();
    modal.close();
  };
}