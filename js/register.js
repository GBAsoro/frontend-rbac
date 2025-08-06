const registerForm = document.getElementById("registerForm");
const messageBox = document.getElementById("message");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  try {
    const res = await fetch(
      "https://role-based-access-control-jovj.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      messageBox.textContent = data.message || "Registration failed";
      return;
    }

    // Success
    messageBox.style.color = "green";
    messageBox.textContent = "Registration successful! Redirecting...";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  } catch (error) {
    messageBox.textContent = "Something went wrong. Please try again.";
  }
});
