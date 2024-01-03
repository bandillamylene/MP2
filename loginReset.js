// Function to unhide the specified form
function toggleFormVisibility(formId) {
    // Hide all forms
    document.querySelectorAll('.form').forEach(function(form) {
        form.classList.add('form--hidden');
    });

    // Show the specified form
    document.getElementById(formId).classList.remove('form--hidden');
}

// Event listener for "Forgot your password?" link
document.getElementById('linkForgotPassword').addEventListener('click', function(event) {
    event.preventDefault();
    toggleFormVisibility('forgotPassword');
});

// Event listener for "Don't have an account? Sign Up" link
document.getElementById('linkCreateAccount').addEventListener('click', function(event) {
    event.preventDefault();
    toggleFormVisibility('CreateAccount');
});

// Event listener for "Already have an account? Login" link in the forgotPassword form
document.getElementById('linkLoginFromForgot').addEventListener('click', function(event) {
    event.preventDefault();
    toggleFormVisibility('login');
});
