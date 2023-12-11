function mc_Filter() {
    // Get the input element and search query
    var input, filter, cards, card, title, i, txtValue, found;
    input = document.getElementById("search_MC");
    filter = input.value.toUpperCase();
    cards = document.getElementsByClassName("mc_card");
    found = false;

    // Loop through each card
    for (i = 0; i < cards.length; i++) {
        card = cards[i];
        // Get the title of the motorcycle
        title = card.getElementsByClassName("model-title")[0];
        txtValue = title.textContent || title.innerText;

        // Check if the search query matches the title
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            // Show the card if there's a match
            card.style.display = "";
            found = true; // Set found to true if there's a match
        } else {
            // Hide the card if there's no match
            card.style.display = "none";
        }
    }

    // Check for "No results found" message
    var noResultsMsg = document.querySelector(".no-results-msg");

    // If no match and no message exists, create and append the message
    if (!found && !noResultsMsg) {
        var noResults = document.createElement("div");
        noResults.textContent = "No results found";
        noResults.classList.add("no-results-msg");

        var container = document.querySelector(".container");
        container.appendChild(noResults);
    } else if (found && noResultsMsg) {
        // If match found and message exists, remove the message
        noResultsMsg.remove();
    }

    return false; // Prevent the form from submitting
}