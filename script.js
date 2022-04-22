//Comments are for personal note-taking/studying
const homeBtn = document.querySelector('#home')
const productsBtn = document.querySelector('#products')
const aboutBtn = document.querySelector('#about')
const cartBtn = document.querySelector('#cart')
const cartVal = document.querySelector('#cartVal')


fetch("products.json") //fetches the array of objects stored within json file
.then(function(response){ //passes a function as an argument that takes in the fetch's promise response and assigns it to variable 'response'
   return response.json(); //parses the response into a json format (using json() method) and returns it
})
.then(function(data){ //bc then method also uses responses, we take in the output once again, naming the variable 'data' this time)
   localStorage.setItem("products", JSON.stringify(data)); //calling localStorage object and using setItem method (which takes argument pairs of key, value) and then stringifying it bc local storage only takes strings
   if(!localStorage.getItem("cart")){ //checking if there is already a cart key in local storage
      localStorage.setItem("cart", "[]"); //if localStorage.getItem('cart') is not truthy, we create a key of cart with an empty array within local storage
   }
   if (localStorage.getItem('cart')== '[]') {
     cartVal.innerHTML = 'Empty'
     console.log(JSON.parse(localStorage.getItem("cart")).length)
   } else {
      cartVal.innerHTML = JSON.parse(localStorage.getItem("cart")).length+' item(s)'
   }
});

let products = JSON.parse(localStorage.getItem("products")); //creates objects (with json format) out of any local storage keys of 'product'
let cart = JSON.parse(localStorage.getItem("cart")); //same as above but with 'cart'
console.log(products)

function addItemToCart(productId){
  let product = products.find(function(item){
     return item.id == productId;
  });

  if(cart.length == 0){
     cart.push(product);
  }else{
     let res = cart.find(element => element.id == productId);
     if(res === undefined){
        cart.push(product);
     }
  }
  localStorage.setItem("cart", JSON.stringify(cart)); //we update the local storage's cart key to include our new object
  if (localStorage.getItem('cart')== '[]') {
    cartVal.innerHTML = 'Empty'
    console.log(JSON.parse(localStorage.getItem("cart")).length)
  } else {
     cartVal.innerHTML = JSON.parse(localStorage.getItem("cart")).length+'item(s)'
  }
  console.log('cart is '+localStorage.getItem('cart'))
}

function removeItemFromCart(productId){
    let tempCart = cart.filter(item => item.id != productId); //searches for product within cart and crates copy of cart without that item (from product id given in function parameter)
    localStorage.setItem("cart", JSON.stringify(tempCart)); //sets the local storage cart key to equal of copied cart (that has the item removed)
 }

 const container = document.getElementById('productSection');

products.forEach((result) => {
  // Create card element
  const card = document.createElement("div");
  card.classList = "card-body";


  // Construct card content
  const content = `
    <div class="card">
    <div class="row">
      <div class="el-wrapper">
        <div class="box-up">
          <img class="img" src="${result.image}" alt="" height="175px">
          <div class="img-info">
            <div class="info-inner">
              <span class="p-name">${result.title}</span>
              <span class="p-company">${result.rating.rate} / 5</span>
            </div>
            <div class="a-size">
            <span class='description' style="font-size: smaller;">${result.description}</span>
            <hr />
            <span class="size">Price: $${(result.price).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div class="box-down">
          <div class="h-bg">
            <div class="h-bg-inner"></div>
          </div>

          <a class="cart" id="${result.id}" href="#">
            <span class="price" id="${result.id}">$${(result.price).toFixed(2)}</span>
            <span class="add-to-cart" id="${result.id}">
              <span class="txt" id="${result.id}">Add to cart</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
  `;

  // Append newyly created card element to the container
  container.innerHTML += content;
});

document.querySelectorAll('.cart').forEach(item => {
  item.addEventListener('click', event => {
    let itemID = parseInt(event.target.id)-1
    addItemToCart(itemID)
  })
})