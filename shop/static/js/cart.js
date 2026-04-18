console.log('Cart JS Loaded')
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cartContainer");

function showCart() {
    container.innerHTML = "";

    cart.forEach((item, index) => {
        item.quantity = item.quantity || 1;

        container.innerHTML += `
            <div>
                <h3>${item.name}</h3>

                <p class="price">₹${item.price}</p>

                <div class="qty-controls">
                    <button onclick="decreaseQty(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQty(${index})">+</button>
                </div>

                <p>Subtotal: ₹${item.price * item.quantity}</p>

                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    // total update
    let total = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
    document.getElementById("totalPrice").innerText = "Total: ₹" + total;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart(); 
}

function placeOrder() {
    let total = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    fetch('/place-order/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: cart, total: total })
    })
    .then(res => res.json())
    .then(data => {
        alert("Order placed successfully! ✅");

        localStorage.removeItem("cart");
        showCart();

        window.location.href = "/my-orders/";
    })
    .catch(err => {
        console.error(err);
        alert("Something went wrong ❌");
    });
}

showCart();

function increaseQty(index) {
    cart[index].quantity += 1;
    updateCart();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1); // remove if quantity becomes 0
    }
    updateCart();
}

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}