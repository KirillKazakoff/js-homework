
const images = Array.from(document.getElementsByClassName("slider__item"));
const dots = Array.from(document.getElementsByClassName("slider__dot"));
let activeImg, activeDot = null;

function hideActiveSlide() {
    activeImg = images.find(element => element.className.includes("slider__item_active"));
    activeDot = dots.find(element => element.className.includes("slider__dot_active"));
    activeImg.className = "slider__item";
    activeDot.className = "slider__dot";
}

function showSlide(img, dot) {
    img.className = "slider__item slider__item_active";
    dot.className = "slider__dot slider__dot_active";
}

// <------------- Start Arrows Listener -----------> // 
function setArrowsListener() {
    const arrows = Array.from(document.getElementsByClassName("slider__arrow"));

    arrows.forEach(element =>  
        element.onclick = () => arrowClick(element)
    )    
}

function arrowClick(arrow) {
    hideActiveSlide();
    if (arrow.className.includes("slider__arrow_prev")) {
        moveLeft();
    }
    else moveRight();
}

function moveLeft() {
    let prevImg = activeImg.previousElementSibling;
    let prevDot = activeDot.previousElementSibling;

    if (!prevImg) {
        prevImg = images[images.length - 1];
        prevDot = dots[dots.length - 1];
    }
    showSlide(prevImg, prevDot);    
}

function moveRight() {
    let nextImg = activeImg.nextElementSibling;
    let nextDot = activeDot.nextElementSibling;

    if (!nextImg) {
        nextImg = images[0];
        nextDot = dots[0]
    }
    showSlide(nextImg, nextDot);
}

setArrowsListener();
// <------------- End Arrows Listener -----------> // 


// <------------- Start Dots Listener -----------> // 
function setDotsListener() {
    dots.forEach((element, index) => 
        element.onclick = () => {
            const equalImg = images[index];

            hideActiveSlide();
            showSlide(equalImg, element);
        }
    )
}

setDotsListener();
// <------------- End Dots Listener -----------> // 


