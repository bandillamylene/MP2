document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector("#loginButton");

    function redirectToLoginPage() {
        window.location.href = "login.html";
    }

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            redirectToLoginPage();
        });
    }
});
