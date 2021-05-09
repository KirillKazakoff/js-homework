const hidenElements = Array.from(document.querySelectorAll(".reveal"));
const viewportHeight = window.innerHeight;

document.addEventListener("scroll", onWindowScroll)

function onWindowScroll() {
    hidenElements.forEach(element => isInViewport(element))
}

function isInViewport(element) {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < viewportHeight && elementBottom > 0) {
        element.classList.add("reveal_active");
    }
    if (elementBottom < 0 || elementTop > viewportHeight) {
        element.classList.remove("reveal_active");
    }
}   