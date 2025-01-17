export function createActionButton(
  text: string,
  onClick: () => void
): HTMLButtonElement {
  const button = document.createElement("button");
  button.textContent = text;
  button.onclick = onClick;
  return button;
}
