document.addEventListener("DOMContentLoaded", function () {
    var dashboardProfile = document.getElementById("dashboardProfile");
    var dashboardLoan = document.getElementById("dashboardLoan");
    var dashboardSaved = document.getElementById("dashboardSaved");
    var dashboardLogout = document.getElementById("dashboardLogout");
    var editBtn = document.getElementById("editBtn");
    var saveBtn = document.getElementById("saveBtn");
    var personalInfoForm = document.getElementById("personalInfoForm");
    var formInputs = personalInfoForm.querySelectorAll("input");

    // Show dashboard section based on ID
    function showDashboardSection(sectionId) {
        var dashboardSections = document.querySelectorAll(".col-md-8");

        dashboardSections.forEach(function (section) {
            section.style.display = "none";
        });

        var selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = "block";
        }
    }

    // Show and hide sections based on dashboard links
    if (dashboardProfile) {
        dashboardProfile.addEventListener("click", function (event) {
            event.preventDefault();
            showDashboardSection("mysettings");
        });
    }

    if (dashboardLoan) {
        dashboardLoan.addEventListener("click", function (event) {
            event.preventDefault();
            showDashboardSection("myloans");
        });
    }

    if (dashboardSaved) {
        dashboardSaved.addEventListener("click", function (event) {
            event.preventDefault();
            showDashboardSection("mysaveditems");
        });
    }

    // Logout functionality
    if (dashboardLogout) {
        dashboardLogout.addEventListener("click", function () {
            logoutUser();
        });
    }

    function logoutUser() {
        // Implement your logout logic here
        // For example:
        // Perform logout actions such as clearing session data, redirecting to login page, etc.
        console.log("User logged out");
    }

    // Enable form inputs for editing
    if (editBtn) {
        editBtn.addEventListener("click", function () {
            formInputs.forEach(function (input) {
                input.removeAttribute("disabled");
            });
            saveBtn.style.display = "block";
        });
    }

    // Save edited form data
    if (saveBtn) {
        saveBtn.addEventListener("click", function () {
            formInputs.forEach(function (input) {
                input.setAttribute("disabled", true);
            });
            saveBtn.style.display = "none";
            // Implement logic to save form data here
            console.log("Form data saved");
        });
    }
});

