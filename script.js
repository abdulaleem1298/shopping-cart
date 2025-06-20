// Dummy product data
const products = [
  { id: 1, name: 'T-shirt', price: 500 },
  { id: 2, name: 'Jeans', price: 1000 },
  { id: 3, name: 'Shoes', price: 1500 },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render product list
function renderProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  products.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <h3>${prod.name}</h3>
      <p>₹${prod.price}</p>
      <button onclick="addToCart(${prod.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Add product to cart
function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  renderCart();
}

// Remove product from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

// Change quantity
function updateQuantity(id, change) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(id);
      return;
    }
  }
  saveCart();
  renderCart();
}

// Render cart
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalEl = document.getElementById('total-price');
  cartContainer.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <h4>${item.name}</h4>
      <p>Price: ₹${item.price}</p>
      <p>Qty: ${item.quantity}</p>
      <button onclick="updateQuantity(${item.id}, 1)">+</button>
      <button onclick="updateQuantity(${item.id}, -1)">-</button>
      <button class="remove" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  totalEl.innerText = total;
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Initial render
renderProducts();
renderCart();
