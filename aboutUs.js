// Intersection Observer for sections
// Select all elements with the class 'StoryCont' to observe
const sections = document.querySelectorAll('.StoryCont');

// Intersection Observer options
const options = {
  root: null,           // Use the viewport as the root
  rootMargin: '0px',    // No margin around the root
  threshold: 0.3        // Trigger when 30% of the target is visible
};

// Create a new Intersection Observer instance
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // Check if the observed element is intersecting with the viewport
    if (entry.isIntersecting) {
      // Add the 'animate' class to start the animation
      entry.target.classList.add('animate');
      // Stop observing the element after it becomes visible
      observer.unobserve(entry.target);
    }
  });
}, options);

// Observe each section element
sections.forEach(section => {
  observer.observe(section);
});

// Blinking effect function
function startBlinking() {
  // Get the element with the id 'blinkingText'
  const blinkingText = document.getElementById('blinkingText');

  // Function to toggle the 'blink-hidden' class
  function blink() {
    blinkingText.classList.toggle('blink-hidden');
  }

  // Set an interval to call the 'blink' function every 500 milliseconds
  setInterval(blink, 500); // blinking time interval (in milliseconds)
}

// Call the 'startBlinking' function to initiate the blinking effect
startBlinking();

