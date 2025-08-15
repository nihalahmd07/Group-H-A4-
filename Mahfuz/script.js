document.addEventListener("DOMContentLoaded", () => {
  console.log("British Cuisine page loaded.");

  // Theme toggle (works if you add a button with id="themeToggle")
  const toggleButton = document.getElementById("themeToggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("darkmode");
      const isDark = document.body.classList.contains("darkmode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // Apply saved theme on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("darkmode");
  }

  // Example feature placeholder
  document.querySelectorAll(".product-info button").forEach(button => {
    button.addEventListener("click", () => {
      alert("This feature is coming soon!");
    });
  });
});
