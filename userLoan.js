document.addEventListener('DOMContentLoaded', function () {
    var applyLoanBtn = document.getElementById('applyLoanBtn');
    var noLoansMessage = document.getElementById('noLoansMessage');
    var applyLoanContainer = document.getElementById('applyLoanContainer');
    var loanTrackerLink = document.getElementById('loanTrackerLink');

    //function to check if there are existing loans
    function checkExistingLoans() {
        var existingLoans = false; 
        return existingLoans;
    }


if(loanTrackerLink){

    loanTrackerLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior

        var existingLoans = checkExistingLoans();

        if (existingLoans) {
            displayPendingLoanStatus();
        } else {
            displayNoLoansMessage();
        }
    });

}

    

    function displayPendingLoanStatus() {
        applyLoanContainer.style.display = 'none'; // Hide the no loans container
    }

    function displayNoLoansMessage() {
        noLoansMessage.style.display = 'block'; // Show the no loans message
        applyLoanContainer.style.display = 'block'; // Show the no loans container
        applyLoanBtn.addEventListener('click', function () {
            //confirmation message before redirecting
            var isConfirmed = window.confirm("Please select a product before you can proceed to the next step. Press OK to proceed.");

            if (isConfirmed) {
                window.location.href = 'honda.html'; // Redirect to Honda page
            }
        });
    }


});
