var user = "http://localhost:3000/user?id=1";

function start() {
    getJsonColor(getAllColor);
}

start();

function getJsonColor(callback) {
    fetch(user)
    .then(function(response){
        return response.json();
    })
    .then(callback);
}

function getAllColor(data){
    var listCate = document.querySelector(".user-profile");
    var htmls = data.map(function(user){
        return `
        <div class="card-body">
        <div class="row">
            <div class="col-sm-3">
                <h6 class="mb-0">Họ & tên</h6>
            </div>
            <div class="col-sm-9 text-secondary">${user.name}</div>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-3">
                <h6 class="mb-0">Email</h6>
            </div>
            <div class="col-sm-9 text-secondary">${user.email}</div>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-3">
                <h6 class="mb-0">Số điện thoại</h6>
            </div>
            <div class="col-sm-9 text-secondary">
                9142141516
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-3">
                <h6 class="mb-0">Giới tính</h6>
            </div>
            <div class="col-sm-9 text-secondary">
            ${user.sex}
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-3">
                <h6 class="mb-0">Địa chỉ</h6>
            </div>
            <div class="col-sm-9 text-secondary">
            ${user.address}
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-12">
                <a class="btn btn-info" target="" href="edit_profile.html">Sửa thông tin</a>
            </div>
        </div>
    </div>
        `;
    });
    listCate.innerHTML = htmls.join("");
}