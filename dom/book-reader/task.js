"use strict"
const book = document.getElementById("book");

const allSwitchers = Array.from(document.querySelectorAll(".book__controls a"));
const fontSwitchers = Array.from(document.querySelectorAll(".font-size"));
const colorSwitchers = Array.from(document.querySelectorAll(".book__control_color .color"));
const bgSwitchers = Array.from(document.querySelectorAll(".book__control_background .color"));

let activeClass, switchers, activeSwitcher;


function changeProperty(aproximateName, nextSwitcher) {
    removeSwitcherActiveClass();
    removeBookPreviousClass(aproximateName);
    addSwitcherActiveClass(nextSwitcher);
    addBookClass(aproximateName);
}

function findActiveSwitcher() {
    return switchers.find(element => element.classList.contains(activeClass));
}

function removeSwitcherActiveClass() {
    activeSwitcher.classList.remove(activeClass);
}

function removeBookPreviousClass(aproximateName) {
    const bookClasses = book.className.split(' ');
    const previousClass = bookClasses.find(element => element.includes(aproximateName));
    book.classList.remove(previousClass); 
}

function addBookClass(aproximateName) {
    const dataset = activeSwitcher.dataset;
    let data = null;

    for (let prop in dataset) {
        data = dataset[prop]
    }
    if (data) {
        book.classList.add(aproximateName + data)
    }
}

function addSwitcherActiveClass(switcher) {
    activeSwitcher = switcher;
    activeSwitcher.classList.add(activeClass);
}



function toggleSwitchersOnClick() {
    allSwitchers.forEach(element => element.addEventListener("click", (event) => toggleSwitchersAction(element, event)))
}

function toggleSwitchersAction(clickedSwitcher, event) {
    const parentClassName = clickedSwitcher.closest("div").className;
    
    event.preventDefault();
    switch (parentClassName) {
        case "book__control book__control_font-size":
            switchers = fontSwitchers;
            changeSize(clickedSwitcher);
            break;
    
        case "book__control book__control_color":
            switchers = colorSwitchers;
            changeTextColor(clickedSwitcher);
            break;

        case "book__control book__control_background":
            switchers = bgSwitchers;
            changeBgColor(clickedSwitcher);
            break;
    }
}

function changeSize(nextSwitcher) {
    activeClass = "font-size_active";
    activeSwitcher = findActiveSwitcher();
    
    const aproximateName = "book_fs-";
    changeProperty(aproximateName, nextSwitcher);
}

function changeTextColor(nextSwitcher) {
    activeClass = "color_active";
    activeSwitcher = findActiveSwitcher();

    const aproximateName = "book_color-";
    changeProperty(aproximateName, nextSwitcher)
}

function changeBgColor(nextSwitcher) {
    activeClass = "color_active";
    activeSwitcher = findActiveSwitcher();

    const aproximateName = "book_bg-";
    changeProperty(aproximateName, nextSwitcher);
}



toggleSwitchersOnClick();



