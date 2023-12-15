document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.getElementById('navbarToggler');
  const collapseMenu = document.getElementById('collapseMenu');

  navbarToggler.addEventListener('click', function() {
      collapseMenu.classList.toggle('show');
  });

  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
          e.preventDefault();
          const dropdownMenu = toggle.nextElementSibling;
          dropdownMenu.classList.toggle('show');
      });
  });

  // Close the collapsed menu if a link is clicked (optional)
  const navLinks = document.querySelectorAll('.navbar ul li a');
  navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
          collapseMenu.classList.remove('show');
      });
  });
});