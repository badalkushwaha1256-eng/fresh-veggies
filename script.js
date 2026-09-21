// =========================
// LOGIN CHECK
// =========================

const isLoggedIn =
    localStorage.getItem("freshVeggiesLoggedIn");

if (isLoggedIn !== "true") {

    window.location.href = "login.html";

}


// =========================
// SHOW USER NAME
// =========================

const savedUser =
    JSON.parse(
        localStorage.getItem("freshVeggiesUser")
    );

const welcomeUser =
    document.getElementById("welcomeUser");

if (savedUser && welcomeUser) {

    welcomeUser.textContent =
        "👤 Welcome, " + savedUser.name;

}


// =========================
// LOGOUT
// =========================

function logout() {

    localStorage.removeItem(
        "freshVeggiesLoggedIn"
    );

    window.location.href =
        "login.html";

}


const cards = document.querySelectorAll(".card");

let cart = [];


// =========================
// VEGETABLE PRICES
// =========================

const vegetablePrices = {
    "Potato": 30,
    "Tomato": 40,
    "Onion": 35,
    "Carrot": 50,
    "Cucumber": 40,
    "Pea": 40,
    "Brinjal": 40,
    "Capsicum": 100,
    "Broccoli": 50,
    "Chilli": 100,
    "Lady Finger": 30
};


// =========================
// SELECT WEIGHT
// =========================

function selectWeight(name, weight, clickedButton) {

    const pricePerKg = vegetablePrices[name];

    const price = (pricePerKg / 1000) * weight;

    let weightText;

    if (weight === 250) {
        weightText = "250g";
    }
    else if (weight === 500) {
        weightText = "500g";
    }
    else {
        weightText = "1kg";
    }

    const selectedCard = [...cards].find(card =>
        card.querySelector("h3").textContent.includes(name)
    );

    if (!selectedCard) {
        return;
    }

    selectedCard.dataset.selectedWeight = weight;
    selectedCard.dataset.selectedPrice = price;
    selectedCard.dataset.weightText = weightText;

    const weightButtons =
        selectedCard.querySelectorAll(".weight-options button");

    weightButtons.forEach(function(button) {
        button.style.backgroundColor = "#087443";
        button.style.color = "white";
    });

    clickedButton.style.backgroundColor = "#065c35";

    alert(
        name +
        " " +
        weightText +
        " selected\nPrice: ₹" +
        price.toFixed(2)
    );
}


// =========================
// ADD TO CART
// =========================

cards.forEach(function(card) {

    const button = card.querySelector(".add-to-cart");

    if (!button) {
        return;
    }

    button.addEventListener("click", function() {

        const name =
            card.querySelector("h3").textContent.trim();

        let price;
        let weightText;

        if (card.dataset.selectedWeight) {

            price =
                parseFloat(card.dataset.selectedPrice);

            weightText =
                card.dataset.weightText;

        }
        else {

            price =
                vegetablePrices[name] || 0;

            weightText = "1kg";
        }

        const existingItem = cart.find(
            item =>
                item.name === name &&
                item.weight === weightText
        );

        if (existingItem) {

            existingItem.quantity++;

        }
        else {

            cart.push({
                name: name,
                price: price,
                weight: weightText,
                quantity: 1
            });

        }

        showCart();

    });

});


// =========================
// SHOW CART
// =========================

function showCart() {

    const cartItems =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("total");

    const cartCount =
        document.getElementById("cartCount");


    // CART COUNT

    let itemCount = 0;

    cart.forEach(function(item) {
        itemCount += item.quantity;
    });

    if (cartCount) {
        cartCount.textContent = itemCount;
    }


    // CART ITEMS

    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const div =
            document.createElement("div");


        div.innerHTML = `

            <div class="cart-item">

                <span>
                    ${item.name} - ${item.weight}
                </span>

                <div class="quantity">

                    <button
                        type="button"
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <b>
                        ${item.quantity}
                    </b>

                    <button
                        type="button"
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <strong>
                    ₹${itemTotal.toFixed(2)}
                </strong>

                <button
                    class="remove-btn"
                    type="button"
                    onclick="removeItem(${index})">
                    🗑️
                </button>

            </div>

        `;

        cartItems.appendChild(div);

    });


    totalElement.textContent =
        total.toFixed(2);

}


// =========================
// PLUS
// =========================

function increaseQuantity(index) {

    cart[index].quantity++;

    showCart();

}


// =========================
// MINUS
// =========================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }
    else {

        cart.splice(index, 1);

    }

    showCart();

}


// =========================
// REMOVE
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    showCart();

}


// =========================
// CHECKOUT
// =========================

const checkoutBtn =
    document.getElementById("checkoutBtn");


if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function() {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        window.location.href =
            "checkout.html";

    });

}


// =========================
// SEARCH VEGETABLE
// =========================

const searchInput =
    document.querySelector(".search input");


if (searchInput) {

    searchInput.addEventListener("input", function() {

        const searchText =
            searchInput.value.toLowerCase().trim();

        cards.forEach(function(card) {

            const vegetableName =
                card.querySelector("h3").textContent.toLowerCase();

            if (vegetableName.includes(searchText)) {

                card.style.display = "";

            }
            else {

                card.style.display = "none";

            }

        });

    });

}

// =========================
// GO TO CART
// =========================

function goToCart() {

    const cartSection = document.querySelector(".cart");

    if (cartSection) {
        cartSection.scrollIntoView({
            behavior: "smooth"
        });
    }

}