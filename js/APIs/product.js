// window.addEventListener('load', () => {
const productsAll = "http://localhost:3000/products"; //API Lấy tất cả sản phẩm
const productsTop4 = "http://localhost:3000/top4"; //API lấy top sản phẩm bán chạy

//  Đưa dữ liệu Product từ Json lưu vào Storage
function getProductsFromJson(response) {
  fetch(productsAll)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      localStorage.setItem("products", JSON.stringify(data));
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", "[]");
      }
    });
}

// Tạo nơi lưu trữ local
let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));

// Hàm initial
async function start() {
  await getJsonAllProduct(getAllProduct);
  await getJsonTop4Product(getTop4Product);
  await getProductsFromJson(getAllProduct);
  await showCart(cart);
}

// Lấy dữ liệu từ Json Product
function getJsonAllProduct(data) {
  fetch(productsAll)
    .then(function (response) {
      return response.json();
    })
    .then(data);
}

// Hiển thị dữ liệu Product ra Shop.
function getAllProduct(products) {
  var listProductBlock = document.querySelector(".product-item-all");
  var htmls = products
    .map(function (product) {
      return `
            <a>
            <div class="col-lg-3 col-md-4 col-sm-6" id="product-id-${product.id}">
            <div class="block product no-border z-depth-2-top z-depth-2--hover">
                <div class="block-image">
                    <a href="#">
                        <img src=${product.image} class="img-center">
                    </a>
                    <span class="product-ribbon product-ribbon-right product-ribbon--style-1 bg-blue text-uppercase">${product.brand}</span>
                </div>
                <div class="block-body text-center">
                    <h2 class="product__name">
                        <a href="#">
                            ${product.productName}
                        </a>
                    </h2>
                    <p class="product-description">
                            ${product.price} VNĐ
                    </p>
                    <div class="product-buttons mt-4">
                        <div class="row align-items-center">
                            <div class="col-2">
                                <button type="button" class="btn-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Favorite">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                            <div class="col-10">
                                <button type="button" onclick="addItemToCart(${product.id})" class="add-to-cart btn btn-block btn-primary btn-circle btn-icon-left">
                                    <i class="fa fa-shopping-cart"></i>Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>   
            </a>
            `;
    })
    .join("");
  listProductBlock.innerHTML = htmls;
}


// Các hàm xử lý giỏ hàng

//Hàm thêm sản phẩm vào giỏ hàng
function addItemToCart(productId) {
  // Lấy product trong Local Products
  let product = products.find(function (product) {
    return product.id == productId;
  });

  let isValid = cart.find((c) => c.product.id == productId);
  // Kiểm tra product có trong cart chưa
  if (isValid) {
    isValid.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Hàm xóa một item khổi giỏ hàng
function removeItemFromCart(productId) {
  cart = cart.filter((element) => element.product.id != productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart(cart);
  getAllTotalItem(cart);
}

// Hàm cập nhật sản phẩm
function updateItemCart(productId, quantity) {
  for (let product of cart) {
    if (product.product.id == productId) {
      product.quantity = quantity;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Tính tổng tiền các sản phẩm trong giỏ hàng
function getAllTotalItem(cart) {
  let total = document.getElementById("cart__total");
  let temp = cart.map(function (item) {
    return parseFloat(item.product.price * item.quantity);
  });
  let sum = temp.reduce(function (prev, next) {
    return prev + next;
  }, 0);
  total.innerHTML = sum + " VNĐ";
}

// Tính tổng từng item
function getTotalOneItem(price, quantity) {
  return parseFloat(price * quantity);
}

// Tăng số lượng từng item
function increaseQuantity(id) {
  let seletedId = id;
  let search = cart.find((x) => x.product.id === seletedId);
  search.quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart(cart);
  // updateItemCart(seletedId, search);
}

// Giảm số lượng từng item
function decreaseQuantity(id) {
  let seletedId = id;
  let search = cart.find((x) => x.product.id === seletedId);
  if (search.quantity < 2) {
    search.quantity = 1;
  } else {
    search.quantity -= 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart(cart);
  // updateItemCart(seletedId, search);
}

// Hàm hiển thị giỏ hàng
function showCart(shoppingCart) {
  var cartBody = document.querySelector(".shopping-cart-item");
  let html = shoppingCart
    .map((cart) => {
      var totalItem = getTotalOneItem(cart.product.price, cart.quantity);
      return `
        <tr>
            <td class="product__cart__item">
                <div class="product__cart__item__pic">
                    <img src="${cart.product.image}" alt="">
                </div>
                <div class="product__cart__item__text">
                    <h6>${cart.product.productName}</h6>
                    <h5>${cart.product.price}</h5>
                </div>
            </td>
            <td class="quantity__item">
                <div class="quantity">
                    <div class="pro-qty-2">
                        <span class="fa fa-angle-left dec qtybtn" onclick="decreaseQuantity(${cart.product.id})"></span>
                        <input type="text" value="${cart.quantity}">
                        <span class="fa fa-angle-right inc qtybtn" onclick="increaseQuantity(${cart.product.id})"></span>
                    </div>
                </div>
            </td>
            <td class="cart__price" >
            <p>${totalItem}</p>
            </td>
            <td class="cart__close"><button onclick="removeItemFromCart(${cart.product.id})" style="border-radius: 25%;"><i class="fa fa-close"></i></button></td>
        `;
    })
    .join("");
  cartBody.innerHTML = html;
  getAllTotalItem(cart);
}



// Hiển thị top sản phẩm ở trang index
function getJsonTop4Product(callback) {
  fetch(productsTop4)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

// Render top 4 the product best seller
function getTop4Product(products) {
  var listProductBlock = document.querySelector(".product-item-top-4");
  var htmls = products
    .map(function (product) {
      return `
        <a>
        <div class="col-lg-3 col-md-4 col-sm-6" id="product-id-${product.id}">
        <div class="block product no-border z-depth-2-top z-depth-2--hover">
            <div class="block-image">
                <a href="#">
                    <img src=${product.image} class="img-center">
                </a>
                <span class="product-ribbon product-ribbon-right product-ribbon--style-1 bg-blue text-uppercase">${product.brand}</span>
            </div>
            <div class="block-body text-center">
                <h2 class="product__name">
                    <a href="#">
                        ${product.productName}
                    </a>
                </h2>
                <p class="product-description">
                        ${product.price} VNĐ
                </p>
                <div class="product-buttons mt-4">
                    <div class="row align-items-center">
                        <div class="col-2">
                            <button type="button" class="btn-icon" data-toggle="tooltip" data-placement="top" title="" data-original-title="Favorite">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                        <div class="col-10">
                            <button type="button" onclick="addItemToCart(${product.id})" class="add-to-cart btn btn-block btn-primary btn-circle btn-icon-left">
                                <i class="fa fa-shopping-cart"></i>Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>   
        </a>
            `;
    })
    .join("");
  listProductBlock.innerHTML = htmls;
}

// Gọi hàm initial
start();
// })
