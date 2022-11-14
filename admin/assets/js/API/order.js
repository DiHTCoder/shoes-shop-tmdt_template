var orders = "http://localhost:3000/orders";

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

function getAllOrder(data) {
    localStorage.setItem('orders', JSON.stringify(data));
    var list = document.querySelector(".table-border-bottom-0");

    var htmls = data.map(function (order) {
        return `
        <tr>
                      <td>${order.id}</td>
                      <td>${order.date}</td>
                      <td>Quảng</td>
                      <td><i class="fab fa-angular fa-lg text-danger"></i> <strong>MaleFashion Logo Shirt - Black XL, MaleFashion Short - Gray XL</strong></td>
                      <td ><span class="badge bg-label-success me-1">Delivered</span></td>
                      <td><a href="./update-order.jsp">Change</a></td>
                    </tr>
        `;
    });
    list.innerHTML = htmls;
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