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

document.querySelectorAll(".kartica-container").forEach((kartica) => {
  const step = parseInt(kartica.querySelector(".step-value").textContent); // Get step value
  const input = kartica.querySelector(".counter");
  const decreaseBtn = kartica.querySelector(".btn:first-child");
  const increaseBtn = kartica.querySelector(".btn:last-child");

  // Increase value by step
  increaseBtn.addEventListener("click", () => {
    input.value = parseInt(input.value) + step;
  });

  // Decrease value by step, but allow reaching 0
  decreaseBtn.addEventListener("click", () => {
    let currentValue = parseInt(input.value);
    // 🛑 Check if we are decreasing from `step-value` to `0`
    if (currentValue === step) {
      decreaseValue(decreaseBtn); // Call the function BEFORE decreasing
    }

    if (currentValue > 0) {
      input.value = currentValue - step;
    }
  });
});

// paginacija
// const totalPages = 10;
let totalPages = window.matchMedia("(max-width: 767px)").matches ? 5 : 10;
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
  if (window.location.pathname.endsWith("index.html")) {
    generatePagination(); // Run pagination only on index.html
  }
});

// Pokreće paginaciju na početku
// generatePagination();

document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/"
  ) {
    const header = document.querySelector(".donji_header-blok");

    if (!header) return; // Stop execution if header is not found

    const headerOffset = header.offsetTop; // Original position of the header
    const headerHeight = header.offsetHeight; // Header height
    const spacer = document.createElement("div"); // Empty div as a spacer
    spacer.style.height = `${headerHeight}px`;
    spacer.style.display = "none"; // Hidden until needed
    header.parentNode.insertBefore(spacer, header.nextSibling); // Insert spacer below header

    window.addEventListener("scroll", function () {
      if (window.pageYOffset >= headerOffset) {
        header.classList.add("fixed-header");
        spacer.style.display = "block"; // Show spacer below when header is fixed
      } else {
        header.classList.remove("fixed-header");
        spacer.style.display = "none"; // Hide spacer when scrolling back up
      }
    });
  }
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
  let newQty = currentQty + minQty * change;

  // Ensure quantity does not go below zero
  if (newQty < 0) newQty = 0;

  // Update quantity and total
  quantityInput.value = newQty;
  totalField.textContent = `${(newQty * price).toFixed(2)} KM`;

  updateCartTotal();
}

document.addEventListener("DOMContentLoaded", function () {
  updateAllTotals(); // Ensure all totals are set on page load
});

// Function to update total prices on page load
function updateAllTotals() {
  document.querySelectorAll(".product-table tbody tr").forEach((row) => {
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
  if (window.location.pathname.includes("korpa.html")) {
    updateCartTotal(); // Run only on korpa.html
  }
});

function updateCartTotal() {
  let totalSum = 0;

  // Loop through all table rows
  document.querySelectorAll(".product-table tbody tr").forEach((row) => {
    const totalCell = row.querySelector(".total");

    if (totalCell) {
      const totalValue = parseFloat(
        totalCell.textContent.replace("KM", "").trim()
      );
      if (!isNaN(totalValue)) {
        totalSum += totalValue; // Add each product's total
      }
    }
  });

  // Update cart total price
  document.getElementById(
    "total-price"
  ).innerHTML = `<strong>${totalSum.toFixed(2)} KM</strong>`;
}

// F***ING NOTIFICATIONS

document.addEventListener("DOMContentLoaded", function () {
  // Attach event listeners to all buttons dynamically
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("notification-btn-add")) {
      increaseValue(event.target);
    }
    // } else if (event.target.classList.contains("notification-btn-delete")) {
    //   decreaseValue(event.target);
    // }
  });
});

