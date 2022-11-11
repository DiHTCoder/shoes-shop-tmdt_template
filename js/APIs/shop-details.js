

var img_product = 'http://localhost:3000/img';
var big_img_product = 'http://localhost:3000/img-big';
var info_product = 'http://localhost:3000/products?id=5'; // API mot sp click vao id?=
function start() {
    GetInfo(RederInfoText);
    GetImg(RenderImg);
    GetBigImg(RenderBigImg);
    AddItemLocal(); 
};
start();


function GetInfo(callback) {
    fetch(info_product)
        .then(function (reponse) {
            return reponse.json();
        })
        .then(callback);
};

function GetBigImg(callback) {
    fetch(big_img_product)
        .then(function (reponse) {
            return reponse.json();
        })
        .then(callback)
};

function GetImg(callback) {
    fetch(img_product)
        .then(function (reponse) {
            return reponse.json();
        })
        .then(callback)
};
{ }
function RenderImg(imgs) {
    var space_img_tab = document.querySelector('.nav-tabs');
    var data = imgs.map(function (img) {
        return `
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#tabs-${img.id}" role="tab">
                        <div class="product__thumb__pic set-bg">                  
                            <img src=${img.link} alt="">
                        </div> 
                       </a>
                </li>
        `;
    })
    space_img_tab.innerHTML = data.join('');
};
function RenderBigImg(imgs) {
    var space_img_tab = document.querySelector('.tab-content');
    var data = imgs.map(function (img) {

        return `
        <div class="tab-pane" id="tabs-${img.id}" role="tabpanel">
        <div class="product__details__pic__item">
            <img src="${img.link}" alt="">
        </div>
    </div>
        `;
    })
    space_img_tab.innerHTML = data;
};
function RederInfoText(products) {
    var product__details__text = document.querySelector('.product__details__text');
    var data = products.map(function (product) {
       
        return `
        <h4>${product.productName}</h4>
                                <div class="rating">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star-o"></i>
                                    <span> - 5 Reviews</span>
                                </div>
                                <h3>$${product.price}</span></h3>
                                <p>${product.discription}</p>
                                <div class="product__details__option">
                                    <div class="product__details__option__size">
                                        <span>Size:</span>
                                        <label for="xxl">xxl
                                            <input type="radio" id="xxl">
                                        </label>
                                        <label class="active" for="xl">xl
                                            <input type="radio" id="xl">
                                        </label>
                                        <label for="l">l
                                            <input type="radio" id="l">
                                        </label>
                                        <label for="sm">s
                                            <input type="radio" id="sm">
                                        </label>
                                    </div>
                                    <div class="product__details__option__color">
                                        <span>Color:</span>
                                        <label class="c-1" for="sp-1">
                                            <input type="radio" id="sp-1">
                                        </label>
                                        <label class="c-2" for="sp-2">
                                            <input type="radio" id="sp-2">
                                        </label>
                                        <label class="c-3" for="sp-3">
                                            <input type="radio" id="sp-3">
                                        </label>
                                        <label class="c-4" for="sp-4">
                                            <input type="radio" id="sp-4">
                                        </label>
                                        <label class="c-9" for="sp-9">
                                            <input type="radio" id="sp-9">
                                        </label>
                                    </div>
                                </div>
                                <div class="product__details__cart__option">
                                    <div class="quantity">
                                        <div class="pro-qty">
                                            <input type="text" value="1" id="quantity_input">
                                        </div>
                                    </div>
                                    <button type="button" onclick="addItemToCart()" class="primary-btn">add to cart</button>
                                </div>

                                <div class="product__details__last__option">
                                    <h5><span>Guaranteed Safe Checkout</span></h5>
                                    <img src="img/shop-details/details-payment.png" alt="">
                                </div>
        `;
    })
    product__details__text.innerHTML = data;
};


// HANDLE DATA LOCAL

function AddItemLocal() {
    fetch(info_product)
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (data) {
            localStorage.setItem('product', JSON.stringify(data));
            if (!localStorage.getItem("cart")) {
                localStorage.setItem("cart", "[]");
            }

        });
};

let productItem = JSON.parse(localStorage.getItem("product"));
let carts = JSON.parse(localStorage.getItem("cart"));


function addItemToCart() {
    var quantity = document.getElementById('quantity_input').value;

    // Nếu sp có sẽ tăng sl sản phẩm
    let isChange = Array.from(carts).find(function (element) {
        if (element.product.id == productItem[0].id) {
            element.quantity = quantity;
            return {};
        }
    });

    if (!isChange)
        carts.push({ product: productItem[0], quantity: quantity })
    localStorage.setItem("cart", JSON.stringify(carts));
}


