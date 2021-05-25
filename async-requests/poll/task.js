"use strict";
const url = 'https://netology-slow-rest.herokuapp.com/poll.php';

const poll = document.querySelector(".poll");
const pollNew = poll.cloneNode(true);

const titleNode = pollNew.querySelector(".poll__title");
const answerButtons = pollNew.querySelector(".poll__answers");
const results = document.createElement("div");
results.className = "results";


fetch(url).then(response => {
    response.json().then(responseObj => {
        htmlDraw(responseObj);
        const {id} = responseObj;

        Array.from(answerButtons.children).forEach((element, index) => 
            element.addEventListener("click", () => onAnswerClick(id, index))
        )
    })
})


function htmlDraw(obj) {
    const {answers, title} = obj.data; 
    titleNode.textContent = title;

    answers.forEach(answer => insertAnswerHtml(answer));
    poll.replaceWith(pollNew);
    
}

function insertAnswerHtml(answer) {
    const buttonsCode = `<button class="poll__answer">${answer}</button>`;
    answerButtons.insertAdjacentHTML("beforeEnd", buttonsCode);
}




function onAnswerClick(id, index) {
    const data = new URLSearchParams({
        'vote': id,
        'answer': index
    })
    
    const request = new Request(url, {
        method: 'POST', 
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data  
    })

    fetch(request).then(response => 
        response.json().then(responseObj => {
            titleNode.classList.remove("poll__title_active");
            answerButtons.classList.remove("poll__answers_active");

            const votesQuantity = responseObj.stat.reduce((total,element) => {
                return total + element.votes;
            }, 0)
            responseObj.stat.forEach(element => insertResultsHtml(element, votesQuantity))
            pollNew.append(results);
        })
    )

    alert("Спасибо, ваш голос засчитан!");
}

function insertResultsHtml(result, quantity) {
    const {answer, votes}  = result;
    const avg = ((votes / quantity) * 100).toFixed(2); 
    const code = `
        <div class="poll__result">
            <div class="poll__result-title">${answer}</div>
            <div class="poll__result-votes">${avg} %</div>
        </div>
    `;
    results.insertAdjacentHTML("beforeEnd", code);
}

