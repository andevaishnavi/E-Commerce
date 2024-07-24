document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-item');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');
    const cardTitles = document.querySelectorAll('.card--title');
    const prices = document.querySelectorAll('.price');
    const checkoutButton = document.querySelector('.checkout-btn');

    checkoutButton.addEventListener('click', () => {
        /*alert("Thank you! Your order has been placed successfully.");*/
        window.location.href = 'thank_you_page.html';
    });

    
    const searchInput = document.querySelector('.search--box input');
    const cards = document.querySelectorAll('.card');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        cards.forEach(card => {
            const title = card.querySelector('.card--title').textContent.trim().toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    
    
    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: cardTitles[index].textContent.trim(),
                price: parseFloat(prices[index].textContent.trim().slice(1)),
                quantity: 1,
            };

            const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
            if(existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push(item);
            }

            totalAmount += item.price;
            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.length);
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartItemCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
            <div class="individual-cart-item">
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="cart-items-price">₹${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-times"></i></button>
            </div>
            `;
            cartItemsList.append(cartItem);
        });

       
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        const removedItem = cartItems.splice(index, 1)[0];
        totalAmount -= removedItem.price * removedItem.quantity;
        updateCartUI();
    }

    function updateCartTotal() {
        cartTotal.textContent = `₹${totalAmount.toFixed(2)}`;
    }

    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    const closeButton = document.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});



