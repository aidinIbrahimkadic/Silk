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
