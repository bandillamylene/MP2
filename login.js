function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");
  messageElement.textContent = message;
  messageElement.classList.remove("form__message--success", "form__message--error");
  messageElement.classList.add(`form__message--${type}`);
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usernameInput = document.querySelector('#username').value;
    const passwordInput = document.querySelector('#password').value;

    console.log("Entered Username:", usernameInput);
    console.log("Entered Password:", "*".repeat(passwordInput.length)); // Masked password

    if (usernameInput === "user" && passwordInput === "password") {
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("username", usernameInput);
      window.location.href = "user_dashboard.html";
    } else {
      setFormMessage(loginForm, "error", "Invalid username/password combination");
    }
  });

  document.querySelector("#linkCreateAccount").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("form--hidden");
    document.querySelector("#CreateAccount").classList.remove("form--hidden");
  });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    document.querySelector("#CreateAccount").classList.add("form--hidden");
  });

  const createAccountForm = document.querySelector("#CreateAccount");

  createAccountForm.addEventListener("submit", (e) => {
    e.preventDefault();

    
    // For example, if validation is successful:
    createAccountForm.reset();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
    setFormMessage(loginForm, "success", "Account created successfully. Please log in.");
  });
});
