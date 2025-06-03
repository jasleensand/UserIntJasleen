

const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

menuToggle.addEventListener('click', () => {
  if (mobileNav.style.left === '0%') {
    mobileNav.style.left = '-100%';
  } else {
    mobileNav.style.left = '0%';
  }
});
