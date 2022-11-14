var categories = "http://localhost:3000/category";

function start() {
    getJsonCategory(getAllCategory);
}

start();



function getJsonCategory(callback) {
    fetch(categories)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
        
        
}

function getAllCategory(data) {
    localStorage.setItem('categories', JSON.stringify(data));
    var listCate = document.querySelector(".table-border-bottom-0");
    let i = 0;
    var htmls = data.map(function (cate) {
        return `
        <tr class="cate-item-${cate.id}">
            <td>${cate.id}</td>
            <td><i class="fab fa-angular fa-lg text-danger"></i> <strong>${cate.categoryName}</strong></td>
            <td><a href="./update-category.html">Change</a></td>
            <td><button style="border: none; background: none; " class="text-danger" onclick="deleteCategory(${cate.id})" style="cursor: pointer">Delete</button></td>
      </tr>
        `   
        ;
    });
    listCate.innerHTML = htmls.join("");
}


function deleteCategory(id) {
    var option = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    };
    fetch(categories + '/' + id, option)
        .then(function (reponse) {
            reponse.json();
        })
        .then(function () {
            var cate_item = document.querySelector('.cate-item-' + id);
            if (cate_item) {
                // categories = cate_s.filter((element) => element.id != id);
                // localStorage.setItem("categories", JSON.stringify(categories));
                cate_item.remove();
            }
        });
}


function createCategory(category,callback){
    var option = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    };
    fetch(categories, option)
        .then(function (reponse) {
            reponse.json();
        })
        .then(callback);
}

function updateCategory(category,callback){
    var option = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    };
    fetch(categories +'/' + category.id, option)
        .then(function (reponse) {
            reponse.json();
        })
        .then(callback);
}
// Trang update-category
function checkCategory(id) {
    let cate_s = JSON.parse(localStorage.getItem("categories"));
    return cate_s.find(c=> c.id == id);
}

function handleUpdateCate(){
    var data = {
        id: document.querySelector('#category-id').value,
        categoryName: document.querySelector('#category-name').value
    };
    
    if (!checkCategory(data.id)) 
    {
        createCategory(data,getAllCategory);
        alert("Add Success");
    }
    else{
        updateCategory(data,getAllCategory);
        alert("Update Success");
    }
}

var form = document.querySelector('.card-body form');
form.addEventListener('submit',handleUpdateCate);