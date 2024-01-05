// Wait for the DOM content to load before executing the code
document.addEventListener("DOMContentLoaded", function () {
    // Selecting elements from the DOM
    var dashboardItems = document.getElementById("dashboardItems");
    var dashboardToggle = document.getElementById("dashboardToggle");
    var dashboardLinks = document.querySelectorAll(".myList3.list-group.dashboard-items li");

    // Initially hide dashboard links
    dashboardItems.style.display = "none";

    // Toggle display of dashboard links when the toggler is clicked
    dashboardToggle.addEventListener("click", function () {
        // Toggle the display property of dashboardItems
        if (dashboardItems.style.display === "none") {
            dashboardItems.style.display = "block";
        } else {
            dashboardItems.style.display = "none";
        }
    });

    // Event listeners for dashboard links
    dashboardLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            // Get the section ID from the clicked link's href attribute
            var sectionId = event.target.getAttribute("href").substring(1);
            // Hide all sections except the clicked one
            hideAllExcept(sectionId);
        });
    });

    // Function to hide all dashboard sections except the given section
    function hideAllExcept(sectionId) {
        var dashboardSections = document.querySelectorAll(".col");
        dashboardSections.forEach(function (section) {
            if (section.id !== sectionId) {
                section.style.display = "none";
            } else {
                section.style.display = "block";
            }
        });
    }

    // Initially show the Settings section
    hideAllExcept("mysettings");
});

// user_dashboard.js preventing going back when logged out
document.addEventListener("DOMContentLoaded", () => {
    // Check if the user is logged in
    const loggedIn = sessionStorage.getItem("loggedIn");

    // Redirect to login page if not logged in
    if (loggedIn !== "true") {
        window.location.href = "login.html";
    }
});
