// dashboard.js

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

function loadDashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in first.");
    window.location.href = "login.html";
    return;
  }

  // Set Authorization header
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Call admin endpoint
  fetch("https://role-based-access-control-jovj.onrender.com/api/users/admin", {
    headers,
  }).then((res) => {
    if (res.ok) {
      document.getElementById("welcome-text").textContent = "Welcome admin";
      document.getElementById("admin-panel").style.display = "block";
    }
  });

  // Call manager endpoint
  fetch(
    "https://role-based-access-control-jovj.onrender.com/api/users/manager",
    { headers }
  ).then((res) => {
    if (res.ok) {
      // Only set if not already set by admin
      const welcome = document.getElementById("welcome-text");
      if (!welcome.textContent.includes("admin")) {
        welcome.textContent = "Welcome manager";
      }
      document.getElementById("manager-panel").style.display = "block";
    }
  });

  // Call user endpoint
  fetch("https://role-based-access-control-jovj.onrender.com/api/users/user", {
    headers,
  })
    .then((res) => {
      if (res.ok) {
        const welcome = document.getElementById("welcome-text");
        if (
          !welcome.textContent.includes("admin") &&
          !welcome.textContent.includes("manager")
        ) {
          welcome.textContent = "Welcome user";
        }
        document.getElementById("user-panel").style.display = "block";
      }
    })
    .catch((err) => {
      console.error("Error verifying role:", err);
      alert("Session expired or unauthorized.");
      logout();
    });
}

window.onload = loadDashboard;
