let dataInfo = [];
let searchText = "";
let results = "";

const resultTemplate = (info) =>{
    return(
        `<div class="item">
        <img src="${info.image}"  alt="">
              
        <h2>${info.name}</h2>

        <div class="price">Rs.${info.price}</div>
       
       
        <button class="addCart" onclick="addToCartItem(${info.id})">Add To Bag</button>
        <span class="heart-icon" onclick="addToWishlist(${info.id});toggleHeartColor()">&#10084;</span>
    
        </div>
        `
    );
}

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


const jsonData= () => {

    fetch('products.json')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            dataInfo = data;
        })
}
jsonData();
const textSearched = () => {
    searchText = document.getElementById("searchInput").value;
    results = "";

    dataInfo.forEach((info) => {
        if (info.tags.includes(searchText))
            results += resultTemplate(info);
    })
    if (results === "") {
        document.getElementById('searchResult').innerHTML = "No Results Found";
    } else {
        document.getElementById('searchResult').innerHTML = results;
    }
}