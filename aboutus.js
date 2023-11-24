document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.bottom = '0';
      }, index * 200); // Adjust the delay between each card's animation
    });
  });
  

  // Initialize the custom carousel
$('#customCarousel').carousel();
