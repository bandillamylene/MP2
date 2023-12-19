jQuery(document).ready(function (jQuery) {

    // Variable to keep track of editing state
    var isEditing = false;

    // Edit button click event
    jQuery("#editBtn").on("click", function () {
        // Toggle editing state
        isEditing = !isEditing;

        // Enable or disable form fields based on editing state
        jQuery(".edited-field").prop("disabled", !isEditing);

        // Toggle display of Save button
        jQuery("#saveBtn").toggle(isEditing);
    });

    // Save button click event
    jQuery("#saveBtn").on("click", function () {
        // Validate form before saving
        if (validateForm()) {
            // Save form data (you can implement the save logic here)

            // Disable form fields
            jQuery(".edited-field").prop("disabled", true);

            // Toggle display of Save button
            jQuery("#saveBtn").hide();

            // Reset editing state
            isEditing = false;
        }
    });

    // Function to validate the form
    function validateForm() {
        var isValid = true;

        // Loop through each form field and check for empty values
        jQuery(".edited-field").each(function () {
            var fieldValue = jQuery(this).val().trim();

            // Show error message if field is empty
            if (fieldValue === "") {
                isValid = false;
                jQuery(this).siblings(".form__input--error-message").show();
            } else {
                jQuery(this).siblings(".form__input--error-message").hide();
            }
        });

        return isValid;
    }
});
