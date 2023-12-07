document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    let storedUsers = []; // Array to hold user objects

    // Function to create a user object and add it to storedUsers array
    function createUser(username, password) {
        const newUser = {
            username: username,
            password: password
        };
        storedUsers.push(newUser);
    }

    // Function to set form message
    function setFormMessage(formElement, type, message) {
        const messageElement = formElement.querySelector(".form__message");
        messageElement.textContent = message;
        messageElement.classList.remove("form__message--success", "form__message--error");
        messageElement.classList.add(`form__message--${type}`);
    }

    // Function to toggle password visibility
    function togglePasswordVisibility(passwordFieldId) {
        const passwordField = document.getElementById(passwordFieldId);

        if (passwordField.type === 'password') {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    }

    // Event listener for login form submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const usernameInput = document.querySelector('#username').value;
        const passwordInput = document.querySelector('#password').value;

        const foundUser = storedUsers.find(user => user.username === usernameInput && user.password === passwordInput);

        if (foundUser) {
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("username", usernameInput);

            // Additional logic or redirection if needed
        } else {
            setFormMessage(loginForm, "error", "Invalid username/password combination");
        }
    });

    // Event listener for create account form submission
    const createAccountForm = document.querySelector("#CreateAccount");
    createAccountForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newUsername = document.querySelector('#signUpUsername').value;
        const newPassword = document.querySelector('#SignUpPassword').value;

        createUser(newUsername, newPassword);

        createAccountForm.reset();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        setFormMessage(loginForm, "success", "Account created successfully. Please log in.");
    });

    // Event listener for switching to create account form
    document.querySelector("#linkCreateAccount").addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    // Event listener for switching to login form
    document.querySelector("#linkLogin").addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    // Event listener for toggling password visibility in login form
    document.querySelector('#toggleLoginPassword').addEventListener('click', () => {
        togglePasswordVisibility('password');
    });

    // Event listener for toggling password visibility in create account form
    document.querySelector('#toggleSignupPassword').addEventListener('click', () => {
        togglePasswordVisibility('SignUpPassword');
    });
});
