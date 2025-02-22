// Getting DOM Elements...
const mainCont = document.querySelector(".main-cont");
const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
const textArea = document.querySelector(".textArea-cont");
const allPriorityColors = document.querySelectorAll(".priority-color");
const removeBtn = document.querySelector(".remove-btn");
const allTickets = document.querySelectorAll(".ticket-cont");
const toolboxColors = document.querySelectorAll(".color");

// Variables / flags declaration...
let addTaskFlag = false;
let removeTaskFlag = false;
const lockClose = "fa-lock";
const lockOpen = "fa-lock-open";
let modalPriorityColor = "lightpink";
const colors = ["lightpink", "lightgreen", "lightblue", "black"];
let ticketsArr = JSON.parse(localStorage.getItem('tickets')) || [];

const updateLocalStorage = () => {
    localStorage.setItem('tickets', JSON.stringify(ticketsArr))
}

const getTicketIndex = (id) => {
    let ticketIdx = ticketsArr.findIndex((ticket) => {
        return ticket.ticketID == id;
    });
    return ticketIdx;
}

addBtn.addEventListener("click", () => {
    addTaskFlag = !addTaskFlag;
    if (addTaskFlag == true) {
        modalCont.style.display = "flex";
    } else {
        modalCont.style.display = "none";
    }
});

modalCont.addEventListener("keydown", (e) => {
    if (e.key === "Shift") {
        const ticketID = Math.random().toString(36).substring(2, 8)
        createTicket(modalPriorityColor, textArea.value, ticketID); // Create a new ticket with the selected color and task content
        modalCont.style.display = "none"; // Hide the modal
        addTaskFlag = false; // Set the addTaskFlag to false
        ticketsArr.push({ ticketID, ticketTask: textArea.value, ticketColor: modalPriorityColor })
        updateLocalStorage();
        textArea.value = ""; // Clear the textarea's content
    }
});

removeBtn.addEventListener('click', () => {
    removeTaskFlag = !removeTaskFlag;// Toggle the removeTaskFlag when the button is clicked
    if (removeTaskFlag) {
        alert("Delete button is activated.");
        removeBtn.style.color = "red";
    } else {
        removeBtn.style.color = "white";
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
    handleRemoval(ticketCont);
    handleLock(ticketCont);
    handleColor(ticketCont);
}

allPriorityColors.forEach((colorElem) => {
    colorElem.addEventListener("click", () => {
        allPriorityColors.forEach((priorityColor) => {
            priorityColor.classList.remove("active");
        });
        colorElem.classList.add("active");
        modalPriorityColor = colorElem.classList[0];
    });
});

const handleRemoval = (ticket) => {
    ticket.addEventListener("click", function () {
        const id = ticket.querySelector(".ticket-id").innerText;
        if (!removeTaskFlag) return;
        else {
            ticket.remove();
        }
        const ticketIdx = getTicketIndex(id);
        ticketsArr.splice(ticketIdx, 1);
        updateLocalStorage();
    });
}

const handleLock = (ticket) => {
    const ticketLockElem = ticket.querySelector(".ticket-lock");
    const ticketLockIcon = ticketLockElem.children[0];
    const ticketTaskArea = ticket.querySelector(".task-area");
    const id = ticket.querySelector(".ticket-id").innerText;

    ticketLockIcon.addEventListener("click", () => {
        console.log("Lock selected");
        const ticketIdx = getTicketIndex(id);
        if (ticketLockIcon.classList.contains(lockClose)) {
            ticketLockIcon.classList.remove(lockClose);
            ticketLockIcon.classList.add(lockOpen);
            ticketTaskArea.setAttribute("contenteditable", "true");
        } else {
            ticketLockIcon.classList.remove(lockOpen);
            ticketLockIcon.classList.add(lockClose);
            ticketTaskArea.setAttribute("contenteditable", "false");
        }
        ticketsArr[ticketIdx].ticketTask = ticketTaskArea.innerText;
        updateLocalStorage();
    });
}

const handleColor = (ticket) => {
    let ticketColorBand = ticket.children[0];

    ticketColorBand.addEventListener("click", () => {
        const id = ticket.querySelector(".ticket-id").innerText;
        let currentColor = ticketColorBand.classList[1];
        let currentColorIdx = colors.findIndex((color) => {
            return currentColor == color;
        });

        currentColorIdx++;

        const newTicketColorIdx = currentColorIdx % colors.length;
        const newTicketColor = colors[newTicketColorIdx];
        ticketColorBand.classList.remove(currentColor);
        ticketColorBand.classList.add(newTicketColor);
        const ticketIdx = getTicketIndex(id);
        ticketsArr[ticketIdx].ticketColor = newTicketColor;
        updateLocalStorage();
    });
}

toolboxColors.forEach((colorElem) => {
    colorElem.addEventListener("click", () => {
        const allTickets = document.querySelectorAll(".ticket-cont");
        const selectedColor = colorElem.classList[0];
        allTickets.forEach((ticket) => {
            const ticketColorBand = ticket.querySelector(".ticket-color");
            if (ticketColorBand.classList[1] == selectedColor) {
                ticket.style.display = "block";
            } else {
                ticket.style.display = "none";
            }
        });
    });
    colorElem.addEventListener("dblclick", () => {
        const allTickets = document.querySelectorAll(".ticket-cont");
        allTickets.forEach(function (ticket) {
            ticket.style.display = "block";
        });
    });
});

const init = () => {
    if (localStorage.getItem("tickets")) {
        ticketsArr.forEach((ticket) => {
            createTicket(ticket.ticketColor, ticket.ticketTask, ticket.ticketID);
        });
    }
}

init();