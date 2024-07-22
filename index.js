const api = "https://dummyjson.com/products";

let products = [];
let cart = []; 


async function fetchData() {
  try {
    const response = await fetch(api);
    const { products: fetchedProducts } = await response.json();
    products = fetchedProducts; 
    console.log("Products loaded:", products);

    const cartData = localStorage.getItem('cart');
    if (cartData) {
      cart = JSON.parse(cartData); 
      console.log("Cart restored from localStorage:", cart);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log("Cart saved to localStorage:", cart);
}


function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (product) {
   
    const itemInCart = cart.find(item => item.product.id === productId);
    if (itemInCart) {
      
      itemInCart.quantity += quantity;
    } else {
      
      cart.push({ product, quantity });
    }
    console.log(`Added ${quantity}x ${product.name} to cart`);
    saveCart(); 
  } else {
    console.error(`Product with ID ${productId} not found`);
  }
}

function removeFromCart(productId) {
  const index = cart.findIndex(item => item.product.id === productId);
  if (index !== -1) {
    cart.splice(index, 1); 
    console.log(`Removed product with ID ${productId} from cart`);
    saveCart(); 
  } else {
    console.error(`Product with ID ${productId} is not in the cart`);
  }
}


function updateCartQuantity(productId, newQuantity) {
  const itemInCart = cart.find(item => item.product.id === productId);
  if (itemInCart) {
    itemInCart.quantity = newQuantity;
    console.log(`Updated quantity of product with ID ${productId} to ${newQuantity}`);
    saveCart(); 
  } else {
    console.error(`Product with ID ${productId} is not in the cart`);
  }
}


function searchProductsByName(query) {
  const searchTerm = query.trim().toLowerCase();
  if (searchTerm === '') {
    console.log("Please enter a valid search term.");
    return [];
  }
  return products.filter(product => product.name.toLowerCase().includes(searchTerm));
}

fetchData().then(() => {

  addToCart(1);
  addToCart(2, 2); 
  console.log("Cart:", cart);

  updateCartQuantity(1, 5); 
  console.log("Updated Cart:", cart);

  removeFromCart(2); 
  console.log("Cart after removal:", cart);

  const searchResults = searchProductsByName("shirt"); 
  console.log("Search results:", searchResults);
});