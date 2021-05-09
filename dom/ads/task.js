const texts = Array.from(document.querySelectorAll(".rotator__case"));
const activeClass = "rotator__case_active";
let activeText = texts.find(element => element.classList.contains(activeClass));
const timeArr = [];



function rotateTexts() {
    const nextText = activeText.nextElementSibling;
    activeText.classList.remove(activeClass);
    activeText = nextText ? nextText : texts[0]; 

    const timeOut = activeText.dataset.speed;
    activeText.classList.add(activeClass);
    
    setTimeout(rotateTexts, timeOut);
}



function setElementsProps() {
    texts.forEach(element => {
        let textColor = element.dataset.color;
        
        timeArr.push(element.dataset.speed);
        element.style.color = textColor;
    })
    
}


setElementsProps();
setTimeout(rotateTexts, timeArr[0]);
