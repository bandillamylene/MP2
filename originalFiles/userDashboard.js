document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is logged in; if not, redirect to login page
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
        window.location.href = "login.html";
    }

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

            var inputField = errorMessage.nextElementSibling; // target input fields
            userData[inputField.id] = inputField.value.trim();

            if (inputField.value.trim() === "") {
                errorMessage.style.display = "block";
                isValid = false;
            }
        });

        if (isValid) {
            sessionStorage.setItem("userData", JSON.stringify(userData));
            console.log("Data saved to session storage:", userData);
            enableFormEditing(false); // Disabling editing mode upon successful save
            document.getElementById("saveBtn").style.display = "none"; // Hide the save button
        } else {
            console.log("Cannot save. Please fill in all required fields.");
            // Displaying error messages for required fields
            // The error messages are already provided in the HTML
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
        // Retrieve data from the admin dashboard (in this case, from sessionStorage)
        let hasLoan = sessionStorage.getItem("hasLoan") === "true";

        if (!hasLoan) {
            // If the user has no existing loan, proceed to apply for a new loan
            window.location.href = "loan_application.html";
        } else {
            // If the user has an existing loan, display the loan information
            const loanTracker = document.getElementById("myloans");
            if (loanTracker) {
                loanTracker.style.display = "block";
                // Logic to display existing loan or loan application data
                console.log('Display existing loan or loan application data');
            }
        }
    }


    // Function to handle logout
    function logoutUser() {
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("loggedIn");
        window.location.href = "login.html";
    }

    // Function to display specific dashboard section
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

    // Event listeners for dashboard links and logout
    var dashboardLinks = {
        savedItemsLink: "mysaveditems",
        loanTrackerLink: "myloans",
        settingsLink: "mysettings"
    };

    Object.keys(dashboardLinks).forEach(function (linkId) {
        var linkElement = document.getElementById(linkId);
        if (linkElement) {
            linkElement.addEventListener("click", function (event) {
                event.preventDefault();
                showDashboardSection(dashboardLinks[linkId]);
            });
        }
    });

    var logoutBtns = document.querySelectorAll("#logoutBtn");
    logoutBtns.forEach(function (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            logoutUser();
        });
    });

    // Event listener for the login form
    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var emailInput = document.getElementById("emailInput").value;
            var passwordInput = document.getElementById("passwordInput").value;
            loginUser(emailInput, passwordInput);
        });
    }

    // Event listener for the "Save" button
    var saveBtn = document.getElementById("saveBtn");
    if (saveBtn) {
        saveBtn.addEventListener("click", function () {
            saveEditedData();
        });
    }

    // Event listener for the "Edit" button
    var editBtn = document.getElementById("editBtn");
    if (editBtn) {
        editBtn.addEventListener("click", function () {
            enableFormEditing(true);
        });
    }

    // Event listener for the "Apply for a Loan" button
    var applyLoanBtn = document.getElementById("applyLoanBtn");
    if (applyLoanBtn) {
        applyLoanBtn.addEventListener("click", function () {
            applyForLoan();
        });
    }

    // Event listener for the "Track Loan" button
    var trackLoanBtn = document.getElementById("trackLoanBtn");
    if (trackLoanBtn) {
        trackLoanBtn.addEventListener("click", function () {
            applyForLoan();
        });
    }


    // Retrieve saved data when the DOM is loaded
    retrieveSavedData();
});