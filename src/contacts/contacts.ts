export interface Contact {
  id: number;
  name: string;
  vacancy: string;
  phone: string;
}

export const contacts: Contact[] = JSON.parse(
  localStorage.getItem("contacts") || "[]"
);
