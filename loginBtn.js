// Wait for the DOM content to load before executing the code
document.addEventListener("DOMContentLoaded", () => {
    // Select the login button element
    const loginButton = document.querySelector("#loginButton");

    // Function to redirect to the login page
    function redirectToLoginPage() {
        window.location.href = "login.html";
    }

    // Check if the login button element exists
    if (loginButton) {
        //click event listener to the login button
        loginButton.addEventListener('click', () => {
            // Call the function to redirect to the login page
            redirectToLoginPage();
        });
    }
});
