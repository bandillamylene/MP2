const sections = document.querySelectorAll('.StoryCont');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3 // Adjust this value as needed
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
