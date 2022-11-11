var prices = "http://localhost:3000/price";

function start() {
    getJsonPrice(getAllPrice);
}

start();

function getJsonPrice(callback) {
    fetch(prices)
    .then(function(response){
        return response.json();
    })
    .then(callback);
}

function getAllPrice(data){
    var listCate = document.querySelector(".product-price-list");
    var htmls = data.map(function(price){
        return `
            <li><a href="#"> ${price.priceRange}</a></li>
        `;
    });
    listCate.innerHTML = htmls.join("");
}