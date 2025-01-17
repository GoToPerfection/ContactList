import "./style.css"

import { initializeEventListeners } from "./initialization/initializeEventListeners.ts";
import { displayContacts } from "./contactActions/displayContacts.ts";

initializeEventListeners();
displayContacts();
