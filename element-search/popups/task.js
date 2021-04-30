"use strict";
function popupAction() {

    function closeListener() {
        const closingElems = document.getElementsByClassName("modal__close");
        const array = Array.from(closingElems);

        array.forEach(element => {
            element.onclick = () => closeActivePopup();
        })
    }

    function closeActivePopup() {
        const activeModal = document.getElementsByClassName("modal modal_active");
        activeModal[0].className = "modal";
    }

    function showPopup(modal) {
        modal.className = "modal modal_active";
    }

    function showSuccess() {
        const button = document.getElementsByClassName("show-success");
        const popupSuccess = document.getElementById("modal_success");
        button[0].onclick = () => {
            closeActivePopup();
            showPopup(popupSuccess);
        }
    }
    
    const popupMain = document.getElementById("modal_main"); 

    closeListener();
    showPopup(popupMain);
    showSuccess();
}

popupAction();