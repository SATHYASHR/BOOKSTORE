const form = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
const adminPanel = document.getElementById("adminPanel");
const toggleAdmin = document.getElementById("toggleAdmin");

let isAdmin = false;

// Toggle admin panel visibility
toggleAdmin.addEventListener("click", () => {
  isAdmin = !isAdmin;
  adminPanel.style.display = isAdmin ? "block" : "none";
  toggleAdmin.textContent = isAdmin ? "🚪 Logout Admin" : "🔐 Admin Login";
});

// Load books on startup
window.addEventListener("DOMContentLoaded", loadBooks);

// Submit new book
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  const res = await fetch("http://localhost:5000/api/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, price, description }),
  });

  const data = await res.json();
  alert(data.message);
  form.reset();
  loadBooks();
});

// Load all books
async function loadBooks() {
  const res = await fetch("http://localhost:5000/api/books");
  const books = await res.json();

  bookList.innerHTML = "";
  books.forEach((book) => {
    const div = document.createElement("div");
    div.className = "book-card";
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p><b>Author:</b> ${book.author}</p>
      <p><b>Price:</b> ₹${book.price}</p>
      <p>${book.description}</p>
      ${isAdmin ? `<button class="btn delete-btn" onclick="deleteBook('${book._id}')">Delete</button>` : ""}
    `;
    bookList.appendChild(div);
  });
}

// Delete a book (admin only)
async function deleteBook(id) {
  if (!isAdmin) return alert("Admin only!");
  await fetch(`http://localhost:5000/api/books/${id}`, { method: "DELETE" });
  alert("Book deleted!");
  loadBooks();
}


