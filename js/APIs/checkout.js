let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));
viewProductsCheckout(cart);
getAllTotalItem(cart);
function getTotalOneItem(price, quantity) {
  return parseFloat(price * quantity);
}

// Tính tổng tiền các sản phẩm trong giỏ hàng
function getAllTotalItem(cart) {
  let total = document.getElementById("checkout-total-all");
  let temp = cart.map(function (item) {
    let x = parseInt(item.product.price * item.quantity);
    return x;
  });
  let sum = temp.reduce(function (prev, next) {
    return prev + next;
  }, 0);
  total.innerHTML = sum + " VNĐ";
}

function viewProductsCheckout(shoppingCart) {
  let listProductBlock = document.querySelector(".checkout__total__products");
  let html = shoppingCart
    .map((cart) => {
      var totalItem = getTotalOneItem(cart.product.price, cart.quantity);
      return `
              <li>${cart.product.productName}<span>${totalItem}</span></li>
            `;
    })
    .join("");
  listProductBlock.innerHTML = html;
}

// function showPay(){
//   checkoutCart();
//   const btnPay = document.querySelector('.btn-pay')
//   const containerPay = document.querySelector('.payment')
//   const iconClose = document.querySelector('.payment-close')

//   function showPay() {
//       containerPay.classList.add('open')
//   }

//   function hidePay() {
//       containerPay.classList.remove('open')
//   }
//   // Lang nghe su kien
//   btnPay.addEventListener('click', showPay)
//   iconClose.addEventListener('click', hidePay)

// }

async function checkoutCart() {
  const data = {
    name: document.getElementById("customer-name").value,
    address: document.getElementById("customer-address").value,
    phone: document.getElementById("customer-phone").value,
    email: document.getElementById("customer-email").value,
    note: document.getElementById("customer-note").value,
    total: document.getElementById("checkout-total-all").value,
  };
  if (
    data.name != null &&
    data.address != null &&
    data.phone != null &&
    data.email != null
  ) {
    const option = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
    postOrderDetails(option.id);
  }
}

function removeItemFromCart(productId) {
  cart = cart.filter((element) => element.product.id != productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart(cart);
  getAllTotalItem(cart);
}

async function postOrderDetails(idOrder) {
  let storage = localStorage.getItem("cart");
  if (storage) {
    cart = JSON.parse(storage);
  }
  let orderDetails = [];
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    let orderDetail = {
      order_id: item.idOrder,
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price
    };
    orderDetails.push(orderDetail);
  }
  let promises = orderDetails.map((item) => {
    postOrderDetailsAsync(item)
  });
  await Promise.all(promises);
  localStorage.removeItemFromCart('cart')
  cart = [];
  showCart(cart);
}

async function postOrderDetailsAsync(data) {
  const option = await fetch("http://localhost:3000/orderDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
}
