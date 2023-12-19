jQuery(document).ready(function($) {
    // Load saved items from localStorage and apply "gold" class
    loadSavedItems();

    function showModal() {
        var modal = `
            <div class="modal fade" id="duplicateModal" tabindex="-1" role="dialog" aria-labelledby="duplicateModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <p>This item is already saved.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal" id="closeModalBtn">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('body').append(modal);
        $('#duplicateModal').modal('show');
        $('#duplicateModal').on('hidden.bs.modal', function() {
            $(this).remove();
        });
        $('#closeModalBtn').on('click', function() {
            $('#duplicateModal').modal('hide');
        });
    }

    function isLoggedIn() {
        return sessionStorage.getItem("loggedIn") === "true";
    }

    function redirectToLoginPage() {
        window.location.href = "login.html";
    }

    function saveToLocalStorage(cardClone) {
        var itemId = cardClone.data("id");
        console.log("Clicked Item ID:", itemId);

        var savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

        var isDuplicate = savedItems.some(function(item) {
            return $(item).data("id") === itemId;
        });

        if (!isDuplicate) {
            savedItems.push(cardClone[0].outerHTML);
            localStorage.setItem("savedItems", JSON.stringify(savedItems));
            loadSavedItems();
        } else {
            showModal();
        }
    }

    function removeSavedItem(itemId) {
        // Here, I'll just log the item ID to indicate the removal
        console.log(`Removing item with ID: ${itemId}`);
    }

    function loadSavedItems() {
        var savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

        if (isLoggedIn()) {
            $("#savedItems").empty();

            savedItems.forEach(function(item) {
                var $item = $(item);
                $item.find('.save-icon').on('click', function(e) {
                    e.preventDefault();
                    removeSavedItem($item.data("id"));
                    savedItems = savedItems.filter(function(savedItem) {
                        return $(savedItem).data("id") !== $item.data("id");
                    });
                    localStorage.setItem("savedItems", JSON.stringify(savedItems));
                    loadSavedItems();
                });
                $("#savedItems").append($item);
            });
        }
    }

    // Event delegation for save icon click
    $(document).on("click", ".save-icon", function(e) {
        e.preventDefault();

        if (!isLoggedIn()) {
            showModal();
            return;
        }

        var itemId = $(this).closest('.mc_card').data("id");

        if ($(this).hasClass("gold")) {
            removeSavedItem(itemId);
        } else {
            $(this).addClass("gold");
            saveToLocalStorage($(this).closest(".mc_card"));
        }
    });
});
