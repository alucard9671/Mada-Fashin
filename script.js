let cart = [];
let currency = "ZAR";
let currencySymbols = { ZAR: "R", USD: "$", EUR: "€" };
let exchangeRates = { ZAR: 1, USD: 0.053, EUR: 0.049 };

function addToCart(name, price) {
  cart.push({ name, price });
  alert(`${name} added to cart!`);
  updateCart();
}

function toggleCart() {
  document.getElementById("cart-items").classList.toggle("hidden");
}

function updateCart() {
  const list = document.getElementById("cart-list");
  const total = document.getElementById("cart-total");
  list.innerHTML = "";
  let sum = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${formatPrice(item.price)}`;
    list.appendChild(li);
    sum += item.price;
  });
  total.textContent = formatPrice(sum);
}

function checkout() {
  document.getElementById("checkout").classList.remove("hidden");
}

function submitPayment(event) {
  event.preventDefault();
  alert("Thank you for your purchase!");
  cart = [];
  updateCart();
  document.getElementById("checkout").classList.add("hidden");
  document.getElementById("cart-items").classList.add("hidden");
}

function formatPrice(price) {
  const converted = price * exchangeRates[currency];
  return currencySymbols[currency] + converted.toFixed(2);
}

document.getElementById("currency-selector").addEventListener("change", e => {
  currency = e.target.value;
  document.querySelectorAll(".price-display").forEach(el => {
    const basePrice = parseFloat(el.dataset.price);
    el.textContent = formatPrice(basePrice);
  });
  updateCart();
});

function togglePaymentInputs() {
  const method = document.getElementById("payment-method").value;
  document.getElementById("card-details").style.display = method === "card" ? "flex" : "none";
  document.getElementById("paypal-details").style.display = method === "paypal" ? "flex" : "none";
}

// Initialize default visibility
togglePaymentInputs();
