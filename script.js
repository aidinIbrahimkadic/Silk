const input = document.getElementById("myInput");
const clearBtn = document.querySelector(".clear-btn");

input.addEventListener("input", function () {
  if (this.value.length > 0) {
    clearBtn.style.display = "block"; // Show 'X' when there is input
  } else {
    clearBtn.style.display = "none"; // Hide 'X' when empty
  }
});

function clearInput() {
  input.value = "";
  clearBtn.style.display = "none"; // Hide 'X' when cleared
  input.focus(); // Keep focus on input after clearing
}

// Toggle sidebar
function toggleCart() {
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartOverlay = document.querySelector(".cart-overlay");

  if (cartSidebar.classList.contains("open")) {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("active");
  } else {
    cartSidebar.classList.add("open");
    cartOverlay.classList.add("active");
  }
}
function removeProduct(element) {
  element.parentElement.remove();
}

document.querySelectorAll(".kartica").forEach((kartica) => {
  const step = parseInt(kartica.querySelector(".step-value").textContent); // Get step value
  const input = kartica.querySelector("#counter");
  const decreaseBtn = kartica.querySelector(".btn:first-child");
  const increaseBtn = kartica.querySelector(".btn:last-child");

  // Increase value by step
  increaseBtn.addEventListener("click", () => {
    input.value = parseInt(input.value) + step;
  });

  // Decrease value by step, but allow reaching 0
  decreaseBtn.addEventListener("click", () => {
    let currentValue = parseInt(input.value);
    if (currentValue > 0) {
      // Allows reaching 0 but not negative values
      input.value = currentValue - step;
    }
  });
});

// paginacija
const totalPages = 10; // Ukupan broj stranica
let currentPage = 1; // Početna stranica

function generatePagination() {
  const pageContainer = document.querySelector(".page-numbers");
  pageContainer.innerHTML = ""; // Resetuje paginaciju

  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement("span");
    pageNumber.textContent = i;
    pageNumber.classList.add("page");

    if (i === currentPage) {
      pageNumber.classList.add("active");
    }

    pageNumber.addEventListener("click", () => {
      currentPage = i;
      updatePagination();
    });

    pageContainer.appendChild(pageNumber);
  }
}

function changePage(direction) {
  if (
    (direction === -1 && currentPage > 1) ||
    (direction === 1 && currentPage < totalPages)
  ) {
    currentPage += direction;
    updatePagination();
  }
}

function updatePagination() {
  generatePagination();
}

generatePagination(); // Pokreće paginaciju na početku
