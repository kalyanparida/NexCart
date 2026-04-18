// Dark Mode
const toggleBtn = document.getElementById("darkToggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        toggleBtn.textContent = "☀️ Light Mode";
    } else {
        toggleBtn.textContent = "🌙 Dark Mode";
    }
});


// ADD TO CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.id == id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: id,              
            name: name,
            price: price,
            quantity: 1          
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart 🛒");
}