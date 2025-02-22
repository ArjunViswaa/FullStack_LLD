const grandparent = document.querySelector('#grandparent');
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

/* Event propogation - Bubbling phase... */
// grandparent.addEventListener('click', function () {
//     console.log('Grandparent clicked  (Bubbling)');
// });

// parent.addEventListener('click', function () {
//     console.log('Parent clicked  ()');
// });

// child.addEventListener('click', function () {
//     console.log('Child clicked  (Bubbling)');
// });


/* Event propogation - Capturing phase... */
// grandparent.addEventListener("click", () => {
//     console.log('Grandparent clicked (Capturing)');
// }, true);

// parent.addEventListener("click", () => {
//     console.log('Parent clicked (Capturing)');
// }, true);

// child.addEventListener("click", () => {
//     console.log('Child clicked (Capturing)');
// }, true);


/* Stop propogation... */
grandparent.addEventListener("click", () => {
    console.log('Grandparent clicked (Bubbling)');
}, false);

parent.addEventListener("click", () => {
    console.log('Parent clicked (Bubbling)');
}, false);

child.addEventListener("click", (e) => {
    console.log('Child clicked (Bubbling)');
    e.stopPropagation();
}, false);