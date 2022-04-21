const navToggle = document.getElementById('nav-toggle');
const navPanel = document.getElementById('nav-panel');
const navToggleItem = document.getElementById('nav-toggle-item');

const makeActive = () => {
    navPanel.classList.toggle("active");
    navToggleItem.classList.toggle("active")
}
navToggle.addEventListener('click', makeActive);


const buttonLogin = document.getElementById('login');
const inputUsername = document.getElementById('uname');
const inputPassword = document.getElementById('pass');
let uname = '';
let pass = '';

const login = () => {
    uname = inputUsername.value;
    pass = inputPassword.value;
    axios.post('/login', {
        username: uname,
        password: pass
    }).then(function (response) {
        console.log(response.data)
        window.location.href = 'admin.html';
    })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}
buttonLogin.addEventListener('click', login)