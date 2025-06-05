
// sliding navigation menu for mobile devices

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



//calendar functionality//

  const calendarDates = document.getElementById("calendar-dates");
  const calendarMonth = document.getElementById("calendar-month");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");

  const months = ["June", "July" , "August"];
  const monthData = [
    { year: 2025, month: 5 }, 
    { year: 2025, month: 6 },  
    { year: 2025, month: 7 }  
  ];

  let currentMonthIndex = 0;
  const today = new Date();

  function generateCalendar() {
    calendarDates.innerHTML = "";
    const { year, month } = monthData[currentMonthIndex];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarMonth.textContent = months[currentMonthIndex].toUpperCase();
    prevBtn.disabled = currentMonthIndex === 0;
    nextBtn.disabled = currentMonthIndex === months.length - 1;

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("div");
      calendarDates.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day);
      const div = document.createElement("div");
      div.textContent  = day;
      div.classList.add("calendar-date");

      if (cellDate < today) {
        div.classList.add("disabled");
      }

     div.addEventListener("click", () => {
      document.querySelectorAll(".calendar-date").forEach(d => d.classList.remove("selected"));
      div.classList.add("selected");
      selectedDate = cellDate;
      checkSelections();
      
  });


      calendarDates.appendChild(div);
    }
  }

  prevBtn.addEventListener("click", () => {
    if (currentMonthIndex > 0) {
      currentMonthIndex--;
      generateCalendar();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentMonthIndex < months.length - 1) {
      currentMonthIndex++;
      generateCalendar();
    }
  });

  generateCalendar();




const dayTab = document.getElementById("dayTab");
const eveningTab = document.getElementById("eveningTab");
const timeOptions = document.getElementById("timeOptions");

const times = {
  day: ["12:00 pm", "1:30 pm", "3:00 pm", "4:30 pm"],
  evening: ["6:00 pm", "7:30 pm", "9:00 pm"]
};

function renderTimes(period) {
  timeOptions.innerHTML = "";
  times[period].forEach(time => {
    const btn = document.createElement("button");
    btn.className = "time-button";
    btn.textContent = time;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".time-button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedTime = btn.textContent;
      checkSelections();
      
});
    timeOptions.appendChild(btn);
  });
}

// Initial load
renderTimes("day");

dayTab.addEventListener("click", () => {
  dayTab.classList.add("active");
  eveningTab.classList.remove("active");
  renderTimes("day");
 
});

eveningTab.addEventListener("click", () => {
  eveningTab.classList.add("active");
  dayTab.classList.remove("active");
  renderTimes("evening");
  
});


//add to acrt button

let selectedDate = null;
let selectedTime = null;

const addToCartBtn = document.getElementById("add-to-cart");

function checkSelections() {
  if (selectedDate && selectedTime) {
    addToCartBtn.style.display = "block";
  } else {
    addToCartBtn.style.display = "none";
  }
}

const itemAddToCartBtn = document.getElementById("add-to-cart");
const confirmationMsg = document.getElementById("confirmation-message");

itemAddToCartBtn.addEventListener("click", () => {
  confirmationMsg.classList.add("visible");

  // Remove the class after 3 seconds (for fade-out)
  setTimeout(() => {
    confirmationMsg.classList.remove("visible");
  }, 3000);
});






document.getElementById("people-dropdown").addEventListener("change", () => {
  
});







