// Function to apply slide-in effect to the 'explore' section
function slideInEffect() {
    // Select the 'explore' section element
    const exploreSection = document.getElementById('explore');

    // Set initial styles for animation
    exploreSection.style.opacity = '0';
    exploreSection.style.transform = 'translateY(50px)';
    
    // Delayed transition to make the slide-in effect
    setTimeout(() => {
        exploreSection.style.transition = 'opacity 2.5s ease-out, transform 1.5s ease-out';
        exploreSection.style.opacity = '1';
        exploreSection.style.transform = 'translateY(0)';
    }, 1000); // Delay for starting animation
}

// Call the function to start the slide-in effect on page load
slideInEffect();

// Function to handle slide-in animations on scroll
function slideInOnScroll(entries, observer) {
    entries.forEach((entry, index) => {
        // Check if the observed element is fully in view
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
            const target = entry.target;

            // Delayed addition of 'slide-in' class to trigger animation
            setTimeout(() => {
                target.classList.add('slide-in');
            }, index * 200); // delay between each card's animation (in milliseconds)

            // Stop observing the element after animation is triggered
            observer.unobserve(target);
        }
    });
}

// Select all elements with the class 'promocards'
const cards = document.querySelectorAll('.promocards');

// Intersection Observer options
const options = {
    root: null,           // Use the viewport as the root
    rootMargin: '0px',    // No margin around the root
    threshold: 1          // Trigger when the element is fully in view (100% visibility)
};

// Create a new Intersection Observer instance with the defined options
const observer = new IntersectionObserver(slideInOnScroll, options);

// Observe each 'promocards' element for slide-in effect on scroll
cards.forEach(card => {
    observer.observe(card);
});

