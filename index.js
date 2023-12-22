// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  
  
  // Function to handle scroll events
  function handleScrollAnimation() {
    const elements = document.querySelectorAll('.scroll-animation');
    
    elements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add('active');
      }
    });
  }
  
  // Event listener for scroll
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
  
  // Initial check on page load
  handleScrollAnimation();



  document.addEventListener("DOMContentLoaded", () => {
    const profileName = document.querySelector("#profileName");
    const loginButton = document.querySelector("#loginButton");
    const logoutButton = document.querySelector("#logoutButton");
    const loggedIn = sessionStorage.getItem("loggedIn");
    const username = sessionStorage.getItem("username");
    const userRole = sessionStorage.getItem("userRole");

    if (loggedIn === "true" && username) {
        if (userRole === "admin") {
            profileName.innerHTML = `<a href="admindashboard.html" class="text-white mx-3">Hello Admin</a>`;
        } else {
            profileName.innerHTML = `<a href="user_dashboard.html" class="text-white mx-3">Hello ${username}</a>`;
        }
    }

    if (loggedIn === "true") {
        // User or admin is logged in
        loginButton.classList.add("d-none"); // Hide login button
        logoutButton.classList.remove("d-none"); // Show logout button
    } else {
        // No user or admin logged in
        loginButton.classList.remove("d-none"); // Show login button
        logoutButton.classList.add("d-none"); // Hide logout button
    }

    // Add event listener for logout button
    logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        // Clear sessionStorage
        sessionStorage.clear();
        // Redirect to login page
        window.location.href = "login.html";
    });
});

// Clear session storage
logoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  sessionStorage.clear();
  window.location.href = "login.html";
});