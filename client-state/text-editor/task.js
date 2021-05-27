"use strict";

let textarea = document.getElementById("editor");

//Storage set
const refreshHandler = function() {
    localStorage.setItem('text', textarea.value);
}

window.addEventListener("unload", refreshHandler);

// Storage get
const storageData = localStorage.getItem("text");
if (storageData) textarea.value = storageData;

