
document.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.getElementById("main");
    const notesArr = JSON.parse(localStorage.getItem("notes")) || []
    const addNoteContainer = document.getElementById("notesAdd")
    const noteInput = document.getElementById("note-input")
    const noteAddBtn = document.getElementById("add-notes-btn")
    let posX,posY
    renderNotes()

    mainContainer.addEventListener("dblclick", (e) => {
        console.log(e)
        addNoteContainer.classList.add("flex")
        addNoteContainer.classList.remove("hidden")
        posX = e.x
        posY = e.y

    })
    noteAddBtn.addEventListener("click", () => addNotes(posX, posY))


    function renderNotes() {
        mainContainer.innerHTML = ""
        notesArr.forEach((note, index) => {
            const divNotes = document.createElement("div")
            const removeBtn = document.createElement("button")
            divNotes.classList.add("w-[250px]", "h-[150px]", "bg-blue-100", 'text-black', 'flex', 'items-center', "justify-center", "absolute", "text-2xl", "rounded-lg", "shadow-lg", "text-center")
            removeBtn.classList.add("absolute", "top-0", "right-0", "bg-red-500", "rounded-full", "w-5", "h-5", "text-white", "flex", "items-center", "justify-center", "text-lg")
            removeBtn.innerHTML = "X"
            removeBtn.id = index
            divNotes.textContent = note.note
            divNotes.style.left = `${note.x}px`
            divNotes.style.top = `${note.y}px`
            divNotes.appendChild(removeBtn)
            mainContainer.appendChild(divNotes)
            removeBtn.addEventListener("click", removeBtnFunc)
        })
    }

    function removeBtnFunc() {
        notesArr.splice(this.id, 1)
        localStorage.setItem("notes", JSON.stringify(notesArr))
        renderNotes()
    }

    function addNotes(x, y) {
        let noteValue = noteInput.value

        if (!noteValue) {
            addNoteContainer.classList.remove("flex")
            addNoteContainer.classList.add("hidden")
            return
        }

        const noteObj = {
            x: x,
            y: y,
            note: noteValue
        }

        notesArr.push(noteObj)
        localStorage.setItem("notes", JSON.stringify(notesArr))


        addNoteContainer.classList.remove("flex")
        addNoteContainer.classList.add("hidden")

        noteInput.value = ""
        renderNotes()
    }


    if (screen.width<= 700) {
    
        mainContainer.innerHTML = `<h1 class=" selection:bg-none  text-3xl ">Not Available For Phone</h1>`
    }
})

