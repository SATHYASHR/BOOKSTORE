async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  const message = document.getElementById('message');

  try {
    const res = await fetch(`http://localhost:5000/api/${role}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      message.textContent = data.error || "Login failed";
      return;
    }

    // Redirect based on role
    if (data.role === "admin") {
      window.location.href = "./admin.html";
    } else {
      window.location.href = "./index.html";
    }
  } catch (err) {
    console.error("❌ Error:", err);
    message.textContent = "Server error. Try again later.";
  }
}
