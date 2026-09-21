const ordersList = document.getElementById("ordersList");

let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


// =========================
// SHOW ORDERS
// =========================

function showOrders() {

    ordersList.innerHTML = "";

    if (orders.length === 0) {

        ordersList.innerHTML = `
            <div class="no-orders">
                <h3>📦 No Orders Yet</h3>
                <p>Your orders will appear here.</p>
            </div>
        `;

        return;
    }


    orders.forEach(function(order, index) {

        const div = document.createElement("div");

        div.className = "order-card";


        div.innerHTML = `

            <h3>🧾 Order #${index + 1}</h3>

            <p>
                <strong>🆔 Order ID:</strong>
                ${order.orderId || "Not Available"}
            </p>

            <p>
                <strong>📅 Date:</strong>
                ${order.date}
            </p>

            <p>
                <strong>📦 Status:</strong>
                <span class="order-status-text">
                    ${order.status || "Order Confirmed"}
                </span>
            </p>


            <!-- ORDER TRACKING -->

            <div class="tracking-box">

                <h4>🚚 Order Tracking</h4>

                <div class="tracking-line">

                    <div class="tracking-step ${
                        getStatusStep(order.status) >= 1
                            ? "active"
                            : ""
                    }">
                        <span>🛒</span>
                        <p>Confirmed</p>
                    </div>

                    <div class="tracking-step ${
                        getStatusStep(order.status) >= 2
                            ? "active"
                            : ""
                    }">
                        <span>📦</span>
                        <p>Preparing</p>
                    </div>

                    <div class="tracking-step ${
                        getStatusStep(order.status) >= 3
                            ? "active"
                            : ""
                    }">
                        <span>🚚</span>
                        <p>Out for Delivery</p>
                    </div>

                    <div class="tracking-step ${
                        getStatusStep(order.status) >= 4
                            ? "active"
                            : ""
                    }">
                        <span>✅</span>
                        <p>Delivered</p>
                    </div>

                </div>

            </div>


            <!-- STATUS BUTTONS -->

            <div class="status-buttons">

                <button
                    onclick="updateStatus(${index}, 'Order Confirmed')">

                    🛒 Confirmed

                </button>

                <button
                    onclick="updateStatus(${index}, 'Preparing')">

                    📦 Preparing

                </button>

                <button
                    onclick="updateStatus(${index}, 'Out for Delivery')">

                    🚚 Out for Delivery

                </button>

                <button
                    onclick="updateStatus(${index}, 'Delivered')">

                    ✅ Delivered

                </button>

            </div>


            <p>
                <strong>👤 Name:</strong>
                ${order.name}
            </p>

            <p>
                <strong>📱 Mobile:</strong>
                ${order.mobile}
            </p>

            <p>
                <strong>🏠 Address:</strong>
                ${order.address}
            </p>

            <p>
                <strong>🏙️ City:</strong>
                ${order.city}
            </p>

            <p>
                <strong>💳 Payment:</strong>
                ${order.payment}
            </p>


            <div class="order-items">

                <strong>🛒 Items:</strong>

                ${order.items.map(function(item) {

                    return `
                        <p>
                            ${item.name}
                            × ${item.quantity}
                            (${item.weight})
                            — ₹${(
                                item.price * item.quantity
                            ).toFixed(2)}
                        </p>
                    `;

                }).join("")}

            </div>


            <h3>
                💰 Total: ₹${order.total}
            </h3>


            <button
                class="cancel-order-btn"
                onclick="cancelOrder(${index})">

                ❌ Cancel Order

            </button>

        `;


        ordersList.appendChild(div);

    });

}


// =========================
// GET STATUS STEP
// =========================

function getStatusStep(status) {

    if (status === "Preparing") {
        return 2;
    }

    if (status === "Out for Delivery") {
        return 3;
    }

    if (status === "Delivered") {
        return 4;
    }

    return 1;
}


// =========================
// UPDATE STATUS
// =========================

function updateStatus(index, newStatus) {

    orders[index].status = newStatus;

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    showOrders();

}


// =========================
// CANCEL ORDER
// =========================

function cancelOrder(index) {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this order?"
        );


    if (!confirmCancel) {
        return;
    }


    orders.splice(index, 1);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    alert("Order cancelled successfully!");


    showOrders();

}


// =========================
// INITIAL LOAD
// =========================

showOrders();