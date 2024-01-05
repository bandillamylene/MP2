// Function to check if elements are in view
function isInViewport(element) {
    // Get the position and dimensions of the element
    const rect = element.getBoundingClientRect();
    
    // Check if the element is within the viewport
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle slide animations
function handleSlideAnimations() {
    // Select all elements with classes 'slide-top' or 'slide-bottom'
    const slideElements = document.querySelectorAll('.slide-top, .slide-bottom');

    // Iterate through each slide element
    slideElements.forEach(slideElement => {
        // Check if the slide element is in the viewport
        if (isInViewport(slideElement)) {
            // Add the 'active' class to trigger the slide animation
            slideElement.classList.add('active');
        }
    });
}

// Event listener for scrolling to trigger slide animations
window.addEventListener('scroll', handleSlideAnimations);

// Initially check elements in view on page load
window.addEventListener('load', handleSlideAnimations);



