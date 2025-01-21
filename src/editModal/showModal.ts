export function showModal(): void {
  const modal = document.getElementById('myModal') as HTMLDialogElement;
  const closeSearch = document.getElementById("closeSearch") as HTMLDialogElement;
  const searchInput = document.getElementById("searchInput") as HTMLInputElement;
  const searchResults = document.getElementById("searchResults") as HTMLElement;
 
  modal.showModal();
  
  closeSearch.addEventListener("click", () => {
    modal.close();
    searchInput.value = "";
    searchResults.innerHTML = "";
  });

}