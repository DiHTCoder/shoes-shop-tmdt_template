var products = "http://localhost:3000/products";
var categories = "http://localhost:3000/category";
function start() {
    getJson(products, getAllProduct);
    getJson(categories, ShowCategory);
}


start();



function getJson(data, callback) {
    fetch(data)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function getAllProduct(data) {
    localStorage.setItem('admin-products', JSON.stringify(data));
    var listProduct = document.querySelector(".table-border-bottom-0");

    var htmls = data.map(function (product) {
        return `
                <tr class="product-item-${product.id}">
                    <td>${product.id}</td>
                    <td>${product.category}</td>
                    <td><i class="fab fa-angular fa-lg text-danger"></i> <strong>${product.name}</strong></td>
                    <td><a href="./product-details.html">See more</a></td>
                    <td><a href="./update-product-details.html">Change</a></td>
                    <td><button style="border: none; background: none; " class="text-danger" onclick="HandleDelete(${product.id})" style="cursor: pointer">Delete</button></td>
                </tr>
        `;
    });
    listProduct.innerHTML = htmls;
}

function ShowCategory(data) {
    localStorage.setItem('categories', JSON.stringify(data));
    var listCate = document.querySelector("#product-category");

    var htmls = data.map(function (cate) {
        return `
        <option value="${cate.id}">${cate.categoryName}</option>
        `;
    });
    listCate.innerHTML = htmls;
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


function HandleCreate(data, callback) {
    var option = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(products, option)
        .then(function (reponse) {
            reponse.json();
        })
        .then(callback);
}

function HandleUpdate(data, callback) {
    var option = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(products + '/' + data.id, option)
        .then(function (reponse) {
            reponse.json();
        })
        .then(callback);
}

function check(id) {
    let data = JSON.parse(localStorage.getItem("admin-products"));
    return data.find(element => element.id == id);
}

function handleUpdateProduct() {
  
    var data = {
        id: document.querySelector('#product-detail-id').value,
        brand: document.querySelector('#product-detail-brand').value,
        category: document.getElementById('product-category').value,
        size: document.querySelector('#product-detail-size').value,
        name: document.querySelector('#product-detail-name').value,
        price: document.querySelector('#product-detail-price').value,
        image: document.querySelector('#product-detail-img').value,
        color: document.querySelector('#product-detail-color').value,
        discount: document.querySelector('#product-detail-discount').value,
        sold_quantity: document.querySelector('#product-detail-sold').value,
        stock: document.querySelector('#product-detail-stock').value,
        description: document.querySelector('#product-detail-description').value,
        quantity: document.querySelector('#product-detail-quantity').value
    };
    // alert(option_.option[option_.selectedIndex].Text);
    if (!check(data.id)) {
        HandleCreate(data, getAllProduct);
        alert("Add Success");
    }
    else{
        HandleUpdate(data.name, getAllProduct);
        alert("Update Success");
    }
}

var form = document.querySelector('.card-body form');
form.addEventListener('submit', handleUpdateProduct);