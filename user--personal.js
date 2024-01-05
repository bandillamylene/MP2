// Wait for the DOM content to load before executing the code
document.addEventListener('DOMContentLoaded', function () {
    // Selecting elements from the DOM
    var editBtn = document.getElementById('editBtn');
    var saveBtn = document.getElementById('saveBtn');
    var formFields = document.querySelectorAll('.edited-field');
    var errorMessages = document.querySelectorAll('.form__input--error-message');
    var focusedField = null;

    // Load saved data from local storage on page load
    var loggedInUser = sessionStorage.getItem('username');
    var userDataKey = 'userData_' + loggedInUser;

    var savedData = localStorage.getItem(userDataKey);
    if (savedData) {
        // Parse and populate form fields with saved data
        savedData = JSON.parse(savedData);
        formFields.forEach(function (field) {
            if (savedData[field.id]) {
                field.value = savedData[field.id];
            }
        });
    }

    // Add click event listener to the edit button
    editBtn.addEventListener('click', function () {
        // Enable form fields for editing
        toggleFormFields(true);
    });

    // Add click event listener to the save button
    saveBtn.addEventListener('click', function () {
        // Validate form data and save if valid
        var isValid = validateForm();

        if (isValid) {
            saveFormData(loggedInUser);
            // Disable form fields after saving
            toggleFormFields(false);
        }
    });

    // Add focus event listener to form fields
    formFields.forEach(function (field, index) {
        field.addEventListener('focus', function () {
            // Store the focused field for error handling
            focusedField = field;
            // Remove the error class and error message
            this.classList.remove('error');
            errorMessages[index].textContent = '';
        });

        // Add blur event listener to form fields
        field.addEventListener('blur', function () {
            // Reapply the error class and message if the field is empty
            if (this.value.trim() === '') {
                this.classList.add('error');
                errorMessages[index].textContent = '*Please fill in this field.*';
            }
        });

        // Add input event listener to form fields
        field.addEventListener('input', function () {
            // Remove the error class and error message if the field is populated
            if (this.value.trim() !== '') {
                this.classList.remove('error');
                errorMessages[index].textContent = '';
            }
        });
    });

    // Add click event listener to document
    document.addEventListener('click', function (event) {
        // If the click was outside the focused field, reapply the error
        if (focusedField && !focusedField.contains(event.target)) {
            var index = Array.from(formFields).indexOf(focusedField);
            if (focusedField.value.trim() === '') {
                focusedField.classList.add('error');
                errorMessages[index].textContent = '*Please fill in this field.*';
            }
            focusedField = null; // Reset focusedField
        }
    });

    // Function to toggle form fields for editing
    function toggleFormFields(isEditing) {
        formFields.forEach(function (field, index) {
            field.disabled = !isEditing;
            errorMessages[index].style.display = 'none';
            // Remove the error class and error message
            field.classList.remove('error');
            errorMessages[index].textContent = '';
        });
        // Show or hide the save button based on the editing state
        saveBtn.style.display = isEditing ? 'block' : 'none';
    }

    // Function to validate the form data
    function validateForm() {
        var isValid = true;

        errorMessages.forEach(function (errorMessage) {
            errorMessage.textContent = '';
        });

        formFields.forEach(function (field, index) {
            if (field.value.trim() === '') {
                errorMessages[index].textContent = '*Please fill in this field.*';
                errorMessages[index].style.display = 'block';
                // Add the error class to highlight the field
                field.classList.add('error');
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value.trim())) {
                errorMessages[index].textContent = '*Please enter a valid email address.*';
                errorMessages[index].style.display = 'block';
                // Add the error class to highlight the field
                field.classList.add('error');
                isValid = false;
            }
        });

        return isValid;
    }

    // Function to check if the provided email is in a valid format
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to save form data to local storage
    function saveFormData(user) {
        var formData = {};

        formFields.forEach(function (field) {
            formData[field.id] = field.value;
        });

        // Store the data in local storage associated with the logged-in user
        var userDataKey = 'userData_' + user;
        localStorage.setItem(userDataKey, JSON.stringify(formData));

        // Alert user about successful form save
        alert('Personal Information iupdated successfully!');
    }
});



