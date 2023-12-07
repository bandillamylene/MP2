function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");
  messageElement.textContent = message;
  messageElement.classList.remove("form__message--success", "form__message--error");
  messageElement.classList.add(`form__message--${type}`);
}

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
});