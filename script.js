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

//Moguci bug
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.endsWith("index.html") ) {
      generatePagination(); // Run pagination only on index.html
  }
});

 // Pokreće paginaciju na početku
// generatePagination();

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
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    toTopBtn.classList.add("show");
  } else {
    toTopBtn.classList.remove("show");
  }
};

// Smooth scroll to the top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// left sidebar filter
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Toggle Categories List
function toggleCategory(id) {
  const section = document.getElementById(id);
  const icon = document.getElementById(id + "-icon");

  if (section.classList.contains("hidden")) {
    section.classList.remove("hidden");
    icon.textContent = "-";
  } else {
    section.classList.add("hidden");
    icon.textContent = "+";
  }
}

// Update Price Value on Slider Move
function updatePrice() {
  document.getElementById("price-value").textContent =
    document.getElementById("price-slider").value;
}

function removeRow(button) {
  button.closest("tr").remove(); // Removes the table row
}


function updateQuantity(button, change) {
  const row = button.closest("tr");
  const quantityInput = row.querySelector(".quantity-input");
  const priceElement = row.querySelector(".price");
  const totalField = row.querySelector(".total");

  const minQty = parseInt(row.querySelector(".min-qty").textContent, 10);
  const price = parseFloat(priceElement.textContent.replace("KM", "").trim());

  let currentQty = parseInt(quantityInput.value, 10);
  let newQty = currentQty + (minQty * change);

  // Ensure quantity does not go below zero
  if (newQty < 0) newQty = 0;

  // Update quantity and total
  quantityInput.value = newQty;
  totalField.textContent = `${(newQty * price).toFixed(2)} KM`;
}



document.addEventListener("DOMContentLoaded", function () {
  updateAllTotals(); // Ensure all totals are set on page load
});

// Function to update total prices on page load
function updateAllTotals() {
  document.querySelectorAll(".product-table tbody tr").forEach(row => {
      const quantityInput = row.querySelector(".quantity-input");
      const priceElement = row.querySelector(".price");
      const totalField = row.querySelector(".total");

      if (!quantityInput || !priceElement || !totalField) return;

      const price = parseFloat(priceElement.textContent.replace("KM", "").trim());
      const currentQty = parseInt(quantityInput.value, 10);

      if (!isNaN(price) && !isNaN(currentQty)) {
          totalField.textContent = `${(currentQty * price).toFixed(2)} KM`;
      }
  });
}


document.addEventListener("DOMContentLoaded", function () {
  updateCartTotal(); // Automatically calculate total on page load
});
// Refresh totals manually when the button is clicked
document.querySelector(".osvjezi-korpu").addEventListener("click", function () {
  updateCartTotal();
});

function updateCartTotal() {
  let totalSum = 0;

  // Loop through all table rows
  document.querySelectorAll(".product-table tbody tr").forEach(row => {
      const totalCell = row.querySelector(".total");
      
      if (totalCell) {
          const totalValue = parseFloat(totalCell.textContent.replace("KM", "").trim());
          if (!isNaN(totalValue)) {
              totalSum += totalValue; // Add each product's total
          }
      }
  });

  // Update cart total price
  document.getElementById("total-price").innerHTML = `<strong>${totalSum.toFixed(2)} KM</strong>`;
}
