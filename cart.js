const CART_KEY = 'CART_V1';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
}

export function addItem({ id, name, price, image, qty = 1 }) {
  const cart = getCart();
  const i = cart.findIndex(p => p.id === id);
  if (i >= 0) cart[i].qty += qty;
  else cart.push({ id, name, price, image, qty });
  saveCart(cart);
}

export function removeItem(id) {
  const cart = getCart().filter(p => p.id !== id);
  saveCart(cart);
}

export function setQty(id, qty) {
  const cart = getCart();
  const i = cart.findIndex(p => p.id === id);
  if (i >= 0) {
    cart[i].qty = Math.max(1, qty);
    saveCart(cart);
  }
}

export function clearCart() { saveCart([]); }

export function getSummary() {
  const cart = getCart();
  const count = cart.reduce((s, p) => s + p.qty, 0);
  const total = cart.reduce((s, p) => s + p.qty * Number(p.price || 0), 0);
  return { cart, count, total };
}

export function mountCartBadge(elSelector = '#cartCount') {
  const update = () => {
    const { count } = getSummary();
    const el = document.querySelector(elSelector);
    if (el) el.textContent = count;
  };
  update();
  document.addEventListener('cart:updated', update);
}
