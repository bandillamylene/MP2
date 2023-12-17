// Function to display saved items with product--card content
function displaySavedItems() {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const savedItemsContainer = document.getElementById('savedItems');
  
    savedItemsContainer.innerHTML = '';
  
    if (savedItems.length === 0) {
      savedItemsContainer.innerHTML = '<p>No saved items yet.</p>';
    } else {
      let html = '';
      const colClasses = {
        lg: 'col-lg-4 col-xl-4 d-flex justify-content-center', // 3 cards in a row for LG screens
        md: 'col-md-6 d-flex justify-content-center', // 2 cards in a row for MD screens
        sm: 'col-12 d-flex justify-content-center', // 1 card in a row for SM screens
        xs: 'col-12 d-flex justify-content-center' // 1 card in a row for XS screens
      };
  
      savedItems.forEach((item, index) => {
        const breakpoint = window.innerWidth >= 1200 ? 'lg' : window.innerWidth >= 992 ? 'md' : window.innerWidth >= 768 ? 'sm' : 'xs';
        const colClass = colClasses[breakpoint];
  
        html += `
          <div class="${colClass} mb-4">
            <div class="smaller-card">${item}</div>
          </div>`;
  
        // For SM and XS screens, add a line break after each card
        if (breakpoint === 'sm' || breakpoint === 'xs') {
          html += '<div class="w-100"></div>';
        }
      });
  
      savedItemsContainer.innerHTML = html;
    }
  }
  
  // Initial call to display saved items when the page loads
  displaySavedItems();
  
  // Event listener to update card layout on window resize
  window.addEventListener('resize', displaySavedItems);
  