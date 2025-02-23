document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submitComment");
    const commentInput = document.getElementById("commentInput");
    const commentsContainer = document.getElementById("commentsContainer");

    submitBtn.addEventListener("click", () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            addComment(commentText);
            commentInput.value = ""; // Clear the input parameter...
        }
    });
});

function addComment(text) {
    const commentElement = document.createElement("div");
    commentElement.className = "repliesContainer";
    commentElement.innerHTML = `<p>${text}</p>
        <button class="replyBtn">Reply</button>
        <textarea class="replyInput" placeholder="Write a
        reply..."></textarea> `;
    commentsContainer.appendChild(commentElement);
    commentsContainer.addEventListener("click", (e) => {
        if (e.target.className.includes("replyBtn")) {
            const parentComment = e.target.parentElement;
            const replyInput = parentComment.querySelector(".replyInput");
            const replyText = replyInput.value.trim();
            if (replyText) {
                addReply(parentComment, replyText);
                replyInput.value = ""; // Clear input field after replying
            }
        }
    });
}

function addReply(parentComment, text) {
    // parentComment.querySelector(".repliesContainer");
    const replyElement = document.createElement("div");
    replyElement.className = "repliesContainer";
    replyElement.innerHTML = `<p>${text}</p>`;
    const btn = document.createElement("button");
    btn.className = "replyBtn";
    btn.innerText = "Reply";
    replyElement.appendChild(btn);
    const replyInput = document.createElement("textarea");
    replyInput.className = "replyInput";
    replyInput.placeholder = "Write a reply...";
    replyElement.appendChild(replyInput);
    parentComment.appendChild(replyElement);
    parentComment.classList.remove("collapsed");
}