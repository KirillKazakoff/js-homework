"use strict";
function game() {
    let destination, htmlLetters, successes, loss = null;
    const successesHtml = document.querySelector(".status__wins");
    const lossHtml = document.querySelector(".status__loss");



    //Html rendering and words sending
    function intialRender() {
        htmlReceive();
        clearHtml();
        renderWord();
    }

    function htmlReceive() {
        destination = document.querySelector(".word");
        htmlLetters = Array.from(destination.children);
    }

    function getWordFromServer() {
        const words = [
            'Bob унга',
            'Awesome унга',
            'Netology унга',
            'Hello унга',
            'Kitty унга',
            'Rock унга',
            'Youtube унга',
            'Popcorn унга',
            'Cinema унга',
            'Love унга',
            'Javascript унга бунга',
        ]

        const index = Math.floor(Math.random() * words.length);
        return words[index];
    }

    function renderWord() {
        const symbols = getWordFromServer().split('');
        symbols.forEach(element => sendSymbol(element));

        function sendSymbol(element) {
            const newSymbol = document.createElement("span");
    
            newSymbol.className = "symbol";
            newSymbol.textContent = element;
            destination.appendChild(newSymbol);
    
        }
        htmlReceive();
    }

    function clearHtml() {
        htmlReceive();
        htmlLetters.forEach(element => element.remove());
    }

    

    // Loss and wins logic
    function startGame() {
        successes = checkRight();
        loss = checkWrong();
    }
    
    function checkRight() {
        let length = htmlLetters.length;
        let succededLetters = 0;
        let successesNumber = +successesHtml.textContent;

        return function() {
            succededLetters++;
            if (succededLetters == length) {
                onRightWord();
            }
            return successesNumber;    
        }

        function onRightWord() {
            clearHtml();
            renderWord();

            length = htmlLetters.length;
            succededLetters = 0;
            successesNumber++;
            successesHtml.textContent = successesNumber;
        }

    }

    function checkWrong() {
        let lossNumber = +lossHtml.textContent; 

        return function() {
            lossNumber++;
            lossHtml.textContent = lossNumber;
            turnRed();
            setTimeout(restart, 500);
            return lossNumber;
        }

        function turnRed() {
            htmlReceive();
            htmlLetters.forEach(letter => 
                letter.className = "symbol");
            destination.classList.add("word_incorrect");
        }

        function restart() {
            destination.className = "word";
        }
    }



    // keyboardEvent
    function onKeyboardEvent() {
        document.addEventListener('keypress', (event) => {
            if (checkTyping(event)) {
                checkGameWin(successes);
            }
            else {
                checkGameLose(loss);
                successes = checkRight();
            }
        })        
    }

    function checkGameWin(func) {
        let winNumber = func();
        if (winNumber == 10) {
            alert("You won!");
            restartGame();
        }
    }

    function checkGameLose(func) {
        let lossNumber = func();
        if (lossNumber >= 3) {
            alert("You lose");
            restartGame();
        }
    }

    function restartGame()  {
        successesHtml.textContent = 0;
        lossHtml.textContent = 0;
        startGame();
    }

    function checkTyping(event) {
        if (htmlLetters[0].textContent == event.key) {
            htmlLetters[0].classList.add('symbol_correct');
            htmlLetters.splice(0, 1);
            return true;
        }
        else return false;
    }

    intialRender();
    startGame();
    onKeyboardEvent();
}

game();





// function checkButtons() {
//     const pressed = [];
//     const codes = ["KeyQ", "KeyW"];

//     document.addEventListener("keydown", (event) => {
//         if (pressed.length < 2) {
//             pressed.push(event.code);
//         }
//         else return;
//     })

//     document.addEventListener('keyup', function() {
        
//         if (checkCode()) {
//             console.log("hello");
//         }

//         pressed.length = 0;

//         function checkCode() {
//             return codes.every((code, index) => {
//                 return code == pressed[index]
//             })
//         }

//     })
// }

// function checkButtons2() {
//     document.addEventListener('keydown', function(event) {
//         if (event.code == 'Space' && (event.ctrlKey || event.metaKey)) {
//           alert('Отменить!')
//         }
//     });
// }