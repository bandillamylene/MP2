// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Get references to various elements in the DOM
    var applyLoanBtn = document.getElementById('applyLoanBtn');
    var noLoansMessage = document.getElementById('noLoansMessage');
    var applyLoanContainer = document.getElementById('applyLoanContainer');
    var loanTrackerLink = document.getElementById('loanTrackerLink');

    // Function to check if there are existing loans
    function checkExistingLoans() {
        var existingLoans = false; 
        return existingLoans;
    }

    // Check if the loanTrackerLink exists before adding an event listener
    if (loanTrackerLink) {
        // Event listener for clicking the loanTrackerLink
        loanTrackerLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior

            // Check if there are existing loans
            var existingLoans = checkExistingLoans();

            // Display pending loan status or no loans message based on the result
            if (existingLoans) {
                displayPendingLoanStatus();
            } else {
                displayNoLoansMessage();
            }
        });
    }

    // Function to display pending loan status
    function displayPendingLoanStatus() {
        applyLoanContainer.style.display = 'none'; // Hide the no loans container
    }

    // Function to display no loans message
    function displayNoLoansMessage() {
        noLoansMessage.style.display = 'block'; // Show the no loans message
        applyLoanContainer.style.display = 'block'; // Show the no loans container

        // Event listener for clicking the applyLoanBtn
        applyLoanBtn.addEventListener('click', function () {
            // Confirmation message before redirecting
            var isConfirmed = window.confirm("Please select a product before you can proceed to the next step. Press OK to proceed.");

            // Redirect to Honda page if confirmed
            if (isConfirmed) {
                window.location.href = 'honda.html'; // Redirect to Honda page
            }
        });
    }
});

