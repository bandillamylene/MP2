document.addEventListener("DOMContentLoaded", function () {
    var dashboardItems = document.getElementById("dashboardItems");
    var dashboardToggle = document.getElementById("dashboardToggle");
    var dashboardLinks = document.querySelectorAll(".myList3.list-group.dashboard-items li");

    // Initially hide dashboard links
    dashboardItems.style.display = "none";

    // Toggle display of dashboard links when the toggler is clicked
    dashboardToggle.addEventListener("click", function () {
        if (dashboardItems.style.display === "none") {
            dashboardItems.style.display = "block";
        } else {
            dashboardItems.style.display = "none";
        }
    });

    // Event listeners for dashboard links
    dashboardLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            var sectionId = event.target.getAttribute("href").substring(1);
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


