const homeBtn = document.querySelector('#home')
const productsBtn = document.querySelector('#products')
const aboutBtn = document.querySelector('#about')
const cartBtn = document.querySelector('.cartBtn')
const cartVal = document.querySelector('#cartVal')
const cartDropdown = document.querySelector('.dropdown-menu')
const allProducts = document.querySelector('#allProducts')
const womensProducts = document.querySelector('#womensProducts')
const mensProducts = document.querySelector('#mensProducts')
const electronicProducts = document.querySelector('#eletronicProducts')


fetch("products.json")
.then(function(response){
   return response.json();
})
.then(function(data){
   localStorage.setItem("products", JSON.stringify(data));
   if(!localStorage.getItem("cart")){
      localStorage.setItem("cart", "[]");
   }
   if (localStorage.getItem('cart')== '[]') {
     cartVal.innerHTML = 'Empty'
     console.log(JSON.parse(localStorage.getItem("cart")).length)
   } else {
      cartVal.innerHTML = JSON.parse(localStorage.getItem("cart")).length+' item(s)'
   }
});

let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));
let mensClothing = products.filter(element => element.category == "men's clothing")

cartBtn.addEventListener('click', function () {
  cartDropdown.innerHTML = ''
  const count = `<li style="text-align: center; font-size: larger;"><b>${cart.length} item(s)</b></li><hr>
  <thead>`
    console.log(cart)
  cartDropdown.innerHTML = count
  let totalVal = 0
  cart.forEach((result) => {
    const cont = 
    `<tr style="border-top-width: 3px;">
    <td class="tg-0pky"><img class="img" src="${result.image}" alt="" height="35px"></img></td>
    <td class="tg-0pky">${result.title}</td>
    <td class="tg-0pky">$${result.price.toFixed(2)}</td>
    <td class="tg-0pky"> 1 </td>
    <td class="tg-0lax"><button class="remove" id="${result.id}">Remove</button></td>
    </tr>
    <tr><td colspan="5" style="font-size: 10px;">${result.description}</td></tr>`
    cartDropdown.innerHTML += cont;
    totalVal += result.price
  });
  const total = 
  `</thead>
  <hr><li style="text-align: center; font-size: larger; margin-left: 5px; margin-right: 5px;"><b>Total: $${totalVal.toFixed(2)}</b></li>`
  cartDropdown.innerHTML += total;
})

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
     } else {
       return alert('Item is already in cart.')
     }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  if (localStorage.getItem('cart')== '[]') {
    cartVal.innerHTML = 'Empty'
    console.log(JSON.parse(localStorage.getItem("cart")).length)
  } else {
     cartVal.innerHTML = JSON.parse(localStorage.getItem("cart")).length+' item(s)'
  }
}

function removeItemFromCart(productId){
    let tempCart = cart.filter(item => item.id != productId);
    localStorage.setItem("cart", JSON.stringify(tempCart));
 }
 console.log(cart)


 document.querySelectorAll('table').forEach(item => {
  item.addEventListener('click', event => {
    removeItemFromCart(event.target.id)
    console.log(event.target.id)
    console.log('testing #2')
    location.reload()
  })
})


const container = document.getElementById('productSection');

const listProducts = (productsParam) => {
container.innerHTML = ''

productsParam.forEach((result) => {

  const card = document.createElement("div");
  card.classList = "card-body";

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
  container.innerHTML += content;
});
}

document.querySelectorAll('.cart').forEach(item => {
  item.addEventListener('click', event => {
    let itemID = parseInt(event.target.id)
    addItemToCart(itemID)
  })
})

productsBtn.addEventListener('click', function () {
  console.log('click-productsBtn')
  productsBtn.style.borderBottom = "2px solid #48608c"
  listProducts(products)
})

allProducts.addEventListener('click', function () {
  console.log('clicked-allProducts')
  allProducts.style.borderBottom = "1px solid aliceblue"
})