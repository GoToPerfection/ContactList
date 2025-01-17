export function validateInputs(
  name: string,
  vacancy: string,
  phone: string
): { field: string, message: string }[] {
  const errors: { field: string, message: string }[] = [];

  if (!/^[А-Яа-яЁё\s]+$/.test(name))
    errors.push({
      field: "nameError",
      message: "Имя может содержать только буквы!",
    })
    else {
      document.getElementById("nameError").textContent = "";
    };
  if (!/^[А-Яа-яЁё\s]+$/.test(vacancy))
    errors.push({
      field: "vacancyError",
      message: "Вакансия может содержать только буквы!",
    })
    else {
      document.getElementById("vacancyError").textContent = "";
    };
  if (!/^\+?\d+$/.test(phone))
    errors.push({
      field: "phoneError",
      message: "Телефон должен содержать только цифры и знак + в начале!",
    });
    else {
      document.getElementById("phoneError").textContent = "";
    }

  return errors;
}

export function displayErrors(
  errors: { field: string, message: string }[]
): void {
  errors.forEach(({ field, message }) => {
    const errorField = document.getElementById(field);
    if (errorField) {
      errorField.textContent = message;
    }
  });
}
