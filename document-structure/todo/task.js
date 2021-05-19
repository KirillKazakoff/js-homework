"use strict";

const form = document.getElementById("tasks__form");
const input = document.getElementById("task__input");
const taskList = document.getElementById("tasks__list");
const storageList = localStorage.getItem('taskList');

//Загрузка кода из хранилища
if (storageList) {
    taskList.innerHTML = storageList;
    const removeButtons = taskList.querySelectorAll(".task__remove");

    removeButtons.forEach(element => element.addEventListener("click", () => {
        const task = element.closest("div");
        taskList.removeChild(task);
    }))
}

//Основной код
const formHandler = function(event) {
    if (input.value) {
        printMessage();

        const firstTask = taskList.firstElementChild;
        const xButton = firstTask.querySelector(".task__remove");
        
        xButton.addEventListener("click", () => {
            taskList.removeChild(firstTask);
        })

        form.reset();
        event.preventDefault();
    }
}

function printMessage() {
    const code = `
    <div class="task">
        <div class="task__title">${input.value}</div>
        <a href="#" class="task__remove">&times;</a>
    </div>`;

    taskList.insertAdjacentHTML("afterBegin", code);
}

document.addEventListener("submit", formHandler);



//Сохранение при перезагрузке
const refreshHandler = function() {
    localStorage.setItem('taskList', taskList.innerHTML);
}

window.addEventListener("unload", refreshHandler);

