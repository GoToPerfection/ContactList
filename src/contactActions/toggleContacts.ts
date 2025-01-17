export function toggleContacts(letter: string): void {
  const contactDiv = document.getElementById(letter);
  contactDiv.style.display =
    contactDiv.style.display === "none" ? "block" : "none";
}
