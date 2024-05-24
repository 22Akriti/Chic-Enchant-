let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let listWishlistHTML = document.querySelector('.wishlist');
let products = [];
let cart = [];
let wishlist = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

const addToCartItem = (productId) => {
    
    const cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];
    if (!cartItem.includes(productId)) {
        cartItem.push(productId);
        localStorage.setItem('cartItem', JSON.stringify(cartItem));
        alert('Product added to Bag!');
    } else {
        alert('Product is already in the Cart!');
    }

};

const addToWishlist = (productId) => {
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert('Product added to wishlist!');
    } else {
                alert('Product removed!');
                
                removeFromWishlist(productId);
                
                heartIcon.classList.toggle('');
    }

};
const removeFromWishlist = (productId) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(id => id !== productId); // Remove the productId from the wishlist array
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    displayWishlist(); // Refresh the wishlist display
};


function toggleHeart(heartIcon) {
    console.log(1);
    heartIcon.classList.toggle('clicked'); // Toggle the 'clicked' class on the heart icon
    const productId = heartIcon.parentElement.dataset.id;
    const isClicked = heartIcon.classList.contains('clicked');
    console.log(productId);
    removeFromWishlist(productId);

    // Store the click state in localStorage
    const localStorageKey = `heart_${productId}`;
    localStorage.setItem(localStorageKey, isClicked ? 'clicked' : '');
}

const setHeartIconsInitialState = () => {
    const heartIcons = document.querySelectorAll('.heart-icon');
    heartIcons.forEach(heartIcon => {
        const productId = heartIcon.parentElement.dataset.id;
        const localStorageKey = `heart_${productId}`;
        if (localStorage.getItem(localStorageKey) === 'clicked') {
            heartIcon.classList.add('clicked');
        }
    });
};

const toggleHeartColor = () =>{
    if(event.target.classList.includes('clicked')){
        event.target.classList.toggle('clicked',true);
    }else{
        event.target.classList.toggle('clicked',false);
    }
}

// Run the function to set initial state when the page loads
window.addEventListener('load', setHeartIconsInitialState);


    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">Rs. ${product.price}</div>
                <p class="viewDetails">View Details</p>
                <button class="addCart" onclick="addToCartItem(${product.id})">Add To Bag</button>
                <span class="heart-icon" onclick="addToWishlist(${product.id});toggleHeartColor()">&#10084;</span>
                
                `
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })

    document.querySelector('.listProduct').addEventListener('click', (event) => {
        if (event.target.classList.contains('viewDetails')) {
            const productId = event.target.parentElement.dataset.id;
            // Redirect to product details page with product ID as URL parameter
            window.location.href = `product_page.html?id=${productId}`;
        }
    });

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', json.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        if (currentPage=='women') {
            products= data.filter(product => product.id>0 && product.id<=8);
            addDataToHTML();
        } else if (currentPage=='men') {
            products= data.filter(product => product.id>8 && product.id<=16);
            addDataToHTML();
        } 
        else if (currentPage=='spring') {
        products= data.filter(product => product.id>16 && product.id<=24);
        addDataToHTML();
        } 
        else if (currentPage=='fall') {
            products= data.filter(product => product.id>24 && product.id<=32);
            addDataToHTML();
        }
        else if (currentPage=='cosmetic') {
        products= data.filter(product => product.id>32 && product.id<=40);
        addDataToHTML();
        }
        else if (currentPage=='perfumes') {
            products= data.filter(product => product.id>40 && product.id<=48);
            addDataToHTML();
        }
        else if (currentPage=='green') {
            products= data.filter(product => product.id>48 && product.id<=56);
            addDataToHTML();
        }
        else if (currentPage=='bag') {
            products= data.filter(product => product.id>56 && product.id<=64);
            addDataToHTML();
        }
                    
        if(localStorage.getItem('cart')){
            cart = json.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
        
    })
}
initApp();