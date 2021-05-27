"use strict";

const url = "https://netology-slow-rest.herokuapp.com/auth.php";
const form = document.getElementById("signin__form");
const signin = document.getElementById("signin");
const welcome = document.getElementById("welcome");

function onSuccess(id) {
    showWelcome(id)
    signin.classList.remove("signin_active");
}

function showWelcome(id) {
    localStorage.setItem("id", id);

    welcome.classList.add("welcome_active");

    const text = welcome.querySelector(".welcome__text");
    text.textContent = `Добро пожаловать, пользователь # ${id}`;
}

function onError() {
    alert("Неверный логин/пароль");
}

const submitHandler = function(e) {
    e.preventDefault();
    const request = new Request(url, {
        method: "POST",
        // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new FormData(form)
    })

    fetch(request).then(response => 
        response.json().then(responseObj => {
            responseObj.success ? onSuccess(responseObj.user_id) : onError();
        })
    )
    
}

form.addEventListener("submit", submitHandler);

//Storage get
const storageId = localStorage.getItem("id");
if (storageId) onSuccess(storageId);

//signoutButton
const button = document.getElementById("welcome__signout");

button.addEventListener("click", () => {
    localStorage.removeItem("id");
    signin.classList.add("signin_active");
    welcome.classList.remove("welcome_active");

    const rowArr = Array.from(form.children);

    rowArr.forEach(row => {
        const input = row.firstElementChild;
        if (input.className == "control") input.value = "";
    })
});
