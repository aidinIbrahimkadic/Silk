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

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".donji_header-blok");
  const headerOffset = header.offsetTop; // Prvobitna pozicija headera
  const headerHeight = header.offsetHeight; // Visina headera
  const spacer = document.createElement("div"); // Prazan div kao razmak
  spacer.style.height = `${headerHeight}px`;
  spacer.style.display = "none"; // Sakriven dok nije potrebno
  header.parentNode.insertBefore(spacer, header.nextSibling); // Dodaj spacer ispod headera

  window.addEventListener("scroll", function () {
    if (window.pageYOffset >= headerOffset) {
      header.classList.add("fixed-header");
      spacer.style.display = "block"; // Prikaži razmak ispod
    } else {
      header.classList.remove("fixed-header");
      spacer.style.display = "none"; // Sakrij razmak kada se vrati gore
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".donji-header li");

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Ukloni 'active' klasu sa svih elemenata
      menuItems.forEach((el) => el.classList.remove("active"));

      // Dodaj 'active' klasu na kliknuti element
      this.classList.add("active");
    });
  });
});


// POPUP
function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// To the top
// Get the button
const toTopBtn = document.getElementById("toTopBtn");

// Show the button when scrolling down
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        toTopBtn.classList.add("show");
    } else {
        toTopBtn.classList.remove("show");
    }
};

// Smooth scroll to the top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
