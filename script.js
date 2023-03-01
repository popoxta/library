class Book {
    constructor(name, author, pages, status) {
        this.name = name
        this.author = author
        this.pages = pages
        this.status = status
    }
}

let booksArray = JSON.parse(localStorage.getItem("booksArray"))
if (booksArray === null){
    booksArray = []

    const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", "295", false)
    booksArray.push(theHobbit)

    const praiseOfFolly = new Book("In Praise of Folly", "Desiderius Erasmus", "256", false)
    booksArray.push(praiseOfFolly)

    const theArtOfWar = new Book("The Art of War", "Sun Tzu", "260", false)
    booksArray.push(theArtOfWar)

    const nineteenEightyFour = new Book("1984", "George Orwell", "328", false)
    booksArray.push(nineteenEightyFour)
}

function updateLocalStorage(){
    localStorage.setItem("booksArray", JSON.stringify(booksArray))
}

function drawLibrary() {
    updateLocalStorage()

    const books = document.querySelectorAll(".book")
    const library = document.querySelector(".library")

    for (let book of books) {
        library.removeChild(book)
    }

    for (let book of booksArray) {
        console.log(book)

        const container = document.createElement("div")
        container.className = "book shadow"

        const deleteBtn = document.createElement("button")
        deleteBtn.className = "delete"

        deleteBtn.addEventListener("click", () => {

            if (confirm("Are you sure you would like to delete this book?")) {

                booksArray.splice(booksArray.indexOf(book), 1)
                console.log(`Deleted ${book.name}`)
                drawLibrary()
            }

        })

        const title = document.createElement("h2")
        title.textContent = book.name

        const theHr = document.createElement("hr")

        const author = document.createElement("h3")
        author.textContent = `By ${book.author}`

        const pages = document.createElement("h3")
        pages.textContent = `${book.pages} pages`

        const readBtn = document.createElement("button")

        container.append(deleteBtn, title, theHr, author, pages, readBtn)

        updateStatus(readBtn, book.status)
        readBtn.addEventListener("click", (e) => {

            book.status = !book.status
            updateStatus(e.target, book.status)
            updateLocalStorage()

        })

        library.append(container)
    }

}

function updateStatus(readBtn, val) {
    readBtn.className = val ? "read" : "not-read"
}

const openAddBookForm = document.querySelector(".add-item")
const closeBookForm = document.querySelector(".close-form")
const addBookForm = document.querySelector(".book-form")

openAddBookForm.addEventListener("click", () => {

    if (addBookForm.classList.contains("hidden")) {
        addBookForm.classList.replace("hidden", "show")

    } else {
        addBookForm.classList.replace("show", "hidden")
    }
})

closeBookForm.addEventListener("click", () => {
    addBookForm.classList.replace("show", "hidden")
    addBookForm.reset()
})

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const newBook = new Book(
        formData.get("title"),
        formData.get("author"),
        formData.get("pages"),
        formData.get("read") === "on",
    )
    booksArray.push(newBook)

    addBookForm.classList.replace("show", "hidden")
    e.target.reset()

    drawLibrary()

})

drawLibrary()
