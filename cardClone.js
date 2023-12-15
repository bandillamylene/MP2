document.addEventListener('DOMContentLoaded', function () {
    const savedItemsSection = document.getElementById('savedItems');
    const savedItemTemplate = document.querySelector('.saved-item-template');

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('save-icon')) {
            event.preventDefault();
            const card = event.target.closest('.mc_card');
            if (card) {
                const savedCard = savedItemTemplate.cloneNode(true);
                savedCard.style.display = ''; // Show the cloned card
                savedCard.querySelector('.card').innerHTML = card.innerHTML; // Copy the content
                savedItemsSection.appendChild(savedCard);
            }
        }
    });
});