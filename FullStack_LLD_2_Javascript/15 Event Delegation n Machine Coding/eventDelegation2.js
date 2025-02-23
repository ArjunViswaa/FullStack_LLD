const colorPalette = document.getElementById("colorPalette");

colorPalette.addEventListener("click", (event) => {
    const clickedElement = event.target;
    // Check if the clicked element is a color box
    if (clickedElement.classList.contains("color-box")) {
        let color = clickedElement.style.backgroundColor;
        console.log(color)
        // color = color.replace('rgb', 'rgba').replace(')', ', 0.2)');
        document.body.style.backgroundColor = color;
    }
});
