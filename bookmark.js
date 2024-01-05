jQuery(document).ready(function($) {
    function isLoggedIn() {
        return sessionStorage.getItem("loggedIn") === "true";
    }

    function getUserId() {
        return sessionStorage.getItem("username") || ""; // Using the username as the unique identifier for the user
    }

    function isItemAlreadySaved(userId, itemId) {
        var userItems = JSON.parse(localStorage.getItem(userId)) || [];
        return userItems.some(function(item) {
            return $(item).data("id") === itemId;
        });
    }

    function saveToLocalStorage(userId, cardClone) {
        var itemId = cardClone.data("id");

        if (!isLoggedIn()) {
            $('#loginModal').modal('show');
            return;
        }

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

    function removeSavedItem(userId, itemId) {
        var userItems = JSON.parse(localStorage.getItem(userId)) || [];
        var updatedUserItems = userItems.filter(function(savedItem) {
            return $(savedItem).data("id") !== itemId;
        });

        localStorage.setItem(userId, JSON.stringify(updatedUserItems));
        loadSavedItems(userId);
    }

    function deleteAllSavedItems(userId) {
        localStorage.removeItem(userId);
        loadSavedItems(userId);
    }

    function checkGoldClass(userId) {
        var userItems = JSON.parse(localStorage.getItem(userId)) || [];
        var isHondaSaved = userItems.some(function(item) {
            return $(item).data("id") === "hondaItemId";
        });

        if (!isHondaSaved) {
            $('#bookmarkHonda').removeClass('gold');
        }
    }

    function displaySavedItems(userId, savedItems) {
        var savedItemsContainer = $('#savedItems');
        savedItemsContainer.empty();

        if (savedItems.length === 0) {
            var addButton = $('<button class="btn btn-primary">Add</button>');
            var addText = $('<span class="text-center">No saved items. </span>');
            savedItemsContainer.append(addText, addButton);

            // Event listener for the Add button
            addButton.on('click', function() {
                window.location.href = 'honda.html'; // Redirect to honda.html
            });
        } else {
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

    function loadSavedItems(userId) {
        var savedItems = JSON.parse(localStorage.getItem(userId)) || [];
        displaySavedItems(userId, savedItems);
        checkGoldClass(userId);
    }

    $(document).on("click", ".save-icon", function(e) {
        e.preventDefault();
        var userId = getUserId();

        if (!isLoggedIn()) {
            $('#loginModal').modal('show');
            return;
        }

        var itemId = $(this).closest('.mc_card').data("id");

        if ($(this).hasClass("gold")) {
            removeSavedItem(userId, itemId);
            checkGoldClass(userId);
        } else {
            $(this).addClass("gold");
            saveToLocalStorage(userId, $(this).closest(".mc_card"));
        }
    });

    $(document).on("click", "#deleteAll", function() {
        var userId = getUserId();
        deleteAllSavedItems(userId);
    });

    // Bootstrap Modal Template Literal
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

$('body').append(loginModal);

$('#okModalBtn').on('click', function() {
    window.location.href = 'login.html';
});

$('#closeModalBtn').on('click', function() {
    $('#loginModal').modal('hide');
});





    var userId = getUserId();
    loadSavedItems(userId);
});
