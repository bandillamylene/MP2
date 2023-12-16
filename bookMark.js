// Function to add an item to saved items
function addToSavedItems(card) {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const item = card.outerHTML;
    savedItems.push(item);
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
    displaySavedItems(); // Update saved items display after adding a new item
  }
  
  // Function to display saved items in the User Dashboard
  function displaySavedItems() {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const savedItemsContainer = document.getElementById('savedItems');
  
    savedItemsContainer.innerHTML = '';
  
    if (savedItems.length === 0) {
      savedItemsContainer.innerHTML = '<p>No saved items yet.</p>';
    } else {
      savedItems.forEach(item => {
        const cardWrapper = document.createElement('div');
        cardWrapper.innerHTML = item;
  
        const saveIcon = cardWrapper.querySelector('.save-icon');
        saveIcon.addEventListener('click', () => {
          addToSavedItems(cardWrapper);
        });
  
        savedItemsContainer.appendChild(cardWrapper);
      });
    }
  }
  
  // Function to initialize the User Dashboard
  function initializeDashboard() {
    displaySavedItems();
  }
  
  // Add event listeners or trigger functions as needed
  document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
  });
  
  // Add event listener for all save icons on the page
  const saveIcons = document.querySelectorAll('.save-icon');
  saveIcons.forEach(icon => {
    icon.addEventListener('click', event => {
      const card = event.target.closest('.mc_card');
      addToSavedItems(card);
    });
  });
  