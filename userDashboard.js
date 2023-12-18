document.addEventListener("DOMContentLoaded", function () {
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

    // Event listeners for dashboard links
    var savedItemsLink = document.getElementById("savedItemsLink");
    if (savedItemsLink) {
        savedItemsLink.addEventListener("click", function (event) {
            hideAllExcept("mysaveditems");
        });
    }

    var settingsLink = document.getElementById("settingsLink");
    if (settingsLink) {
        settingsLink.addEventListener("click", function (event) {
            hideAllExcept("mysettings");
        });
    }

    var loanTrackerLink = document.getElementById("loanTrackerLink");
    if (loanTrackerLink) {
        loanTrackerLink.addEventListener("click", function (event) {
            hideAllExcept("myloans");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var dashboardItems = document.getElementById("dashboardItems");
    var dashboardToggle = document.getElementById("dashboardToggle");

    dashboardToggle.addEventListener("click", function () {
        if (dashboardItems.style.display === "none") {
            dashboardItems.style.display = "block";
        } else {
            dashboardItems.style.display = "none";
        }
    });
});

