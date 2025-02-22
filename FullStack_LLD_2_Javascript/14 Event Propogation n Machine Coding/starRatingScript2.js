const parentStar = document.querySelector("#stars");
const allStars = parentStar.querySelectorAll(".star");
const ratingDisplay = document.getElementById("rating");

parentStar.addEventListener("click", (e) => {
    const value = e.target.getAttribute("data-value");
    updateRating(value);
});

const updateRating = (value) => {
    allStars.forEach((star) => {
        const starValue = parseInt(star.getAttribute("data-value"));
        star.classList.toggle("filled", starValue <= value);
    });
    ratingDisplay.textContent = value;
}