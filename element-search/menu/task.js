"use strict";
const linksArr = Array.from(document.getElementsByClassName("menu__link"));
let activeTab = null;
let activeMenu = null;

function setTabListener() {
    linksArr.forEach(element => {
        const sibling = element.nextElementSibling;
        if (sibling) {
            element.onclick = function() {
                sibling.classList.add("menu_active");
                checkActiveTab(sibling);
                return false;
            }
        }
    })
}

function checkActiveTab(clickedTab) {
    if (!activeTab) activeTab = clickedTab;
    else {
        activeTab.className = "menu menu_sub";
        activeTab = activeTab != clickedTab ? clickedTab : null;
    }
}


setTabListener();
    

