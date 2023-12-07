document.addEventListener("DOMContentLoaded", function () {
    // Function to enable/disable form fields for editing
    function enableFormEditing(enable) {
        var inputs = document.querySelectorAll("#personalInfoForm input");
        inputs.forEach(function (input) {
            input.disabled = !enable;
        });

        var saveBtn = document.getElementById("saveBtn");
        saveBtn.style.display = enable ? "block" : "none";
    }

    // Function to save edited data to session storage
    function saveEditedData() {
        var userData = {};
        var isValid = true;
        var errorMessages = document.querySelectorAll(".form__input--error-message");

        errorMessages.forEach(function (errorMessage) {
            errorMessage.style.display = "none";

            var inputField = errorMessage.nextElementSibling;
            userData[inputField.id] = inputField.value.trim();

            if (inputField.value.trim() === "") {
                errorMessage.style.display = "block";
                isValid = false;
            }
        });

        if (isValid) {
            sessionStorage.setItem("userData", JSON.stringify(userData));
            console.log("Data saved to session storage:", userData);
        } else {
            console.log("Cannot save. Please fill in all required fields.");
        }
    }

    // Function to retrieve saved data from session storage
    function retrieveSavedData() {
        var savedData = sessionStorage.getItem("userData");
        if (savedData) {
            var userData = JSON.parse(savedData);

            Object.keys(userData).forEach(function (key) {
                document.getElementById(key).value = userData[key];
            });
        }
    }

    // Function to handle applying for a loan
    function applyForLoan() {
        // Redirect the user to the loan application page
        window.location.href = "loan_application.html";
    }

    // Event listener for the "Save" button
    var saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click", function () {
        saveEditedData();
        enableFormEditing(false);
    });

    // Event listener for the "Edit" button
    var editBtn = document.getElementById("editBtn");
    editBtn.addEventListener("click", function () {
        enableFormEditing(true);
    });

    // Event listener for the "Apply for a Loan" button
    var applyLoanBtn = document.getElementById("applyLoanBtn");
    applyLoanBtn.addEventListener("click", function () {
        applyForLoan();
    });

    // Show saved data on page load
    enableFormEditing(false);
    retrieveSavedData();

    // Add event listeners for dashboard links
    document.getElementById("savedItemsLink").addEventListener("click", function (event) {
        event.preventDefault();
        showDashboardSection("mysaveditems");
    });

    document.getElementById("loanTrackerLink").addEventListener("click", function (event) {
        event.preventDefault();
        showDashboardSection("myloans");
    });

    document.getElementById("settingsLink").addEventListener("click", function (event) {
        event.preventDefault();
        showDashboardSection("mysettings");
    });

    // Function to display specific dashboard section
    function showDashboardSection(sectionId) {
        var dashboardSections = document.querySelectorAll(".col-md-8");

        dashboardSections.forEach(function (section) {
            if (section.id === sectionId) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        });
    }
});
