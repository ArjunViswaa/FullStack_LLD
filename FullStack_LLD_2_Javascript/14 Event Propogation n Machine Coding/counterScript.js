const incrementBtn = document.querySelector("#increment");
const decrementBtn = document.querySelector("#decrement");
const resetButton = document.getElementById("reset");
const countDisplay = document.getElementById("count");

let count = 0;

decrementBtn.addEventListener("click", () => {
    if (count > 0) {
        count--;
        countDisplay.textContent = count;
    }
});

incrementBtn.addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;
});

resetButton.addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
});