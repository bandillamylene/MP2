document.addEventListener('DOMContentLoaded', function() {
    // Update statuses based on stored data in localStorage
    const products = document.querySelectorAll('[id^=status_]');
    products.forEach(product => {
      const productId = product.id.replace('status_', '');
      const status = localStorage.getItem(productId);
      if (status === 'hidden') {
        product.textContent = 'Hidden';
      }
    });
  });

  
function hide(productId) {
    localStorage.setItem(productId, 'hidden');
    updateStatus(productId, 'Hidden');
  }

  function unhide(productId) {
    localStorage.removeItem(productId);
    updateStatus(productId, 'Available');
  }

  function updateStatus(productId, status) {
    document.getElementById(`status_${productId}`).textContent = status;
  }