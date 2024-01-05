// Document ready function to ensure the DOM is fully loaded before executing the script
jQuery(document).ready(function($) {

    // Function to check if the user is logged in
    function isLoggedIn() {
        return sessionStorage.getItem("loggedIn") === "true";
    }

    // Function to get the user's unique identifier (username in this case)
    function getUserId() {
        return sessionStorage.getItem("username") || ""; // Using the username as the unique identifier for the user
    }

    // Function to check if an item is already saved by the user
    function isItemAlreadySaved(userId, itemId) {
        var userItems = JSON.parse(localStorage.getItem(userId)) || [];
        return userItems.some(function(item) {
            return $(item).data("id") === itemId;
        });
    }

    // Function to save an item to local storage
    function saveToLocalStorage(userId, cardClone) {
        var itemId = cardClone.data("id");

        // Check if the user is logged in
        if (!isLoggedIn()) {
            $('#loginModal').modal('show');
            return;
        }

        // Check if the item is already saved
        if (isItemAlreadySaved(userId, itemId)) {
            console.log("This item is already saved.");
            return;
        }

        var itemHTML = cardClone.prop('outerHTML');

        var userItems = JSON.parse(localStorage.getItem(userId)) || [];
        userItems.push(itemHTML);
        localStorage.setItem(userId, JSON.stringify(userItems));
        loadSavedItems(userId);
    }

    // Function to remove a saved item from local storage
    function removeSavedItem(userId, itemId) {
        var userItems = JSON.parse(localStorage.getItem(userId)) || [];
        var updatedUserItems = userItems.filter(function(savedItem) {
            return $(savedItem).data("id") !== itemId;
        });

        localStorage.setItem(userId, JSON.stringify(updatedUserItems));
        loadSavedItems(userId);
    }

    // Function to delete all saved items for a user
    function deleteAllSavedItems(userId) {
        localStorage.removeItem(userId);
        loadSavedItems(userId);
    }

    // Function to check if a specific item is saved and update the UI
    function checkGoldClass(userId) {
        var userItems = JSON.parse(localStorage.getItem(userId)) || [];
        var isHondaSaved = userItems.some(function(item) {
            return $(item).data("id") === "hondaItemId";
        });

        if (!isHondaSaved) {
            $('#bookmarkHonda').removeClass('gold');
        }
    }

    // Function to display saved items in the UI
    function displaySavedItems(userId, savedItems) {
        var savedItemsContainer = $('#savedItems');
        savedItemsContainer.empty();

        if (savedItems.length === 0) {
            // Display a message when there are no saved items
            var addButtonContainer = $('<div class="text-center mb-3"></div>'); // Container for centering
            var addButton = $('<button class="btn btn-lg user--btn">Add Items</button>');
            var addText = $('<p class="text-center">No saved items. </p>');

            addButtonContainer.append(addButton);
            savedItemsContainer.append(addText, addButtonContainer);

            // Event listener for the Add button to redirect to honda.html
            addButton.on('click', function() {
                window.location.href = 'honda.html';
            });
        } else {
            // Display each saved item with a remove option
            savedItems.forEach(function(item) {
                var $item = $(item);
                var saveIcon = $item.find('.save-icon');
                saveIcon.on('click', function(e) {
                    e.preventDefault();
                    removeSavedItem(userId, $item.data("id"));
                    checkGoldClass(userId);
                });

                savedItemsContainer.append($item);
            });
        }
    }

    // Function to load saved items for a user
    function loadSavedItems(userId) {
        var savedItems = JSON.parse(localStorage.getItem(userId)) || [];
        displaySavedItems(userId, savedItems);
        checkGoldClass(userId);
    }

    // Event listener for clicking the save icon on each item
    $(document).on("click", ".save-icon", function(e) {
        e.preventDefault();
        var userId = getUserId();

        // Check if the user is logged in
        if (!isLoggedIn()) {
            $('#loginModal').modal('show');
            return;
        }

        var itemId = $(this).closest('.mc_card').data("id");

        // Toggle the gold class for the save icon and save/remove the item accordingly
        if ($(this).hasClass("gold")) {
            removeSavedItem(userId, itemId);
            checkGoldClass(userId);
        } else {
            $(this).addClass("gold");
            saveToLocalStorage(userId, $(this).closest(".mc_card"));
        }
    });

    // Event listener for clicking the delete all saved items button
    $(document).on("click", "#deleteAll", function() {
        var userId = getUserId();
        deleteAllSavedItems(userId);
    });

    // Bootstrap Modal Template Literal for login prompt
    const loginModal = `
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content modal-content-login">
                <div class="modal-body text-center">
                    You need to be logged in to save items.
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="okayBtn btn mr-2" id="okModalBtn">OK</button>
                    <button type="button" class="cancelBtn btn" id="closeModalBtn" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
`;

// Append the login modal to the body
$('body').append(loginModal);

// Event listeners for the login modal buttons
$('#okModalBtn').on('click', function() {
    window.location.href = 'login.html';
});

$('#closeModalBtn').on('click', function() {
    $('#loginModal').modal('hide');
});

// Get the user ID and load saved items on document ready
var userId = getUserId();
loadSavedItems(userId);
});