function increaseValue(button) {
  if (!button) {
    return;
  }
  const wrapper = button.closest(".proizvod-info");

  if (!wrapper) return;
  const naziv = wrapper.querySelector(".naziv-proizvoda").textContent;

  // const kartica = wrapper.closest(".kartica-container");
  // const image = kartica.querySelector("img").getAttribute("src");
  const pagePath = window.location.pathname;

  if (
    pagePath.endsWith("index.html") ||
    pagePath.endsWith("tabela.html") ||
    pagePath === "/"
  ) {
    kartica = wrapper.closest(".kartica-container");
    image = kartica.querySelector("img").getAttribute("src");
  } else if (pagePath.endsWith("single-product.html")) {
    kartica = wrapper.closest(".kontejner");
    image = kartica.querySelector("#main-image").getAttribute("src");
  }

  const counter = wrapper.querySelector(".counter"); // Select the counter input

  const stepValue =
    parseInt(wrapper.querySelector(".step-value").textContent) || 1;
  let counterValue = parseInt(counter.value);

  if (counterValue === stepValue) {
    showNotification(
      `<div class="notifikacija-poruka"><div>Proizvod <span class="notifikacija-naziv_proizvoda">${naziv}</span></div><div><span class="notifikacija-poruka-info">je dodan u korpu</span></div></div>`,
      "added",
      image
    );
  }

  counter.value = counterValue;
}

// Function to decrease the counter value by step value
function decreaseValue(button) {
  if (!button) {
    return;
  }
  const wrapper = button.closest(".proizvod-info");
  if (!wrapper) return;
  const naziv = wrapper.querySelector(".naziv-proizvoda").textContent;
  const pagePath = window.location.pathname;

  let kartica;
  let image;

  if (
    pagePath.endsWith("index.html") ||
    pagePath.endsWith("tabela.html") ||
    pagePath === "/"
  ) {
    kartica = wrapper.closest(".kartica-container");
    image = kartica.querySelector("img").getAttribute("src");
  } else if (pagePath.endsWith("single-product.html")) {
    kartica = wrapper.closest(".kontejner");
    image = kartica.querySelector("#main-image").getAttribute("src");
  }

  const stepValue =
    parseInt(wrapper.querySelector(".step-value").textContent) || 1;

  const counter = wrapper.querySelector(".counter");
  let counterValue = parseInt(counter.value);

  if (counterValue === stepValue) {
    showNotification(
      `<div class="notifikacija-poruka"><div>Proizvod <span class="notifikacija-naziv_proizvoda">${naziv}</span></div><div><span class="notifikacija-poruka-info">je uklonjen iz korpe</span></div></div>`,
      "removed",
      image
    );
  }
}

// Function to show notifications
function showNotification(message, type, image) {
  const notification = document.createElement("div");
  notification.className = `notification-popup ${type}`;
  notification.innerHTML = `<div class="notifikacije-image_info"><img class="notification-image" src='${image}'>  ${message}</div>`;

  const notificationBtn = document.createElement("div");
  notificationBtn.className = `notification-blok-btn`;

  notificationBtn.innerHTML = `<a href="/korpa.html" class="btns btn-view btn-view-notification">Pregled korpe</a>`;

  document
    .getElementById("notification-container")
    .appendChild(notification)
    .appendChild(notificationBtn);

  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}

// single product

let currentImageIndex = 0;
//OVDJE LISTA FOTOGRAFIJA KOJE IMA SINGLE PRODUCT
const images = [
  "/images/pro2.jpg",
  "/images/pro3.jpg",
  "/images/product2.jpg",
  "/images/logotip.png",
];

// Change main image using arrows
function changeImage(direction) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) currentImageIndex = images.length - 1;
  if (currentImageIndex >= images.length) currentImageIndex = 0;
  document.getElementById("main-image").src = images[currentImageIndex];
}

// Click thumbnail to change main image
function setMainImage(img) {
  document.getElementById("main-image").src = img.src;
}

// Scroll thumbnails
function scrollThumbnails(direction) {
  const thumbnailContainer = document.querySelector(".thumbnails");
  thumbnailContainer.scrollBy({
    left: direction * 100,
    behavior: "smooth",
  });
}

// KLIJENT MODAL
function openKlijentModal() {
  document.getElementById("klijentModal").style.display = "flex";
}

function closeKlijentModal() {
  document.getElementById("klijentModal").style.display = "none";
}

function selectClient() {
  const selectedClient = document.getElementById("clientList").value;
  alert("Odabrali ste: " + selectedClient);
  closeKlijentModal();
}
