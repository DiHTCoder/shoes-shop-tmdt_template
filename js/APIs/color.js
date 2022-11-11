var colors = "http://localhost:3000/color";

function start() {
    getJsonColor(getAllColor);
}

start();

function getJsonColor(callback) {
    fetch(prices)
    .then(function(response){
        return response.json();
    })
    .then(callback);
}

function getAllColor(data){
    var listCate = document.querySelector(".product-price-list");
    var htmls = data.map(function(color){
        return `
            <li><a href="#"> ${color.colorName}</a></li>
        `;
    });
    listCate.innerHTML = htmls.join("");
}