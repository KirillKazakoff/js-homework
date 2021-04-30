function sliderWork() {
    const images = Array.from(document.getElementsByClassName("slider__item"));
    const dots = Array.from(document.getElementsByClassName("slider__dot"));
    let activeImg, activeDot = null;

    function getAndHideActiveElements() {
        activeImg = document.getElementsByClassName("slider__item_active")[0];
        activeDot = document.getElementsByClassName("slider__dot_active")[0];
        activeImg.className = "slider__item";
        activeDot.className = "slider__dot";
    }

    function showElements(img, dot) {
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

        function ifMoveLeft() {
            if (arrow.className.includes("slider__arrow_prev")) {
                let prevImg = activeImg.previousElementSibling;
                let prevDot = activeDot.previousElementSibling;

                if (!prevImg) {
                    prevImg = images[images.length - 1];
                    prevDot = dots[dots.length - 1];
                }
                showElements(prevImg, prevDot);
            }
        }

        function ifMoveRight() {
            if (arrow.className.includes("slider__arrow_next")) {
                let nextImg = activeImg.nextElementSibling;
                let nextDot = activeDot.nextElementSibling;

                if (!nextImg) {
                    nextImg = images[0];
                    nextDot = dots[0]
                }
                showElements(nextImg, nextDot);
            }
        }

        getAndHideActiveElements();
        ifMoveLeft();
        ifMoveRight();
    }

    setArrowsListener();
    // <------------- End Arrows Listener -----------> // 


    // <------------- Start Dots Listener -----------> // 
    function setDotsListener() {
        dots.forEach((element, index) => 
            element.onclick = () => {
                const equalImg = images[index];

                getAndHideActiveElements();
                showElements(equalImg, element);
            }
        )
    }

    setDotsListener();
    // <------------- End Dots Listener -----------> // 
}

sliderWork();