"use strict";

const form = document.getElementById("tasks__form");
const input = document.getElementById("task__input");
const taskList = document.getElementById("tasks__list");
const storageList = JSON.parse(localStorage.getItem('taskList'));
const listToStorage = [];

const removeHandler = function(e) {
    const task = e.target.closest("div");
    const content = task.querySelector(".task__title").textContent;

    taskList.removeChild(task);
    listToStorage.splice(listToStorage.findIndex(element => 
        element == content), 1)
}

//Загрузка кода из хранилища
if (storageList) {
    storageList.forEach(element => printMessage(element));
    const removeButtons = taskList.querySelectorAll(".task__remove");

    removeButtons.forEach(element => element.addEventListener("click", removeHandler))
}


//Основной код
const formHandler = function(event) {
    if (input.value.trim()) {
        printMessage(input.value);

        const firstTask = taskList.firstElementChild;
        const xButton = firstTask.querySelector(".task__remove");
        
        xButton.addEventListener("click", removeHandler);
        form.reset();
    }

    event.preventDefault();
}



function printMessage(message) {
    const code = `
    <div class="task">
        <div class="task__title">${message}</div>
        <a href="#" class="task__remove">&times;</a>
    </div>`;

    taskList.insertAdjacentHTML("afterBegin", code);
    listToStorage.push(message);
}

document.addEventListener("submit", formHandler);



//Сохранение при перезагрузке
const refreshHandler = function() {
    localStorage.setItem('taskList', JSON.stringify(listToStorage));
}

window.addEventListener("unload", refreshHandler);

