var categories = "http://localhost:3000/category"

function start() {
    getJsonCategory(getAllCategory);
}

start();

function getJsonCategory(callback) {
    fetch(categories)
    .then(function(response){
        return response.json();
    })
    .then(callback);
}

function getAllCategory(data){
    var listCate = document.querySelector(".cate-name-list");
    var htmls = data.map(function(cate){
        return `
            <li><a href="#"> ${cate.categoryName} (${cate.id})</a></li>
        `;
    });
    listCate.innerHTML = htmls.join("");
}