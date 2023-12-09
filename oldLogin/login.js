document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#CreateAccount");

    let storedUsers = [];
    let isWarningsDisplayed = false;

    // Function to display messages in the form
    function setFormMessage(formElement, type, message) {
        const messageElement = formElement.querySelector(".form__message");
        messageElement.textContent = message;
        messageElement.classList.remove("form__message--success", "form__message--error");
        messageElement.classList.add(`form__message--${type}`);
    }

    // Function to create a user and store their details
    function createUser(username, email, password) {
        const newUser = {
            username: username,
            email: email,
            password: password
        };
        storedUsers.push(newUser);
    }

    // Function to display warnings for form fields
    function displayFieldWarning(inputElement, message) {
        const warningElement = document.createElement('div');
        warningElement.classList.add('field-warning');
        warningElement.textContent = message;
        inputElement.parentNode.insertBefore(warningElement, inputElement.nextSibling);
    }

    // Function to remove warnings for form fields
    function removeFieldWarning(inputElement) {
        const warningElement = inputElement.parentNode.querySelector('.field-warning');
        if (warningElement) {
            warningElement.remove();
        }
    }

    // Function to validate email format
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Admin credentials
    const adminCredentials = {
        username: 'admin',
        password: '12345'
    };

    // Event listener for login form submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const usernameInput = document.querySelector('#username').value;
        const passwordInput = document.querySelector('#password').value;

        const foundUser = storedUsers.find(user => user.username === usernameInput && user.password === passwordInput);

        const isAdmin = usernameInput === adminCredentials.username && passwordInput === adminCredentials.password;

        if (foundUser || isAdmin) {
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("username", usernameInput);

            if (isAdmin) {
                sessionStorage.setItem("userRole", "admin");
                window.location.href = "admindashboard.html";
            } else {
                sessionStorage.setItem("userRole", "user");
                window.location.href = "user_dashboard.html";
            }
        } else {
            setFormMessage(loginForm, "error", "Invalid username/password combination");
        }
    });

    // Event listener for create account form submission
    createAccountForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newUsername = document.querySelector('#signUpUsername');
        const newEmail = document.querySelector('#signUpEmail');
        const newPassword = document.querySelector('#SignUpPassword');
        const confirmPassword = document.querySelector('#confirmPassword');

        if (isWarningsDisplayed) {
            const warnings = createAccountForm.querySelectorAll('.field-warning');
            warnings.forEach(warning => warning.remove());
            isWarningsDisplayed = false;
        }

        let hasWarnings = false;

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

        if (!hasWarnings) {
            createUser(newUsername.value, newEmail.value, newPassword.value);
            createAccountForm.reset();
            loginForm.classList.remove("form--hidden");
            createAccountForm.classList.add("form--hidden");
            setFormMessage(loginForm, "success", "Account created successfully. Please log in.");
        } else {
            isWarningsDisplayed = true;
        }
    });

    // Event listener for switching to create account form
    const signUpLink = document.querySelector("#linkCreateAccount");
    signUpLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    // Event listener for switching to login form
    const loginLink = document.querySelector("#linkLogin");
    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    // Back button functionality
    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", function(event) {
        event.preventDefault();
        window.history.back();
    });

    // Function to prevent going back after logout
    function preventBackAfterLogout() {
        if (sessionStorage.getItem("loggedIn") === "true") {
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };
        }
    }

    // Function to log out the user
    function logoutUser() {
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("userRole");
        preventBackAfterLogout();
        window.history.back(); // Redirect to previous page after logout
    }

    // Event listener for logout button
    const logoutButton = document.querySelector("#logoutButton");
    logoutButton.addEventListener('click', () => {
        logoutUser();
    });

    preventBackAfterLogout(); // Call preventBackAfterLogout function initially
});
