const productsBtn = document.querySelector("#products");
const cartBtn = document.querySelector(".cartBtn");
const cartVal = document.querySelector("#cartVal");
const cartDropdown = document.querySelector(".dropdown-menu");
const formSend = document.querySelector("#formSend");

fetch("../products-page/products.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    localStorage.setItem("products", JSON.stringify(data));
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
    if (localStorage.getItem("cart") === "[]") {
      cartVal.innerHTML = "Empty";
      console.log(JSON.parse(localStorage.getItem("cart")).length);
    } else {
      cartVal.innerHTML =
        JSON.parse(localStorage.getItem("cart")).length + " item(s)";
    }
  });

let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));
let mensClothing = products.filter(
  (element) => element.category === "men's clothing"
);
let womensClothing = products.filter(
  (element) => element.category === "women's clothing"
);
let electronics = products.filter(
  (element) => element.category == "electronics"
);

cartBtn.addEventListener("click", function () {
  cart = JSON.parse(localStorage.getItem("cart"));
  cartDropdown.innerHTML = "";
  const count = `<li style="text-align: center; font-size: larger;"><b>${cart.length} item(s)</b></li><hr>
  <thead>`;
  console.log("click-cartOpen");
  cartDropdown.innerHTML = count;
  let totalVal = 0;
  cart.forEach((result) => {
    const cont = `<tr style="border-top-width: 3px;">
    <td class="tg-0pky"><img class="img" src="${
      result.image
    }" alt="" height="35px"></img></td>
    <td class="tg-0pky">${result.title}</td>
    <td class="tg-0pky">$${result.price.toFixed(2)}</td>
    <td class="tg-0pky"> 1 </td>
    <td class="tg-0lax"><button class="remove" id="${
      result.id
    }">Remove</button></td>
    </tr>
    <tr><td colspan="5" style="font-size: 10px;">${
      result.description
    }</td></tr>`;
    cartDropdown.innerHTML += cont;
    totalVal += result.price;
  });
  const total = `</thead>
  <hr><li style="text-align: center; font-size: larger; margin-left: 5px; margin-right: 5px;"><b>Total: $${totalVal.toFixed(
    2
  )}</b></li>`;
  cartDropdown.innerHTML += total;
  if (localStorage.getItem("cart") == "[]") {
    cartVal.innerHTML = "Empty";
    console.log(JSON.parse(localStorage.getItem("cart")).length);
  } else {
    cartVal.innerHTML =
      JSON.parse(localStorage.getItem("cart")).length + " item(s)";
  }
});

function addItemToCart(productId) {
  let product = products.find(function (item) {
    return item.id == productId;
  });

  if (cart.length == 0) {
    cart.push(product);
  } else {
    let res = cart.find((element) => element.id == productId);
    if (res === undefined) {
      cart.push(product);
    } else {
      return alert("Pat's Products allows the purchase of one item per customer to create a calm and stress-free experience.");
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  if (localStorage.getItem("cart") == "[]") {
    cartVal.innerHTML = "Empty";
    console.log(JSON.parse(localStorage.getItem("cart")).length);
  } else {
    cartVal.innerHTML =
      JSON.parse(localStorage.getItem("cart")).length + " item(s)";
  }
}

function removeItemFromCart(productId) {
  let tempCart = cart.filter((item) => item.id != productId);
  localStorage.setItem("cart", JSON.stringify(tempCart));
  cartBtn.click();
}
console.log(cart);

document.querySelectorAll("table").forEach((item) => {
  item.addEventListener("click", (event) => {
    removeItemFromCart(event.target.id);
  });
});

formSend.addEventListener("click", function () {
  return alert('Thank you for your feedback!')
});