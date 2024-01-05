// Wait for the DOM content to load before executing the code
document.addEventListener("DOMContentLoaded", () => {

    // Selecting the login and create account forms
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#CreateAccount");

    let isWarningsDisplayed = false; // Variable to track if warnings are displayed



    // Function to display messages in the form
    function setFormMessage(formElement, type, message) {

        // Select the message element in the form, update its content and classes
        const messageElement = formElement.querySelector(".form__message");
        messageElement.textContent = message;
        messageElement.classList.remove("form__message--success", "form__message--error");
        messageElement.classList.add(`form__message--${type}`);
    }



    // Function to create a user and store their details in admin section
    function createUser(username, email, password) {

        // Create a new user object and store it in local storage
        const newUser = {
            username: username,
            email: email,
            role: "User",
            password: password
        };

        let adminUsers = JSON.parse(localStorage.getItem("adminUsers")) || [];
        adminUsers.push(newUser);
        localStorage.setItem("adminUsers", JSON.stringify(adminUsers));
}



    // Function to display warnings for form fields
    function displayFieldWarning(inputElement, message) {
        // Create a warning element, add a message, and insert it before the input
        const warningElement = document.createElement('div');
        warningElement.classList.add('field-warning');
        warningElement.textContent = message;
        inputElement.parentNode.insertBefore(warningElement, inputElement.nextSibling);
    }



    // Function to validate email format
    function isValidEmail(email) {

        // Regular expression to validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

   


    // Function to validate user login credentials against admin users
    function validateCredentials(input, passwordInput) {

        // Retrieve admin users from local storage and check if input matches any user
        const adminUsers = JSON.parse(localStorage.getItem("adminUsers")) || [];
        const user = adminUsers.find(
            (user) => (user.username === input || user.email === input) && user.password === passwordInput
        );
        return user;
    }

    // Event listener for login form submission
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();// Prevent default form submission behavior

            // Get input values
            const usernameInput = document.querySelector('#username').value;
            const emailInput = document.querySelector('#signUpEmail').value; 
            const passwordInput = document.querySelector('#password').value;

            // Validate user credentials and redirect based on user/admin status
            const user = validateCredentials(usernameInput || emailInput, passwordInput);
            const isAdmin = usernameInput === 'admin' && passwordInput === '12345';

            // Handle successful login or display error message
            if (user || isAdmin) {

                 // Set session and local storage values for the logged-in user
                sessionStorage.setItem("loggedIn", "true");
                sessionStorage.setItem("username", usernameInput);

                // Redirect to appropriate dashboard based on user role
                if (isAdmin) {
                    localStorage.setItem("administrator", "admin");
                    sessionStorage.setItem("userRole", "admin");
                    window.location.href = "admindashboard.html";
                } else {
                    sessionStorage.setItem("userRole", "user");
                    window.location.href = "user_dashboard.html";
                }
            } else {
                 // Display error message for invalid login attempt
                setFormMessage(loginForm, "error", "Please enter a valid Username/Email and Password combination.");
            }
        });
    }





    // Event listener for create account form submission

    if(createAccountForm){

        createAccountForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent default form submission behavior
    
            // Get input values for creating a new account
            const newUsername = document.querySelector('#signUpUsername');
            const newEmail = document.querySelector('#signUpEmail');
            const newPassword = document.querySelector('#SignUpPassword');
            const confirmPassword = document.querySelector('#confirmPassword');
    
            // Clear any displayed warnings
            if (isWarningsDisplayed) {
                const warnings = createAccountForm.querySelectorAll('.field-warning');
                warnings.forEach(warning => warning.remove());
                isWarningsDisplayed = false;
            }
    
            let hasWarnings = false;
    
            // Validate form input fields for creating a new account
            // Display warnings if validation fails
            if (newUsername.value.trim() === '') {
                displayFieldWarning(newUsername, "Please enter a username");
                hasWarnings = true;
            }
    
            if (newEmail.value.trim() === '') {
                displayFieldWarning(newEmail, "Please enter an email");
                hasWarnings = true;
            } else if (!isValidEmail(newEmail.value.trim())) {
                displayFieldWarning(newEmail, "Please enter a valid email");
                hasWarnings = true;
            }
    
            const passwordValue = newPassword.value.trim();
            const hasCapitalLetter = /[A-Z]/.test(passwordValue);
            const hasNumber = /[0-9]/.test(passwordValue);
            const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(passwordValue);
    
            if (passwordValue === '') {
                displayFieldWarning(newPassword, "Please enter a password");
                hasWarnings = true;
            } else if (passwordValue.length < 8) {
                displayFieldWarning(newPassword, "Password must be at least 8 characters");
                hasWarnings = true;
            } else if (!hasCapitalLetter || !hasNumber || !hasSpecialChar) {
                displayFieldWarning(newPassword, "Password must contain at least one capital letter, one number, and one special character");
                hasWarnings = true;
            }
    
            if (confirmPassword.value.trim() === '') {
                displayFieldWarning(confirmPassword, "Please confirm your password");
                hasWarnings = true;
            } else if (confirmPassword.value.trim() !== newPassword.value.trim()) {
                displayFieldWarning(confirmPassword, "Passwords do not match");
                hasWarnings = true;
            }
    
            // If no validation warnings, create the user, reset form, and show success message
            if (!hasWarnings) {
                createUser(newUsername.value, newEmail.value, newPassword.value);
                createAccountForm.reset();
                loginForm.classList.remove("form--hidden");
                createAccountForm.classList.add("form--hidden");
                setFormMessage(loginForm, "success", "Account created successfully! Please log in.");
            } else {
                isWarningsDisplayed = true;
            }
        });
    

    }





    // Event listener for switching to create account form
    const signUpLink = document.querySelector("#linkCreateAccount");

    if(signUpLink){

        signUpLink.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Show create account form and hide login form
            loginForm.classList.add("form--hidden");
            createAccountForm.classList.remove("form--hidden");
        });
    
        // Event listener for switching to login form
        const loginLink = document.querySelector("#linkLogin");
        loginLink.addEventListener("click", (e) => {
            e.preventDefault();

            // Show login form and hide create account form
            loginForm.classList.remove("form--hidden");
            createAccountForm.classList.add("form--hidden");
        });
    
        // Function to prevent going back after logout
        function preventBackAfterLogout() {
            // Prevent going back in history if logged in
            if (sessionStorage.getItem("loggedIn") === "true") {
                history.pushState(null, null, location.href);
                window.onpopstate = function () {
                    history.go(1);
                };
            }
        }
    
    }


    // Function to log out the user
    function logoutUser() {
        
        // Remove session items and prevent going back after logout
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("userRole");
        preventBackAfterLogout();
        window.history.back(); // Redirect to previous page after logout
    }



    // Event listener for logout button
    const logoutButton = document.querySelector("#logoutButton");

    if(logoutButton){

        logoutButton.addEventListener('click', () => {
            logoutUser();
    });

    }

});