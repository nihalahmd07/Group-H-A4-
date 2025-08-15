document.addEventListener("DOMContentLoaded", () => {
  console.log("British Cuisine page loaded.");

  let cart = [];

  // Create popup cart container (hidden initially)
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
  }

  // Remove item from cart
  window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartDisplay();
  };

  // Toggle popup when clicking "Cart"
  document.querySelector('a[href="#cart"]').addEventListener("click", (e) => {
    e.preventDefault();
    cartPopup.style.display = cartPopup.style.display === "none" ? "block" : "none";
  });

  // Add to cart buttons
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

  // Optional: close popup when clicking outside
  document.addEventListener("click", (e) => {
    if (!cartPopup.contains(e.target) && !e.target.closest('a[href="#cart"]')) {
      cartPopup.style.display = "none";
    }
  });
});
