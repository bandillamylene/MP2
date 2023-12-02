// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to handle scroll events
  function handleScrollAnimation() {
    const elements = document.querySelectorAll('.scroll-animation');
    
    elements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add('active');
      }
    });
  }
  
  // Event listener for scroll
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
  
  // Initial check on page load
  handleScrollAnimation();