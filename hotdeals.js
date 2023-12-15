function slideInFromTop(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(-20px)';
    element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';

    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

function slideInFromBottom(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';

    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

function slideInOnScroll(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            slideInFromTop(entry.target.querySelector('h2'));
            slideInFromBottom(entry.target.querySelector('p'));

            observer.unobserve(entry.target);
        }
    });
}

const contactSection = document.querySelector('.contact-section');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver(slideInOnScroll, options);
observer.observe(contactSection);
