// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Get references to the edit and save buttons in the DOM
    var editBtn = document.getElementById("editBtn");
    var saveBtn = document.getElementById("saveBtn");

    // Check if the edit button exists
    if (editBtn) {
        // Add a click event listener to the edit button
        editBtn.addEventListener("click", function () {
            // Enable form editing and add a 'clicked' class to the edit button
            enableFormEditing(true);
            editBtn.classList.add("clicked");
        });
    }

    // Check if the save button exists
    if (saveBtn) {
        // Add a click event listener to the save button
        saveBtn.addEventListener("click", function () {
            // Remove the 'clicked' class from the edit button
            var editBtn = document.getElementById("editBtn");
            editBtn.classList.remove("clicked");

            // Save the edited data
            saveEditedData();
        });
    }
});

