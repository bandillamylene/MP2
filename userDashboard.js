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

        var inputField = errorMessage.nextElementSibling; //target input fields
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
        window.location.href = "loan_application.html";
    }

    // Function to handle login
    function loginUser(email, password) {

    }

    // Function to handle logout
    function logoutUser() {
        sessionStorage.removeItem("userData");
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
    var savedItemsLink = document.getElementById("savedItemsLink");
    if (savedItemsLink) {
        savedItemsLink.addEventListener("click", function (event) {
            event.preventDefault();
            showDashboardSection("mysaveditems");
        });
    }

    var loanTrackerLink = document.getElementById("loanTrackerLink");
    if (loanTrackerLink) {
        loanTrackerLink.addEventListener("click", function (event) {
            event.preventDefault();
            showDashboardSection("myloans");
        });
    }

    var settingsLink = document.getElementById("settingsLink");
    if (settingsLink) {
        settingsLink.addEventListener("click", function (event) {
            event.preventDefault();
            showDashboardSection("mysettings");
        });
    }

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

    // Retrieve saved data when the DOM is loaded
    retrieveSavedData();
});


// user_dashboard.js preventing to go back when logged in
document.addEventListener("DOMContentLoaded", () => {
    const loggedIn = sessionStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        window.location.href = "login.html";
    }
    
});