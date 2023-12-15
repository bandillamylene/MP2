function slideInEffect() {
    const exploreSection = document.getElementById('explore');
    exploreSection.style.opacity = '0';
    exploreSection.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        exploreSection.style.transition = 'opacity 2.5s ease-out, transform 1.5s ease-out';
        exploreSection.style.opacity = '1';
        exploreSection.style.transform = 'translateY(0)';
    }, 1000); // Delay for starting animation
}

slideInEffect(); // Call the function to start the slide-in effect


function slideInOnScroll(entries, observer) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
            const target = entry.target;
            setTimeout(() => {
                target.classList.add('slide-in');
            }, index * 200); // Adjust the delay between each card's animation (in milliseconds)
            observer.unobserve(target);
        }
    });
}

const cards = document.querySelectorAll('.promocards');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1 // Only trigger when the element is fully in view (100% visibility)
};

const observer = new IntersectionObserver(slideInOnScroll, options);
cards.forEach(card => {
    observer.observe(card);
});

