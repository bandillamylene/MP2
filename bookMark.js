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
          xl: 'col-xl-4 d-flex justify-content-center',
          lg: 'col-lg-4 d-flex justify-content-center',
          md: 'col-md-6 d-flex justify-content-center',
          sm: 'col-12 d-flex justify-content-center',
      };

      savedItems.forEach((item, index) => {
          const breakpoint = window.innerWidth >= 1200 ? 'xl' : (window.innerWidth >= 992 ? 'lg' : (window.innerWidth >= 768 ? 'md' : 'sm'));
          const colClass = colClasses[breakpoint];

          html += `
              <div class="${colClass} mb-4">
                  <div class="smaller-card">${item}</div>
              </div>`;

          html += '<div class="w-100 d-block d-sm-none"></div>'; // Add a new row for SM and XS screens
      });

      savedItemsContainer.innerHTML = html;
  }
}

// Initial call to display saved items when the page loads
displaySavedItems();

// Event listener to update card layout on window resize
window.addEventListener('resize', displaySavedItems);
