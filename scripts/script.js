
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

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });

  // Navbar background color change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const cards = document.querySelectorAll('.room-card');
  const nextBtn = document.querySelector('.carousel-next');
  let currentIndex = 0;

  function updateCards() {
    // Reset all
    cards.forEach(card => card.classList.remove('active'));

    if (window.innerWidth >= 768) {
      // DESKTOP: show 2 cards
      const first = currentIndex % cards.length;
      const second = (currentIndex + 1) % cards.length;

      cards[first].classList.add('active');
      cards[second].classList.add('active');
    } else {
      // MOBILE: show only 1 card
      const index = currentIndex % cards.length;
      cards[index].classList.add('active');
    }
  }

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
  });

  // Update on resize to re-render layout
  window.addEventListener('resize', updateCards);

  updateCards(); // initial run
});
