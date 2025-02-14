const input = document.getElementById("myInput");
const clearBtn = document.querySelector(".clear-btn");

input.addEventListener("input", function() {
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
