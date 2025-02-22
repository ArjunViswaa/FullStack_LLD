const mainCont = document.querySelector(".main-cont");
const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
const textArea = document.querySelector(".textArea-cont");
const allPriorityColors = document.querySelectorAll(".priority-color");
const removeBtn = document.querySelector(".remove-btn");
const allTickets = document.querySelectorAll(".ticket-cont");

let addTaskFlag = false;
let removeTaskFlag = false;
let modalPriorityColor = "lightpink";

addBtn.addEventListener("click", () => {
    addTaskFlag = !addTaskFlag;
    if (addTaskFlag == true) {
        modalCont.style.display = "flex";
    } else {
        modalCont.style.display = "none";
    }
});

const createTicket = (ticketColor, ticketTask, ticketID) => {
    // Create a new ticket container element
    const ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">${ticketID}</div>
        <div class="task-area">${ticketTask}</div>
        <div class="ticket-lock">
            <i class="fa-solid fa-lock"></i>
        </div>`;
    mainCont.appendChild(ticketCont);
}

modalCont.addEventListener("keydown", (e) => {
    if (e.key === "Shift") {
        const ticketID = Math.random().toString(36).substring(2, 8)
        createTicket(modalPriorityColor, textArea.value, ticketID); // Create a new ticket with the selected color and task content
        modalCont.style.display = "none"; // Hide the modal
        addTaskFlag = false; // Set the addTaskFlag to false
        textArea.value = ""; // Clear the textarea's content
    }
});

allPriorityColors.forEach((colorElem) => {
    colorElem.addEventListener("click", () => {
        allPriorityColors.forEach((priorityColor) => {
            priorityColor.classList.remove("active");
        });
        colorElem.classList.add("active");
        modalPriorityColor = colorElem.classList[0];
    });
});

removeBtn.addEventListener('click', () => {
    removeTaskFlag = !removeTaskFlag;// Toggle the removeTaskFlag when the button is clicked
    if (removeTaskFlag) {
        alert("Delete button is activated.");
        removeBtn.style.color = "red";
    } else {
        removeBtn.style.color = "white";
    }
})

const handleRemoval = (ticket) => {
    ticket.addEventListener("click", function () {
        if (!removeTaskFlag) return;
        else {
            ticket.remove();
        }
    });
}

allTickets.forEach((ticket) => {
    handleRemoval(ticket);
})
