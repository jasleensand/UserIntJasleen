
// sliding navigation menu for mobile devices
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });
});

//navigation bar color change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 0) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
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


const dcards = document.querySelectorAll('.room-card');
const dnextBtn = document.querySelector('.carousel-next');

let currentIndex = 0;
const cardsPerView = window.innerWidth >= 768 ? 2 : 1;

// Initialize: show the first set
function showCards() {
  cards.forEach(card => card.classList.remove('active'));
  for (let i = 0; i < cardsPerView; i++) {
    const index = (currentIndex + i) % cards.length;
    cards[index].classList.add('active');
  }
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + cardsPerView) % cards.length;
  showCards();
});

showCards();