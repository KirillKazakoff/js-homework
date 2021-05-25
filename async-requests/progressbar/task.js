"use strict";
const form = document.getElementById("form");
const progressBar = document.getElementById("progress");

const url = "https://netology-slow-rest.herokuapp.com/upload.php";



form.addEventListener("submit", (e) => {
    const request = new XMLHttpRequest();
    const data = new FormData(form);    

    request.upload.addEventListener('loadend', () => {
        checkStatus(request);
    })

    request.upload.addEventListener("progress", (e) => {
        const loadedValue = e.loaded / e.total;
        progressBar.value = loadedValue;

        console.log(`Отправлено ${e.loaded} из ${e.total}`);
    })

    request.open("POST", url);
    request.send(data);
    e.preventDefault();
})

function checkStatus(xhr) {
    if (xhr.status == 200) {
        console.log("Успех");
      } 
    else {
        console.log("Ошибка " + xhr.status);
    }
}