const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "/delete.png";

    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage(); // Add this line to update storage when a new note is created
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === "P") {
        // Add keyup event listener for each note when clicked
        e.target.addEventListener("keyup", updateStorage);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
        updateStorage(); // Add this line to update storage when "Enter" is pressed
    }
});
