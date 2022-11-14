var products = "http://localhost:3000/products";

function start() {
    getJson(products, getAllProduct_Details);

}

start();

function getJson(data, callback) {
    fetch(data)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function getAllProduct_Details(data) {
    localStorage.setItem('admin-products', JSON.stringify(data));
    var listProduct = document.querySelector(".table-border-bottom-0");

    var htmls = data.map(function (product) {
        return `
        <tr class="product-item-${product.id}">
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.brand}</td>
        <td>${product.category}</td>
        <td>${product.size}</td>
        <td>${product.color}</td>
        <td>${product.price}</td>
        <td>${product.discount}</td>
        <td><a href="./update-product-details.html">Change</a></td>
        <td><button style="border: none; background: none; " class="text-danger" onclick="HandleDelete(${product.id})" style="cursor: pointer">Delete</button></td>
      </tr>
        `;
    });
    listProduct.innerHTML = htmls;
}

function HandleDelete(id) {
    var option = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    };
    fetch(products + '/' + id, option)
        .then(function (reponse) {
            reponse.json();
        })
        .then(function () {
            var product = document.querySelector('.product-item-' + id);
            if (product) {
                product.remove();
            }
        });
}