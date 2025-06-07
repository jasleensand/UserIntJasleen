// Navbar color change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Nav Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  menuToggle?.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });

  // Cart Setup
  const cartIndicator = document.getElementById("cart-icon-indicator");
  const desktopCartIcon = document.getElementById("desktop-cart-icon");
  const cartBadge = document.getElementById("cart-badge");
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  let cartCount = cart.length;

  // Handle path difference
  const pathPrefix = location.pathname.includes("/sites/") ? "../" : "";
  const cartFullPath = `${pathPrefix}images/cartfull.svg`;
  const cartEmptyPath = `${pathPrefix}images/cart.svg`;

  if (cartIndicator) {
    cartIndicator.style.display = cartCount > 0 ? "inline-block" : "none";
  }

  if (desktopCartIcon) {
    desktopCartIcon.src = cartCount > 0 ? cartFullPath : cartEmptyPath;
    if (cartCount > 0) {
      desktopCartIcon.classList.add("cart-full");
    }
  }

  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? "inline-block" : "none";
  }

  // Carousel Logic
  const cards = document.querySelectorAll(".room-card");
  const cNextBtn = document.querySelector(".carousel-next");
  let currentIndex = 0;

  function updateCards() {
    cards.forEach(card => card.classList.remove("active"));

    if (window.innerWidth >= 768) {
      const first = currentIndex % cards.length;
      const second = (currentIndex + 1) % cards.length;
      cards[first].classList.add("active");
      cards[second].classList.add("active");
    } else {
      const index = currentIndex % cards.length;
      cards[index].classList.add("active");
    }
  }

  if (cards.length > 0 && cNextBtn) {
    cNextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCards();
    });

    window.addEventListener("resize", updateCards);
    updateCards();
  }

  // Calendar Logic
  const calendarDates = document.getElementById("calendar-dates");
  const calendarMonth = document.getElementById("calendar-month");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");

  const months = ["June", "July", "August"];
  const monthData = [
    { year: 2025, month: 5 },
    { year: 2025, month: 6 },
    { year: 2025, month: 7 }
  ];

  let currentMonthIndex = 0;
  const today = new Date();
  let selectedDate = null;
  let selectedTime = null;

  function generateCalendar() {
    if (!calendarDates || !calendarMonth) return;

    calendarDates.innerHTML = "";
    const { year, month } = monthData[currentMonthIndex];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarMonth.textContent = months[currentMonthIndex].toUpperCase();
    prevBtn.disabled = currentMonthIndex === 0;
    nextBtn.disabled = currentMonthIndex === months.length - 1;

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("div");
      calendarDates.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day);
      const div = document.createElement("div");
      div.textContent = day;
      div.classList.add("calendar-date");

      if (cellDate < today) {
        div.classList.add("disabled");
      }

      div.addEventListener("click", () => {
        document.querySelectorAll(".calendar-date").forEach(d => d.classList.remove("selected"));
        div.classList.add("selected");
        selectedDate = cellDate;
        document.getElementById("booking-options").style.display = "block";
        checkSelections();
      });

      calendarDates.appendChild(div);
    }
  }

  if (prevBtn && nextBtn) {
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
  }

  // Time Slot Tabs
  const dayTab = document.getElementById("dayTab");
  const eveningTab = document.getElementById("eveningTab");
  const timeOptions = document.getElementById("timeOptions");

  const times = {
    day: ["12:00 pm", "1:30 pm", "3:00 pm", "4:30 pm"],
    evening: ["6:00 pm", "7:30 pm", "9:00 pm"]
  };

  function renderTimes(period) {
    if (!timeOptions) return;

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

  renderTimes("day");

  dayTab?.addEventListener("click", () => {
    dayTab.classList.add("active");
    eveningTab.classList.remove("active");
    renderTimes("day");
  });

  eveningTab?.addEventListener("click", () => {
    eveningTab.classList.add("active");
    dayTab.classList.remove("active");
    renderTimes("evening");
  });

  // Booking Logic
  const addToCartBtn = document.getElementById("add-to-cart");
  const confirmationMsg = document.getElementById("confirmation-message");

  function checkSelections() {
    if (selectedDate && selectedTime) {
      addToCartBtn.style.display = "block";
    } else {
      addToCartBtn.style.display = "none";
    }
  }

  addToCartBtn?.addEventListener("click", () => {
    // Save booking to cart
    const booking = {
      room: document.querySelector(".escape-title").textContent,
      time: selectedTime,
      date: selectedDate.toDateString(),
      people: document.getElementById("people-dropdown").value,
      price: 59
    };

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push(booking);
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // UI Feedback
    if (confirmationMsg) {
      confirmationMsg.classList.add("visible");
      setTimeout(() => confirmationMsg.classList.remove("visible"), 3000);
    }

    if (cartIndicator) cartIndicator.style.display = "inline-block";
    if (desktopCartIcon) {
      desktopCartIcon.src = cartFullPath;
      desktopCartIcon.classList.add("cart-full");
    }

    if (cartBadge) {
      cartBadge.textContent = cart.length;
      cartBadge.style.display = "inline-block";
    }
  });
});

// Cart page rendering
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const emptyCart = document.getElementById("empty-cart");
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  if (emptyCart && cart.length === 0) {
    emptyCart.style.display = "block";
    return;
  }

  cart.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "booking-card";
    card.innerHTML = `
      <h3>${item.room}</h3>
      <p>${item.date} &nbsp; ${item.time} &nbsp; 👥 ${item.people}</p>
      <p>$${item.price} pp</p>
      <button class="remove-btn" data-index="${index}">❌</button>
    `;
    cartContainer?.appendChild(card);
  });

  cartContainer?.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      location.reload(); // Simple reflow for now
    }
  });
});

// Cart page rendering
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const emptyCart = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  if (emptyCart && cart.length === 0) {
    emptyCart.style.display = "block";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * parseInt(item.people);
    const card = document.createElement("div");
    card.className = "booking-card";
    card.innerHTML = `
      <h3>${item.room}</h3>
      <p>${item.date} &nbsp; ${item.time} &nbsp; 👥 ${item.people}</p>
      <p>$${item.price} pp</p>
      <button class="remove-btn" data-index="${index}">❌</button>
    `;
    cartContainer?.appendChild(card);
  });

  // Display total
  if (cartTotal) {
    cartTotal.innerHTML = `<p style="margin-top: 2rem; font-weight: bold; font-family: baskerville; color: white;">Total: $${total}</p>`;
  }

  // Remove logic
  cartContainer?.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      location.reload(); // To re-render updated cart and total
    }
  });
});

