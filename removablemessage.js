// JavaScript to handle closing the banner in the index and cards message in the promo page when the '.clickMe' element is clicked
document.querySelector('.clickMe').addEventListener('click', function() {
    // Hide the element with the class 'click-cards'
    document.querySelector('.click-cards').style.display = 'none';

    // Hide the element with the class 'promo-banner'
    document.querySelector('.promo-banner').style.display = 'none';
});
