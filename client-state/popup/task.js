"use strict";

const modal = document.getElementById("subscribe-modal");
const xButton = document.querySelector(".modal__close");

function toggleActive() {
    modal.classList.toggle("modal_active");
}

if (!getCookie("deleted")) toggleActive();

const closeHandler = function() {
    toggleActive();
    setCookie("deleted", "true");
}
xButton.addEventListener("click", closeHandler);




//fs from learnJS
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };
  
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
  
    document.cookie = updatedCookie;
  }
  
function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    cookies.forEach(cookie => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    })
}











// RegExp

// let str1 = "mary sfsdfsdf";
// console.log(/^Mary/.test(str1));

                            // Границы слова

// alert( "Hello, Java!".match(/\bJava\b/) ); // Java
// alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null

// alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
// alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56                            