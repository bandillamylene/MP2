document.addEventListener('DOMContentLoaded', function () {
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
        savedData = JSON.parse(savedData);
        formFields.forEach(function (field) {
            if (savedData[field.id]) {
                field.value = savedData[field.id];
            }
        });
    }

    // Add click event listener to the edit button
    editBtn.addEventListener('click', function () {
        toggleFormFields(true);
    });

    // Add click event listener to the save button
    saveBtn.addEventListener('click', function () {
        var isValid = validateForm();

        if (isValid) {
            saveFormData(loggedInUser);
            toggleFormFields(false);
        }
    });

    // Add focus event listener to form fields
    formFields.forEach(function (field, index) {
        field.addEventListener('focus', function () {
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

    function toggleFormFields(isEditing) {
        formFields.forEach(function (field, index) {
            field.disabled = !isEditing;
            errorMessages[index].style.display = 'none';
            // Remove the error class and error message
            field.classList.remove('error');
            errorMessages[index].textContent = '';
        });
        saveBtn.style.display = isEditing ? 'block' : 'none';
    }

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

    function isValidEmail(email) {
        // Use a regular expression to check for a valid email format
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function saveFormData(user) {
        var formData = {};

        formFields.forEach(function (field) {
            formData[field.id] = field.value;
        });

        // Store the data in local storage associated with the logged-in user
        var userDataKey = 'userData_' + user;
        localStorage.setItem(userDataKey, JSON.stringify(formData));

        alert('Form saved successfully!');
    }
});


