var product_cart = 'http://localhost:3000/products' //Thiếu api order          /api/product/bill/{id} id 
let cart = JSON.parse(localStorage.getItem('cart'));
function start() {
    RenderCart(cart);
};
function GetCart(callback) {
    fetch(product_cart)
        .then(function (reponse) {
            return reponse.json();
            // Tra ve json
        })
        .then(callback);
};

function sum(a, b) {

    return parseInt(a) + parseInt(b);
};

function RenderCart(cart) {

    var checkout__total__products = document.querySelector('.checkout__total__products');
    
    var total_price = document.querySelector('.price_total');
    var pay_img = document.querySelector('.qr-payment');
    var sum_price = 0;
    var data = cart.map(function (c) {
        sum_price = sum(sum_price, c.product.price*c.quantity)
        return `
            <li>
               <p style="margin-bottom: 0px;"> ${c.product.productName}</p>
               x${c.quantity}
                <span>${c.product.price}</span>
            </li>
        `;
    });
    checkout__total__products.innerHTML = data.join('');
    total_price.innerHTML = sum_price;
    var link_pay = "https://img.vietqr.io/image/STB-050122075254-compact2.png?addInfo=Thanh%20Toan%20SoMore&accountName=Nguyen%20Huu%20Dat&amount=" + sum_price.toString();
    pay_img.innerHTML = `
        <img alt="QR-Pay" src=${link_pay} >
    `;
}

start();


// function RenderCart(cart){
//     var product_cart = document.querySelector('.shopping__cart__table table tbody');
//     var data = cart.map(function(product){
//         return `
//         <tr>
//         <td class="product__cart__item">
//             <div class="product__cart__item__pic">
//                 <img src="${product.img}" alt="">
//             </div>
//             <div class="product__cart__item__text">
//                 <h6>${product.name}</h6>
//                 <h5>$${product.price}</h5>
//             </div>
//         </td>
//         <td class="quantity__item">
//             <div class="quantity">
//                 <div class="pro-qty-2">
//                     <input type="text" value="${product.quantity}">
//                 </div>
//             </div>
//         </td>
//         <td class="cart__price">$ ${product.quantity*product.price}</td>
//         <td class="cart__close"><i class="fa fa-close"></i></td>
//     </tr>
//         `;
//     })
// }