
// sliding navigation menu for mobile devices
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });
});

const cards = document.querySelectorAll('.room-card');
const nextBtn = document.querySelector('.carousel-next');

let current = 0;

nextBtn.addEventListener('click', () => {
  // Hide current
  cards[current].classList.remove('active');

  // Move to next card
  current = (current + 1) % cards.length;

  // Show new one
  cards[current].classList.add('active');
});