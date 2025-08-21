document.addEventListener("DOMContentLoaded", () => {
  // ------------------ Cookie Helper Functions ------------------
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
  }

  function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if(c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
    }
    return "";
  }

  // ------------------ Cookie Consent ------------------
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const rejectBtn = document.getElementById('reject-cookies');
  const closeBtn = document.getElementById('close-cookies');

  if(getCookie('cookieConsent')) {
    banner.style.display = 'none';
  }

  acceptBtn.addEventListener('click', () => {
    setCookie('cookieConsent', 'accepted', 365);
    banner.style.display = 'none';
  });

  rejectBtn.addEventListener('click', () => {
    setCookie('cookieConsent', 'rejected', 365);
    banner.style.display = 'none';
    alert("Cookies rejected. Some features may not work properly.");
  });

  closeBtn.addEventListener('click', () => {
    banner.style.display = 'none';
  });

  // ------------------ Reservation ------------------
  const reservationForm = document.querySelector('.reservation-form');
  const reservationDetails = document.getElementById('reservation-details');
  const cancelBtn = document.getElementById('cancel-reservation');

  function saveReservation(name, guests) {
    const reservationText = `Name: ${name}, Guests: ${guests}`;
    if (getCookie('cookieConsent') === 'accepted') {
      setCookie('reservation', reservationText, 7);
    } else {
      localStorage.setItem("reservation", reservationText);
    }
  }

  function loadReservation() {
    if (getCookie('cookieConsent') === 'accepted') {
      return getCookie('reservation');
    } else {
      return localStorage.getItem("reservation");
    }
  }

  function showReservation() {
    const reservation = loadReservation();
    if (reservation) {
      reservationDetails.textContent = reservation;
    } else {
      reservationDetails.textContent = "No reservation found.";
    }
  }

  reservationForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const guests = document.getElementById('guests').value;
    saveReservation(name, guests);
    showReservation();
  });

  cancelBtn.addEventListener('click', () => {
    document.cookie = "reservation=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("reservation");
    showReservation();
  });

  // Initialize reservation on page load
  showReservation();
});

