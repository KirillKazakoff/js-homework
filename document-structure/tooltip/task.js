"use strict";

const expressions = Array.from(document.querySelectorAll(".has-tooltip"));
let activeTip = null; 
let defaultTipLocation = null;
let expLocation = null;


const expressionObjects = expressions.map(expression => {
    const tip = createTip(expression);
    return {expression, tip}
})

function createTip(expression) {
    const tip = document.createElement("div");

    tip.textContent = expression.title;
    tip.className = "tooltip";
    expression.appendChild(tip);

    return tip;
}


const listener = function(element) {
    const {tip, expression} = element;

    const handler = function(event) {   
        event.preventDefault();
        if (!activeTip) {
            activeTip = tip;
            showTip(tip, expression);
        }
        else {
            activeTip.classList.remove("tooltip_active");
            activeTip = activeTip == tip ? null : (showTip(tip, expression), tip);
        }
    }

    return handler;
}


function showTip(tip, expression) {
    expLocation = getExpCoords(expression);
    const {left, top, width: expWidth} = expLocation;
    tip.classList.add("tooltip_active");

    if (expLocation.right + 100 < document.documentElement.clientWidth) {
        tip.style.left = left + "px";
        tip.style.top = top + 20 + "px";
    }
    else {
        const width = activeTip.getBoundingClientRect().width;
        tip.style.left = left - width + "px";
        tip.style.top = top + "px";
    }

    defaultTipLocation = tip.getBoundingClientRect();
}

function getExpCoords(expression) {
    const coords = expression.getBoundingClientRect();
    let {top, bottom, left, right} = coords;

    top = top + pageYOffset;
    bottom = bottom + pageYOffset;
    left = left + pageXOffset;
    right = right + pageXOffset;

    const expObj = {top, bottom, left, right}
    return expObj;
}

window.addEventListener("resize", () => {
    const expression = activeTip.closest("a");
    showTip(activeTip, expression);
})


expressionObjects.forEach(element => {
    const {expression} = element;

    expression.addEventListener("click", listener(element)); 
});




// Функционал со стрелочками на клавиатуре 

const keyListener = function(event) {

    if (activeTip) {
        const activeTipLocation = activeTip.getBoundingClientRect();
        const {top, left, right, bottom} = expLocation;
        const {width, right: tipRight} = activeTipLocation;
        const {clientWidth} = document.documentElement;

        if (tipRight < clientWidth) {
            switch (event.key) {
                case "ArrowUp": goUp(); break;
                    
                case "ArrowDown": goDown(); break;
                
                case "ArrowLeft": goLeft(); break;
    
                case "ArrowRight": goRight(); break;
            }
        }
        else goLeft();

        function goUp() {
            const result = top - 30;
            if (result > 0) {
                tipToDefault(activeTip);
                activeTip.style.top = result + "px";
            }
        }

        function goDown() {
            tipToDefault(activeTip);
            activeTip.style.top = bottom + "px";
        }

        function goLeft() {
            const result = left - width;
            if (result > 0) {
                tipToDefault(activeTip);
                activeTip.style.left = result + "px";
                activeTip.style.top = top + "px";
            }
        }

        function goRight() {
            const result = right + width;
            if (result < document.documentElement.clientWidth) {
                tipToDefault(activeTip);
                activeTip.style.left = right + "px";
                activeTip.style.top = top + "px";
            }
        }
    }

}



function tipToDefault(activeTip) {
    const {left, top} = defaultTipLocation;
    
    activeTip.style.left = left + "px";
    activeTip.style.top = top + "px";
}


document.addEventListener("keydown", keyListener); 
