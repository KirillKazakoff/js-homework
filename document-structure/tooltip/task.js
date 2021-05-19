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
    const activeClass = "tooltip_active";
    const {tip, expression} = element;

    const handler = function(event) {   
        if (!activeTip) {
            activeTip = tip;
            showTip(tip);
        }
        else {
            activeTip.classList.remove(activeClass);
            activeTip = activeTip == tip ? null : (showTip(tip), tip);
        }

        event.preventDefault();
    }

    function showTip(tip) {
        expLocation = expression.getBoundingClientRect();
        tip.classList.add(activeClass);

        tip.style.left = expLocation.left + "px";

        defaultTipLocation = tip.getBoundingClientRect();
    }

    return handler;
}


expressionObjects.forEach(element => {
    const {expression} = element;

    expression.addEventListener("click", listener(element)); 
});




// Функционал со стрелочками на клавиатуре 

const keyListener = function(event) {

    if (activeTip) {
        const activeTipLocation = activeTip.getBoundingClientRect();
        const {top, left, right, bottom} = expLocation;
        const {width} = activeTipLocation;
        
        tipToDefault(activeTip);
        switch (event.key) {
    
            case "ArrowUp": 
                activeTip.style.top = top - 30 + "px";
                break;
    
            case "ArrowDown":
                activeTip.style.top = bottom + "px";
                break;

            case "ArrowLeft":
                activeTip.style.left = left - width + "px";
                activeTip.style.top = top + "px";
                break;

            case "ArrowRight":
                activeTip.style.left = right + "px";
                activeTip.style.top = top + "px";
                break;

        }
    }
    
}

function tipToDefault(activeTip) {
    const {left, top} = defaultTipLocation;
    
    activeTip.style.left = left + "px";
    activeTip.style.top = top + "px";
}

document.addEventListener("keydown", keyListener) 
