// Function to slide in an element from the top
function slideInFromTop(element) {
    // Initial styles for animation
    element.style.opacity = '0';
    element.style.transform = 'translateY(-20px)';
    element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';

    // Delayed transition to make the slide-in effect
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

// Function to slide in an element from the bottom
function slideInFromBottom(element) {
    // Initial styles for animation
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';

    // Delayed transition to make the slide-in effect
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

// Function to slide in elements on scroll intersection
function slideInOnScroll(entries, observer) {
    entries.forEach(entry => {
        // Check if the observed element is intersecting with the viewport
        if (entry.isIntersecting) {
            // Slide in the 'h2' element from the top
            slideInFromTop(entry.target.querySelector('h2'));
            // Slide in the 'p' element from the bottom
            slideInFromBottom(entry.target.querySelector('p'));

            // Stop observing the element after it becomes visible
            observer.unobserve(entry.target);
        }
    });
}

// Select the element with the class 'contact-section'
const contactSection = document.querySelector('.contact-section');

// Intersection Observer options
const options = {
    root: null,           // Use the viewport as the root
    rootMargin: '0px',    // No margin around the root
    threshold: 0.5        // Trigger when 50% of the target is visible
};

// Create a new Intersection Observer instance with the defined options
const observer = new IntersectionObserver(slideInOnScroll, options);

// Observe the 'contactSection' element for slide-in effect on scroll
observer.observe(contactSection);
