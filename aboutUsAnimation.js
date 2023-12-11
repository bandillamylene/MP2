// Function to check if elements are in view
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle slide animations
function handleSlideAnimations() {
    const slideElements = document.querySelectorAll('.slide-top, .slide-bottom');
    slideElements.forEach(slideElement => {
        if (isInViewport(slideElement)) {
            slideElement.classList.add('active');
        }
    });
}

//event listener for scrolling
window.addEventListener('scroll', handleSlideAnimations);

// Initially check elements in view on page load
window.addEventListener('load', handleSlideAnimations);


