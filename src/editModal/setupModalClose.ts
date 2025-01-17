export function setupModalClose(): void {
    const closeButton = document.querySelector(".close");
    const modal = document.getElementById("myModal");
  
    if (closeButton && modal) {
      closeButton.addEventListener("click", () => {
        modal.style.display = "none"; // Скрыть модальное окно
        (document.getElementById("searchInput") as HTMLInputElement).value = ""; // Очистить поле ввода
        document.getElementById("searchResults")!.innerHTML = ""; // Очистить результаты (если необходимо)
      });
    }
  }
  