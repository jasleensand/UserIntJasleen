// Navbar scroll color change
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // --- General Setup ---
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const cartIndicator = document.getElementById("cart-icon-indicator");
  const desktopCartIcon = document.getElementById("desktop-cart-icon");
  const cartBadge = document.getElementById("cart-badge");
  const pathPrefix = location.pathname.includes("/sites/") ? "../" : "";
  const cartFullPath = `${pathPrefix}images/cartfull.svg`;
  const cartEmptyPath = `${pathPrefix}images/cart.svg`;
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // --- Cart icon display ---
  const updateCartIcon = () => {
    if (cartIndicator) {
      cartIndicator.style.display = cart.length > 0 ? "inline-block" : "none";
    }
    if (desktopCartIcon) {
      desktopCartIcon.src = cart.length > 0 ? cartFullPath : cartEmptyPath;
      if (cart.length > 0) {
        desktopCartIcon.classList.add("cart-full");
      }
    }
    if (cartBadge) {
      cartBadge.textContent = cart.length;
      cartBadge.style.display = cart.length > 0 ? "inline-block" : "none";
    }
  };
  updateCartIcon();

  // --- Mobile Nav Toggle ---
  menuToggle?.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });

  // --- Calendar Setup ---
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
      calendarDates.appendChild(document.createElement("div"));
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

  prevBtn?.addEventListener("click", () => {
    if (currentMonthIndex > 0) {
      currentMonthIndex--;
      generateCalendar();
    }
  });

  nextBtn?.addEventListener("click", () => {
    if (currentMonthIndex < months.length - 1) {
      currentMonthIndex++;
      generateCalendar();
    }
  });

  generateCalendar();

  // --- Time Tabs ---
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

  // --- Add to Cart ---
  const addToCartBtn = document.getElementById("add-to-cart");
  const confirmationMsg = document.getElementById("confirmation-message");

  function checkSelections() {
    if (selectedDate && selectedTime && addToCartBtn) {
      addToCartBtn.style.display = "block";
    } else if (addToCartBtn) {
      addToCartBtn.style.display = "none";
    }
  }

  addToCartBtn?.addEventListener("click", () => {
    const booking = {
      room: document.querySelector(".escape-title")?.textContent,
      time: selectedTime,
      date: selectedDate.toDateString(),
      people: document.getElementById("people-dropdown")?.value,
      price: 59
    };

    cart.push(booking);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    updateCartIcon();

    if (confirmationMsg) {
      confirmationMsg.classList.add("visible");
      setTimeout(() => confirmationMsg.classList.remove("visible"), 3000);
    }
  });

  // --- Cart Page Rendering ---
  const cartContainer = document.getElementById("cart-container");
  const emptyCart = document.querySelector(".empty-cart-section");
  const cartTotal = document.getElementById("cart-total");

  if (cartContainer) {
    if (cart.length === 0) {
      emptyCart?.classList.remove("hidden");
    } else {
      emptyCart?.classList.add("hidden");

      let total = 0;

      cart.forEach((item, index) => {
        total += item.price * parseInt(item.people);
        const card = document.createElement("div");
        card.className = "booking-card";
        card.innerHTML = `
          <h3>${item.room}</h3>
          <p>${item.date} &nbsp; ${item.time} &nbsp; 👥 ${item.people}</p>
          <p>$${item.price} pp</p>
          <img src="${pathPrefix}images/cross.svg" class="remove-btn" data-index="${index}" alt="Remove booking"
            style="width: 20px; height: 20px; cursor: pointer; filter: brightness(0) saturate(100%) invert(59%) sepia(80%) saturate(1242%) hue-rotate(357deg) brightness(104%) contrast(98%);" />
        `;
        cartContainer.appendChild(card);
      });

      if (cartTotal) {
        cartTotal.innerHTML = `
          <p style="margin-top: 2rem; font-weight: bold; font-family: baskerville; color: white;">
            Total: $${total}
          </p>
        `;
      }

      cartContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
          const index = parseInt(e.target.dataset.index);
          cart.splice(index, 1);
          sessionStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
        }
      });
    }
  }
});
