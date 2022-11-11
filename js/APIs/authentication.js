function GetTextSignIn() {
    var username = document.getElementById('username login').value;
    var password = document.getElementById('password login').value;
    var data = {
        username: username,
        password: password,
    };
    var data_json = JSON.stringify(data);
    localStorage.setItem('login', data_json);
    // Gọi API để check đăng nhập rồi show ra message nếu k thành công
    //    var message = document.getElementById('message login');

}

function GetTextSignUp() {
    var username = document.getElementById('username sign-up').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password sign-up').value;
    var confirm_pass = document.getElementById('confirm-password').value;
    var message = document.getElementById('message sign-up');

    if(password != confirm_pass){
        message.innerHTML = "Mật khẩu không trùng";
        message.style.marginBottom = "10px";
    }
    else{
        var data = {
            username: username,
            email: email,
            password: password,
            // còn date lấy lun trong backend khi khởi tạo
        };
        var data_json = JSON.stringify(data);
        localStorage.setItem('sign-up', data_json); // gửi data ve api
    }
   

}

