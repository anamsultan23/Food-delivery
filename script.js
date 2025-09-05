// Global variables
let cart = [];
let cartCount = 0;

// Food data with Indian Rupee pricing
const foodItems = [
    { id: 1, name: 'Margherita Pizza', category: 'pizza', price: 299, icon: '🍕', description: 'Classic tomato, mozzarella, and basil' },
    { id: 2, name: 'Beef Burger', category: 'burger', price: 199, icon: '🍔', description: 'Juicy beef patty with fresh toppings' },
    { id: 3, name: 'Salmon Roll', category: 'sushi', price: 399, icon: '🍣', description: 'Fresh salmon with avocado and cucumber' },
    { id: 4, name: 'Chocolate Cake', category: 'dessert', price: 149, icon: '🍰', description: 'Rich chocolate cake with ganache' },
    { id: 5, name: 'Pepperoni Pizza', category: 'pizza', price: 349, icon: '🍕', description: 'Spicy pepperoni with extra cheese' },
    { id: 6, name: 'Chicken Burger', category: 'burger', price: 179, icon: '🍔', description: 'Grilled chicken breast with mayo' },
    { id: 7, name: 'Tuna Roll', category: 'sushi', price: 329, icon: '🍣', description: 'Fresh tuna with spicy mayo' },
    { id: 8, name: 'Ice Cream', category: 'dessert', price: 99, icon: '🍦', description: 'Creamy vanilla with toppings' }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayFoodItems(foodItems);
    updateCartDisplay();
});

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// Display food items
function displayFoodItems(items) {
    const grid = document.getElementById('featuredGrid');
    grid.innerHTML = '';
    
    items.forEach(item => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.innerHTML = `
            <div class="food-image">${item.icon}</div>
            <div class="food-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="food-price">
                    <span class="price">₹${item.price}</span>
                    <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>
        `;
        grid.appendChild(foodCard);
    });
}

// Add to cart function
function addToCart(itemId) {
    const item = foodItems.find(food => food.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...item, quantity: 1});
    }
    
    cartCount++;
    updateCartDisplay();
    showAddedToCartAnimation();
}

// Update cart display
function updateCartDisplay() {
    document.getElementById('cartCount').textContent = cartCount;
}

// Show added to cart animation
function showAddedToCartAnimation() {
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
}

// Open cart modal
function openCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.innerHTML = '';
    } else {
        let itemsHtml = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemsHtml += `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 10px;">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>₹${item.price} x ${item.quantity}</small>
                    </div>
                    <div>
                        <strong>₹${itemTotal}</strong>
                        <button onclick="removeFromCart(${item.id})" style="margin-left: 1rem; background: #ff6b6b; color: white; border: none; padding: 0.5rem; border-radius: 5px; cursor: pointer;">Remove</button>
                    </div>
                </div>
            `;
        });
        
        cartItems.innerHTML = itemsHtml;
        cartTotal.innerHTML = `<h3>Total: ₹${total}</h3>`;
    }
    
    modal.style.display = 'block';
}

// Close cart modal
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Remove from cart
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        cartCount -= cart[itemIndex].quantity;
        cart.splice(itemIndex, 1);
        updateCartDisplay();
        openCart(); // Refresh cart display
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Thank you for your order! Your delicious food will be delivered in 30 minutes or less.');
    cart = [];
    cartCount = 0;
    updateCartDisplay();
    closeCart();
}

// Search function
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm.trim() === '') {
        displayFoodItems(foodItems);
        return;
    }
    
    const filteredItems = foodItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );
    
    displayFoodItems(filteredItems);
    document.getElementById('featured').scrollIntoView();
}

// Filter by category
function filterByCategory(category) {
    const filteredItems = foodItems.filter(item => item.category === category);
    displayFoodItems(filteredItems);
    document.getElementById('featured').scrollIntoView();
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Search on Enter key
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        closeCart();
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});