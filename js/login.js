const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch(
      "https://role-based-access-control-jovj.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      messageBox.textContent = data.message || "Login failed";
      return;
    }

    // Save user info (token/role) to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", data.username);

    messageBox.style.color = "green";
    messageBox.textContent = "Login successful! Redirecting...";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  } catch (error) {
    messageBox.textContent = "Something went wrong. Please try again.";
  }
});
