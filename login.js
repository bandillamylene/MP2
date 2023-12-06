document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#CreateAccount");
    let storedUsers = [];
    let isWarningsDisplayed = false;

    function setFormMessage(formElement, type, message) {
        const messageElement = formElement.querySelector(".form__message");
        messageElement.textContent = message;
        messageElement.classList.remove("form__message--success", "form__message--error");
        messageElement.classList.add(`form__message--${type}`);
    }

    function createUser(username, email, password) {
        const newUser = {
            username: username,
            email: email,
            password: password
        };
        storedUsers.push(newUser);
    }

    function displayFieldWarning(inputElement, message) {
        const warningElement = document.createElement('div');
        warningElement.classList.add('field-warning');
        warningElement.textContent = message;
        inputElement.parentNode.insertBefore(warningElement, inputElement.nextSibling);
    }

    function removeFieldWarning(inputElement) {
        const warningElement = inputElement.parentNode.querySelector('.field-warning');
        if (warningElement) {
            warningElement.remove();
        }
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const usernameInput = document.querySelector('#username').value;
        const passwordInput = document.querySelector('#password').value;

        const foundUser = storedUsers.find(user => user.username === usernameInput && user.password === passwordInput);

        if (foundUser) {
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("username", usernameInput);
            window.location.href = "user_dashboard.html";
        } else {
            setFormMessage(loginForm, "error", "Invalid username/password combination");
        }
    });

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

        if (newPassword.value.trim() === '') {
            displayFieldWarning(newPassword, "Please enter a password");
            hasWarnings = true;
        } else if (newPassword.value.trim().length < 8) {
            displayFieldWarning(newPassword, "Password must be at least 8 characters");
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

    const signUpLink = document.querySelector("#linkCreateAccount");

    signUpLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    const loginLink = document.querySelector("#linkLogin");

    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});