/*mahfuz*/
document.addEventListener("DOMContentLoaded", () => {
  console.log("British Cuisine page loaded.");

  let cart = [];
  const cartLink = document.querySelector('a[href="#cart"]');
  const cartCount = document.getElementById("cart-count");


  const cartPopup = document.createElement("div");
  cartPopup.id = "cart-popup";
  cartPopup.style.position = "fixed";
  cartPopup.style.top = "80px";
  cartPopup.style.right = "20px";
  cartPopup.style.background = "#fff";
  cartPopup.style.border = "1px solid #ccc";
  cartPopup.style.padding = "15px";
  cartPopup.style.borderRadius = "8px";
  cartPopup.style.width = "320px";
  cartPopup.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  cartPopup.style.display = "none";
  cartPopup.style.zIndex = "2000";
  cartPopup.innerHTML = "<h3>Cart</h3><p>No items yet.</p>";
  document.body.appendChild(cartPopup);

  function updateCartDisplay() {
    if (cart.length === 0) {
      cartPopup.innerHTML = "<h3>Cart</h3><p>No items yet.</p>";
      cartLink.classList.remove("has-items");
      cartCount.textContent = 0;
      return;
    }

    cartLink.classList.add("has-items");
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

    let html = "<h3>Cart</h3><ul style='list-style:none; padding:0;'>";
    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;

      html += `
        <li style="display:flex; align-items:center; margin-bottom:10px; border-bottom:1px solid #ddd; padding-bottom:5px;">
          <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; object-fit:cover; margin-right:10px; border-radius:5px;">
          <div style="flex:1;">
            <strong>${item.name}</strong><br>
            Qty: ${item.qty} × £${item.price.toFixed(2)}<br>
            <span style="font-weight:bold;">£${itemTotal.toFixed(2)}</span>
          </div>
          <button onclick="removeFromCart(${index})" style="background:red; color:white; border:none; padding:5px 8px; cursor:pointer; border-radius:4px;">X</button>
        </li>
      `;
    });

    html += `</ul><p><strong>Total: £${total.toFixed(2)}</strong></p>`;
    cartPopup.innerHTML = html;
  }

  window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartDisplay();
  };

  cartLink.addEventListener("click", (e) => {
    e.preventDefault();
    cartPopup.style.display = cartPopup.style.display === "none" ? "block" : "none";
  });

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      const name = product.querySelector("h3").textContent;
      const price = parseFloat(product.querySelector(".price").textContent.replace("£", ""));
      const qty = parseInt(product.querySelector(".qty").value);
      const image = product.querySelector("img").src;

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({ name, price, qty, image });
      }

      updateCartDisplay();
      alert(`${qty} × ${name} added to cart!`);
    });
  });

  document.addEventListener("click", (e) => {
    if (!cartPopup.contains(e.target) && !e.target.closest('a[href="#cart"]')) {
      cartPopup.style.display = "none";
    }
  });
});
/*jony js*/
document.addEventListener("DOMContentLoaded", () => {
  console.log("Indian Cuisine page loaded.");
 
  let cart = [];
  const cartLink = document.querySelector('a[href="#cart"]');
  cartLink.classList.add("cart-link");

  const cartPopup = document.createElement("div");
  cartPopup.id = "cart-popup";
  Object.assign(cartPopup.style, {
    position: "fixed",
    top: "80px",
    right: "20px",
    background: "#fff",
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
    width: "320px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    display: "none",
    zIndex: "2000",
  });
  cartPopup.innerHTML = "<h3>Cart</h3><p>No items yet.</p>";
  document.body.appendChild(cartPopup);

  function updateCartDisplay() {
    if (cart.length === 0) {
      cartPopup.innerHTML = "<h3>Cart</h3><p>No items yet.</p>";
      cartLink.classList.remove("has-items"); 
      return;
    }

    let html = "<h3>Cart</h3><ul style='list-style:none; padding:0;'>";
    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;

      html += `
        <li style="display:flex; align-items:center; margin-bottom:10px; border-bottom:1px solid #ddd; padding-bottom:5px;">
          <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; object-fit:cover; margin-right:10px; border-radius:5px;">
          <div style="flex:1;">
            <strong>${item.name}</strong><br>
            Qty: ${item.qty} × £${item.price.toFixed(2)}<br>
            <span style="font-weight:bold;">£${itemTotal.toFixed(2)}</span>
          </div>
          <button onclick="removeFromCart(${index})" style="background:red; color:white; border:none; padding:5px 8px; cursor:pointer; border-radius:4px;">X</button>
        </li>
      `;
    });

    html += `</ul><p><strong>Total: £${total.toFixed(2)}</strong></p>`;
    cartPopup.innerHTML = html;
    cartLink.classList.add("has-items"); 
  }

  window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartDisplay();
  };

  document.querySelector('a[href="#cart"]').addEventListener("click", (e) => {
    e.preventDefault();
    cartPopup.style.display = cartPopup.style.display === "none" ? "block" : "none";
  });

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      const name = product.querySelector("h3").textContent;
      const price = parseFloat(product.querySelector(".price").textContent.replace("£", ""));
      const qty = parseInt(product.querySelector(".qty").value) || 1;
      const image = product.querySelector("img").src;

      if (qty < 1) {
        alert("Quantity must be at least 1");
        return;
      }

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({ name, price, qty, image });
      }

      updateCartDisplay();
      alert(`${qty} × ${name} added to cart!`);
    });
  });

  document.addEventListener("click", (e) => {
    if (!cartPopup.contains(e.target) && !e.target.closest('a[href="#cart"]')) {
      cartPopup.style.display = "none";
    }
  });

  // Review System
  const productReviews = JSON.parse(localStorage.getItem("productReviews")) || {};

  // Adding a review
  document.querySelectorAll('.submit-review').forEach(button => {
    button.addEventListener('click', (e) => {
      const productDiv = e.target.closest('.product');
      const productName = productDiv.querySelector("h3").textContent;
      const reviewText = productDiv.querySelector('.review').value.trim();

      if (reviewText) {
        if (!productReviews[productName]) {
          productReviews[productName] = [];
        }
        productReviews[productName].push(reviewText);
        localStorage.setItem("productReviews", JSON.stringify(productReviews));

        const reviewList = productDiv.querySelector('.review-list');
        const reviewItem = document.createElement('li');
        reviewItem.classList.add('review-item');
        reviewItem.textContent = reviewText;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-review');
        deleteBtn.onclick = () => deleteReview(productName, reviewText, reviewItem);
        reviewItem.appendChild(deleteBtn);
        reviewList.appendChild(reviewItem);

        productDiv.querySelector('.review').value = ''; // Clear the review input
      } else {
        alert('Please write a review before submitting.');
      }
    });
  });

  // Display saved reviews
  document.querySelectorAll('.reviews').forEach(reviewSection => {
    const productDiv = reviewSection.closest('.product');
    const productName = productDiv.querySelector("h3").textContent;

    const reviewList = reviewSection.querySelector('.review-list');
    if (productReviews[productName]) {
      productReviews[productName].forEach(review => {
        const reviewItem = document.createElement('li');
        reviewItem.classList.add('review-item');
        reviewItem.textContent = review;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-review');
        deleteBtn.onclick = () => deleteReview(productName, review, reviewItem);
        reviewItem.appendChild(deleteBtn);
        reviewList.appendChild(reviewItem);
      });
    }
  });

  // Function to delete a review
  function deleteReview(productName, reviewText, reviewItem) {
    // Remove the review from local storage
    const reviewIndex = productReviews[productName].indexOf(reviewText);
    if (reviewIndex !== -1) {
      productReviews[productName].splice(reviewIndex, 1);
      localStorage.setItem("productReviews", JSON.stringify(productReviews));
    }

    // Remove the review from the page
    reviewItem.remove();
  }
});
// Star Rating Functionality
document.querySelectorAll('.product').forEach(product => {
  const stars = product.querySelectorAll('.star');
  let selectedRating = 0;

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      selectedRating = index + 1;
      updateStars(stars, selectedRating);
    });
  });

  function updateStars(stars, rating) {
    stars.forEach((star, idx) => {
      if (idx < rating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }
});