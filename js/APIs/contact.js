
// lấy thông tin từ text box gửi về mail cá nhân
function sendMsg(e) {
    e.preventDefault();
    const name = document.querySelector('.name'),
        email = document.querySelector('.email'),
        msg = document.querySelector('.message'); 
    const body = 'Name: ' + name.value+ '<br/> Email: ' + email.value + '<br/> Lời nhắn:'+msg.value;
    console.log(email.value,msg.value);
    Email.send({
        SecureToken: "c67f0325-39a3-4378-aa32-c3e10c0967e7",
        To: 'nhd.it.work@gmail.com',
        From: 'nguyenhuudat2710@gmail.com',
        Subject: "Contact SoMore",
        Body: body
    }).then(
        message => alert(message)
    );
};

const form = document.querySelector('.contact__form_info');
form.addEventListener('submit',sendMsg);
