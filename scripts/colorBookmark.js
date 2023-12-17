document.addEventListener('DOMContentLoaded', function () {
  // Load saved items from localStorage and apply "gold" class
  loadSavedItems();

  // Function to create and show the modal
  function showModal(message, buttonText, buttonCallback) {
    // Create modal elements
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

    // Append elements to the modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(messageParagraph);
    modalContent.appendChild(okButton);

    modalContainer.appendChild(modalContent);

    // Append the modal to the body
    document.body.appendChild(modalContainer);

    // Show the modal
    modalContainer.style.display = 'flex';
  }

  $(".save-icon").on("click", function (e) {
    e.preventDefault();

    // Check if the user is logged in
    if (!isLoggedIn()) {
      // Show the login prompt modal
      showModal("Please login first before you can save this item.", "OK", redirectToLoginPage);
      return;
    }

    var itemId = $(this).data("id");

    // Toggle the gold class on click
    var isBookmarked = $(this).toggleClass("gold").hasClass("gold");

    // Save the state of the bookmarked item
    saveBookmarkState(itemId, isBookmarked);

    // Save the entire card to local storage
    saveToLocalStorage($(this).closest(".mc_card").clone());

    // Append the saved item to the user dashboard
    appendSavedItemToDashboard($(this).closest(".mc_card").clone());
  });

  function saveToLocalStorage(cardClone) {
    // Retrieve existing saved items or initialize an empty array
    var savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

    // Add the cloned card to the array
    savedItems.push(cardClone.html());

    // Save the updated array back to local storage
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }

  function isLoggedIn() {
    // For simplicity, we assume the user is logged in if a session token is present
    return sessionStorage.getItem("loggedIn") === "true";
  }

  function redirectToLoginPage() {
    // Redirect to the login page
    window.location.href = "login.html";
  }

  // Event delegation for close button
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('close-button')) {
      // Close the modal when the close button is clicked
      document.querySelector('.modal-container').style.display = 'none';
    }
  });

  // Function to load and display saved items on the user dashboard
  function loadSavedItems() {
    // Retrieve saved items from local storage
    var savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

    // Check if the user is logged in
    if (isLoggedIn()) {
      // Retrieve bookmarked items' state from local storage
      var bookmarkedItems = JSON.parse(localStorage.getItem("bookmarkedItems")) || {};

      // Iterate through saved items and display on the user dashboard
      savedItems.forEach(function (item) {
        var savedItem = $(item);
        var itemId = savedItem.find(".save-icon").data("id");

        // Apply the "gold" class to the corresponding save icon based on the stored state
        if (bookmarkedItems[itemId]) {
          savedItem.find(".save-icon").addClass("gold");
        }

        // Append the saved item to the user dashboard
        appendSavedItemToDashboard(savedItem);
      });
    }
  }

  // Function to append a saved item to the user dashboard
  function appendSavedItemToDashboard(savedItem) {
    // Append the saved item to the user dashboard (adjust the selector as needed)
    $("#userDashboard").append(savedItem);
  }

  // Function to save the state of bookmarked items
  function saveBookmarkState(itemId, isBookmarked) {
    // Retrieve existing bookmarked items or initialize an empty object
    var bookmarkedItems = JSON.parse(localStorage.getItem("bookmarkedItems")) || {};

    // Update the state of the specified item
    bookmarkedItems[itemId] = isBookmarked;

    // Save the updated object back to local storage
    localStorage.setItem("bookmarkedItems", JSON.stringify(bookmarkedItems));
  }
});

