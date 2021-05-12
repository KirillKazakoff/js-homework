"use strict"
const widgetArea = document.querySelector(".chat-widget");
const input = document.getElementById("chat-widget__input");
const messages = document.getElementById("chat-widget__messages");
const robotAnswers = [
    "Я кукуруза",
    "ABOBA",
    "Чипс",
    "Hello",
    "Hi",
    "UNGA BUNGA",
    "Zeleniy KUznetSЬ",
    "Rumpa",
    "Pumpa",
    "Gus",
]
const robotQuestion = "Здесь есть кто-нибудь??";
const robotGreeting = "Hello Friend"


widgetArea.addEventListener("click", widgetWork);

function widgetWork() {
    widgetArea.removeEventListener("click", widgetWork);
    let timerId = setTimer();

    widgetArea.classList.add("chat-widget_active");
    printMessage(robotGreeting, "message_robot");

    document.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            const index = Math.floor(Math.random() * robotAnswers.length);
            const randomAnswer = robotAnswers[index];

            if (input.value) {
                printMessage(input.value, "message_client");
                setTimeout(() => printMessage(randomAnswer, "message_robot"), 2000);
    
                input.value = "";
                clearTimeout(timerId);
                timerId = setTimer();
            }
        }  
    })    
}


function setTimer() {
    return setTimeout(() => printMessage(robotQuestion, "message_robot"), 20000);
}

function printMessage(message, messageClass) {
    const date = getDate();
    messages.innerHTML += `
        <div class="message ${messageClass}">
            <div class="message__time">${date}</div>
            <div class="message__text">${message}</div>
        </div>`;
    messages.scrollIntoView(false);
}

function getDate() {
    const date = new Date();
    const formatedDate = `${date.getHours()} : ${date.getMinutes()}`;
    return formatedDate;
}

// function printClientMessage() {
//     const date = getDate();
//     messages.innerHTML += `
//         <div class="message message_client">
//             <div class="message__time">${date}</div>
//             <div class="message__text">${input.value}</div>
//         </div>`;
//     messages.scrollIntoView(false);
// }

// function printRobotMessage(message) {
//     const date = getDate();
//     messages.innerHTML += `
//     <div class="message">
//         <div class="message__time">${date}</div>
//         <div class="message__text">${message}</div>
//     </div>`;
//     messages.scrollIntoView(false);   
// }
