jQuery(document).ready(function (jQuery) {

    // Load saved items from localStorage and apply "gold" class
    loadSavedItems();

    // Function to create and show the modal
    function showModal(message, buttonText, buttonCallback) {
        var modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';

        var modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        var closeButton = document.createElement('span');
        closeButton.className = 'close-button';
        closeButton.innerText = '×';

        var messageParagraph = document.createElement('p');
        messageParagraph.innerText = message;

        var okButton = document.createElement('button');
        okButton.className = 'ok-button';
        okButton.innerText = buttonText;
        okButton.addEventListener('click', buttonCallback);

        modalContent.appendChild(closeButton);
        modalContent.appendChild(messageParagraph);
        modalContent.appendChild(okButton);

        modalContainer.appendChild(modalContent);

        document.body.appendChild(modalContainer);

        modalContainer.style.display = 'flex';
    }

    // Event delegation for save icon click
    jQuery(document).on("click", ".save-icon", function (e) {
        e.preventDefault();

        if (!isLoggedIn()) {
            showModal("Please login first before you can save this item.", "OK", redirectToLoginPage);
            return;
        }

        var itemId = jQuery(this).data("id");

        if (jQuery(this).hasClass("gold")) {
            // Remove the saved item from the user dashboard
            removeSavedItem(itemId);

            // Remove the saved item from local storage
            removeSavedItemFromLocalStorage(itemId);
        } else {
            // Toggle the gold class on click
            jQuery(this).addClass("gold");

            // Save the entire card to local storage
            saveToLocalStorage(jQuery(this).closest(".mc_card").clone());
        }
    });

    // Event delegation for remove icon click
    jQuery(document).on("click", ".remove-icon", function (e) {
        e.preventDefault();

        var itemId = jQuery(this).data("id");

        // Remove the saved item from the user dashboard
        removeSavedItem(itemId);

        // Remove the saved item from local storage
        removeSavedItemFromLocalStorage(itemId);
    });

    // Event delegation for delete all button click
    jQuery(document).on("click", "#deleteAllButton", function (e) {
        e.preventDefault();

        // Delete all items in the savedItems section
        deleteAllSavedItems();
    });

    function saveToLocalStorage(cardClone) {
        // Save the entire card to local storage
        var savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
        savedItems.push(cardClone.prop('outerHTML'));
        localStorage.setItem("savedItems", JSON.stringify(savedItems));

        // Load the saved items
        loadSavedItems();
    }

    function removeSavedItem(itemId) {
        jQuery("#savedItems .save-icon[data-id='" + itemId + "']").closest(".mc_card").remove();
    }

    function removeSavedItemFromLocalStorage(itemId) {
        var savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

        savedItems = savedItems.filter(function (item) {
            return jQuery(item).find(".save-icon").data("id") !== itemId;
        });

        localStorage.setItem("savedItems", JSON.stringify(savedItems));
    }

    function deleteAllSavedItems() {
        // Remove all items in the savedItems section
        jQuery("#savedItems").empty();

        // Clear the saved items in local storage
        localStorage.removeItem("savedItems");
    }

    function isLoggedIn() {
        return sessionStorage.getItem("loggedIn") === "true";
    }

    function redirectToLoginPage() {
        window.location.href = "login.html";
    }

    // Event delegation for close button
    jQuery(document).on('click', '.close-button', function () {
        jQuery('.modal-container').hide();
    });

    // Function to load and display saved items on the user dashboard
    function loadSavedItems() {
        var savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

        if (isLoggedIn()) {
            // Clear existing saved items
            jQuery("#savedItems").empty();

            savedItems.forEach(function (item) {
                // Append the saved item to the user dashboard
                jQuery("#savedItems").append(item);
            });
        }
    }
});

