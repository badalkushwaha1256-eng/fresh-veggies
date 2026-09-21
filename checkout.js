 const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;


// =========================
// SHOW CART ITEMS
// =========================

cart.forEach(function(item) {

    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    const div = document.createElement("div");

    div.innerHTML = `
        <div class="checkout-item">

            <span>
                ${item.name} × ${item.quantity}
                (${item.weight})
            </span>

            <strong>
                ₹${itemTotal.toFixed(2)}
            </strong>

        </div>
    `;

    checkoutItems.appendChild(div);

});


checkoutTotal.textContent = total.toFixed(2);


// =========================
// PLACE ORDER
// =========================

const orderForm =
    document.getElementById("orderForm");


orderForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const mobile =
        document.getElementById("mobile").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const city =
        document.getElementById("city").value.trim();


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    // =========================
    // CREATE ORDER ID
    // =========================

    const orderId =
        "FV" +
        Date.now();


    // =========================
    // CREATE NEW ORDER
    // =========================

    const newOrder = {

        orderId: orderId,

        date: new Date().toLocaleString(),

        name: name,

        mobile: mobile,

        address: address,

        city: city,

        payment: payment,

        status: "Order Confirmed",

        items: cart,

        total: total.toFixed(2)

    };


    orders.push(newOrder);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    // Empty cart

    localStorage.removeItem("cart");


    // Go to success page

    window.location.href =
        "success.html";

});