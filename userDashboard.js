document.addEventListener("DOMContentLoaded", function () {
    // Code for handling form validation, enabling editing, and saving data

    // Add event listener to the "Edit" button to enable form fields for editing
    var editBtn = document.getElementById("editBtn");
    editBtn.addEventListener("click", function () {
        enableFormEditing(true);
    });

    // Add event listener to the "Save" button to save the edited data
    var saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click", function () {
        saveEditedData();
        enableFormEditing(false);
    });

    // Disable form fields initially
    enableFormEditing(false);

    // Function to enable or disable form fields for editing
    function enableFormEditing(enable) {
        var inputs = document.querySelectorAll("#personalInfoForm input");
        inputs.forEach(function (input) {
            input.disabled = !enable;
        });

        // Show or hide the "Save" button based on the editing state
        saveBtn.style.display = enable ? "block" : "none";
    }

    // Function to save the edited data
    function saveEditedData() {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;

        // Perform any necessary data saving or validation logic here
        console.log("Saving data:", { name, email, phone });
    }

    // Code for handling dashboard links and sections

    // Add click event listener to the "Saved Items" link
    document.getElementById("savedItemsLink").addEventListener("click", function (event) {
        event.preventDefault();
        // Hide the "Settings" section and show the "Saved Items" section
        showDashboardSection("mysaveditems");
    });

    // Add click event listener to the "Loan Tracker" link
    document.getElementById("loanTrackerLink").addEventListener("click", function (event) {
        event.preventDefault();
        // Hide the "Settings" section and show the "Loan Tracker" section
        showDashboardSection("myloans");
    });

    // Add click event listener to the "Settings" link
    document.getElementById("settingsLink").addEventListener("click", function (event) {
        event.preventDefault();
        // Show the "Settings" section
        showDashboardSection("mysettings");
    });

    // Function to show the selected dashboard section
    function showDashboardSection(sectionId) {
        // Get all dashboard sections
        var dashboardSections = document.querySelectorAll(".col-md-8");

        // If the selected section is "Settings," show it; otherwise, hide it
        dashboardSections.forEach(function (section) {
            if (section.id === sectionId) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        });
    }
});
