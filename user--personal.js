document.addEventListener('DOMContentLoaded', function () {
    var editBtn = document.getElementById('editBtn');
    var saveBtn = document.getElementById('saveBtn');
    var formFields = document.querySelectorAll('.edited-field');
    var errorMessages = document.querySelectorAll('.form__input--error-message');

    // Add click event listener to the edit button
    editBtn.addEventListener('click', function () {
        toggleFormFields(true);
    });

    // Add click event listener to the save button
    saveBtn.addEventListener('click', function () {
        var isValid = validateForm();

        if (isValid) {
            saveFormData();
            toggleFormFields(false);
        }
    });

    function toggleFormFields(isEditing) {
        formFields.forEach(function (field, index) {
            field.disabled = !isEditing;
            errorMessages[index].style.display = 'none';
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
                isValid = false;
            }
        });

        return isValid;
    }

    function saveFormData() {
        var formData = {};

        formFields.forEach(function (field) {
            formData[field.id] = field.value;
        });

        // Store the data in local storage
        localStorage.setItem('userData', JSON.stringify(formData));

        alert('Form saved successfully!');
    }

    // Load saved data from local storage on page load
    var savedData = localStorage.getItem('userData');
    if (savedData) {
        savedData = JSON.parse(savedData);
        formFields.forEach(function (field) {
            if (savedData[field.id]) {
                field.value = savedData[field.id];
            }
        });
    }
});

