import "./style.css";

const contacts = JSON.parse(localStorage.getItem("contacts")) || []; // Загружаем контакты из localStorage
const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const vacancyInput = document.getElementById("vacancy");
    const phoneInput = document.getElementById("phone");

    const name = nameInput.value.trim();
    const vacancy = vacancyInput.value.trim();
    const phone = phoneInput.value.trim();
    let isValid = true; // Переменная для проверки валидности ввода

    // Валидация имени
    if (!/^[А-Яа-яЁё\s]+$/.test(name)) {
      document.getElementById("nameError").textContent =
        "Имя может содержать только буквы!";
      nameInput.value = ""; // Очищаем поле имени при ошибке
      isValid = false;
    } else {
      document.getElementById("nameError").textContent = "";
    }

    // Валидация вакансии
    if (!/^[А-Яа-яЁё\s]+$/.test(vacancy)) {
      document.getElementById("vacancyError").textContent =
        "Вакансия может содержать только буквы!";
      vacancyInput.value = ""; // Очищаем поле вакансии при ошибке
      isValid = false;
    } else {
      document.getElementById("vacancyError").textContent = "";
    }

    // Валидация телефона
    if (!/^\+?\d+$/.test(phone)) {
      document.getElementById("phoneError").textContent =
        "Телефон должен содержать только цифры и знак + в начале!";
      phoneInput.value = ""; // Очищаем поле телефона при ошибке
      isValid = false;
    } else {
      document.getElementById("phoneError").textContent = "";
    }

    if (!isValid) return; // Прерываем выполнение, если есть ошибки

    addContact(name, vacancy, phone);

    // Сбрасываем поля формы только при успешной валидации
    nameInput.value = "";
    vacancyInput.value = "";
    phoneInput.value = "";

    // Обновляем отображение контактов
    displayContacts();
  });

function addContact(name, vacancy, phone) {
  const contact = {
    id: new Date().getTime(), // Уникальный идентификатор
    name,
    vacancy,
    phone,
  };
  contacts.push(contact);
  contacts.sort((a, b) => a.name.localeCompare(b.name)); // Сортировка по имени
  localStorage.setItem("contacts", JSON.stringify(contacts)); // Сохраняем контакты в localStorage
}

function displayContacts() {
  const contactList = document.getElementById("contactList");
  contactList.innerHTML = ""; // Очищаем список перед добавлением новых элементов

  let alphabetContacts = {}; // Объект для хранения контактов по букве

  contacts.forEach((contact) => {
    const firstLetter = contact.name.charAt(0).toUpperCase(); // Получаем первую букву имени

    if (!alphabetContacts[firstLetter]) {
      alphabetContacts[firstLetter] = [];
    }
    alphabetContacts[firstLetter].push(contact); // Добавляем контакт к букве
  });

  // Выводим буквы и количество контактов
  for (let letter of alphabet) {
    if (alphabetContacts[letter]) {
      const letterItem = document.createElement("div");
      letterItem.className = "letter";
      letterItem.textContent = `${letter} (${alphabetContacts[letter].length})`; // Количество элементов
      letterItem.addEventListener("click", () => toggleContacts(letter)); // Обработчик клика
      contactList.appendChild(letterItem);

      const contactDiv = document.createElement("div");
      contactDiv.className = "contact-list";
      contactDiv.id = letter; // Уникальный id для каждого списка контактов

      alphabetContacts[letter].forEach((contact) => {
        const li = document.createElement("div");
        li.textContent = `${contact.name} - ${contact.vacancy} - ${contact.phone}`;

        // Кнопка "Редактировать"
        const editButton = document.createElement("button");
        editButton.textContent = "Редактировать";
        editButton.onclick = () => openEditModal(contact);

        // Кнопка "Удалить"
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.onclick = () => deleteContact(contact);

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        contactDiv.appendChild(li);
      });

      contactList.appendChild(contactDiv);
    }
  }
}

function toggleContacts(letter) {
  const contactDiv = document.getElementById(letter);
  contactDiv.style.display =
    contactDiv.style.display === "none" || contactDiv.style.display === ""
      ? "block"
      : "none";
}

function deleteContact(contactToDelete) {
  const index = contacts.indexOf(contactToDelete);
  if (index > -1) {
    contacts.splice(index, 1); // Удаляем контакт из массива
  }
  localStorage.setItem("contacts", JSON.stringify(contacts)); // Обновляем localStorage
  displayContacts(); // Обновляем отображение
}

document.getElementById("deleteAll").addEventListener("click", function () {
  contacts.length = 0; // Очищаем массив контактов
  localStorage.removeItem("contacts"); // Удаляем данные из localStorage
  displayContacts(); // Обновляем отображение
});

// Функции для работы с модальным окном
const modal = document.getElementById("myModal");
const closeModal = document.getElementsByClassName("close")[0];

closeModal.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

document.getElementById("searchButton").onclick = function () {
  modal.style.display = "block"; // Открываем модальное окно
};

document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  searchContacts(query);
});

function searchContacts(query) {
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = ""; // Очищаем предыдущие результаты

  const results = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.phone.includes(query)
    ); // Поиск по имени и телефону
  });

  if (results.length === 0) {
    searchResults.textContent = `Ничего не найдено для '${query}'`;
    return;
  }

  results.forEach((contact) => {
    const li = document.createElement("div");
    li.textContent = `${contact.name} - ${contact.vacancy} - ${contact.phone}`;

    // Кнопка "Редактировать" для найденных контактов
    const editButton = document.createElement("button");
    editButton.textContent = "Редактировать";
    editButton.onclick = () => openEditModal(contact);

    // Кнопка "Удалить" для найденных контактов
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.onclick = () => {
      deleteContact(contact);
      searchContacts(query); // Обновляем результаты после удаления
    };

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    searchResults.appendChild(li);
  });
}

function openEditModal(contact) {
  const name = prompt("Введите новое имя:", contact.name) || contact.name;
  const vacancy =
    prompt("Введите новую вакансию:", contact.vacancy) || contact.vacancy;
  const phone =
    prompt("Введите новый телефон:", contact.phone) || contact.phone;

  // Валидация введенных данных при редактировании
  if (!/^[А-Яа-яЁё\s]+$/.test(name))
    return alert("Имя может содержать только буквы!");
  if (!/^[А-Яа-яЁё\s]+$/.test(vacancy))
    return alert("Вакансия может содержать только буквы!");
  if (!/^\+?\d+$/.test(phone))
    return alert("Телефон должен содержать только цифры и знак + в начале!");

  // Обновляем контакт
  contact.name = name;
  contact.vacancy = vacancy;
  contact.phone = phone;

  // Сортируем контакты и обновляем отображение
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem("contacts", JSON.stringify(contacts)); // Сохраняем изменения в localStorage
  displayContacts();
}

// Отображение всего алфавита
function displayAlphabet() {
  const alphabetContainer = document.getElementById("alphabet");
  alphabet.forEach((letter) => {
    const letterSpan = document.createElement("span");
    letterSpan.textContent = letter;
    letterSpan.className = "letter";
    alphabetContainer.appendChild(letterSpan);
  });
}

displayAlphabet(); // Отображаем алфавит при загрузке страницы
displayContacts(); // Отображаем контакты при загрузке страницы
