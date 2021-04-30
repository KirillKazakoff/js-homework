"use strict";
function menuAction() {
    const linksArr = Array.from(document.getElementsByClassName("menu__link"));
    let activeTab = null;
    let activeMenu = null;
    let menuChanged = false;

    function setMenuListener() {
        const menuArr = Array.from(document.getElementsByClassName("menu-main"));
        menuArr.forEach(element => 
            element.onclick = function() {
                if (activeMenu != null && activeMenu != element) {
                    menuChanged == true;    
                }
                activeMenu = element;
            }
        )
    }

    function setTabListener() {
        linksArr.forEach(element => {
            const sibling = element.nextElementSibling;
            if (sibling) {
                element.onclick = function() {
                    showTab();
                    checkActiveTab(sibling);
                    return false;
                }
            }
            function showTab() {
                sibling.className = "menu menu_active";
            }   
        })
    }

    function checkActiveTab(clickedTab) {
        if (!menuChanged) {
            if (!activeTab) activeTab = clickedTab;
            else if (activeTab != clickedTab) {
                hideTab()
                activeTab = clickedTab;
            }
            else if (activeTab == clickedTab) {
                hideTab();
                activeTab = null;
            }
        }
        else {
            activeTab = clickedTab;
            menuChanged = false;
        }

        function hideTab() {
            activeTab.className = "menu menu_sub";
        }
    }


    setMenuListener();
    setTabListener();
    
}

menuAction();
