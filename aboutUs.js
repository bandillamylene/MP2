// Intersection Observer for sections
const sections = document.querySelectorAll('.StoryCont');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});

// Blinking effect function
function startBlinking() {
  const blinkingText = document.getElementById('blinkingText');

  function blink() {
    blinkingText.classList.toggle('blink-hidden');
  }

  setInterval(blink, 500); // blinking time interval (in milliseconds)
}

startBlinking(); //function to start blinking
