const loader = document.getElementById("loader");
let items = document.getElementById("items");
const main = document.querySelector(".main");
const type = document.querySelector(".type");
const url = 'https://netology-slow-rest.herokuapp.com/';

//Storage get
let currencyPrev = localStorage.getItem("currencyData");

if (currencyPrev) {
    currencyPrev = JSON.parse(currencyPrev);
    initialize(currencyPrev);
}

function initialize(obj) {
    const {Valute: valuteObj} = obj.response;

    for (let valute in valuteObj) {
        const {CharCode: charCode, Value: value} = valuteObj[valute];
        putToHtml(charCode, +value.toFixed(2));
    }
}

function putToHtml(charCode, value) {
    const code = `
    <div class="item">
        <div class="item__code">${charCode}</div>
        <div class="item__value">${value}</div>
        <div class="item__currency">руб</div>
    </div>`
    items.insertAdjacentHTML("beforeEnd", code);
}

fetch(url).then(response => {
    response.json().then(responseObj => {
        window.addEventListener("unload", refreshHandler(responseObj));
        loader.classList.remove("loader_active");
        type.textContent = "(новый)";

        createNewList();
        initialize(responseObj);
    })
})

function createNewList() {
    items.remove();
    const code = `<div id="items" class="items">`;
    main.insertAdjacentHTML("afterbegin", code);
    items = document.getElementById("items");
}

// Storage //set
const refreshHandler = function(obj) {
    const handler = function() {
        obj = JSON.stringify(obj);
        localStorage.setItem('currencyData', obj);
    }
    return handler;

}







// request.open('GET', url);
// request.responseType = 'json';


// request.onload = function() {
//     loader.classList.remove("loader_active");

//     const currencyObj = JSON.parse(request.response);
//     const {Valute: valuteObj} = currencyObj.response;

//     for (let valute in valuteObj) {
//         const {CharCode: charCode, Value: value} = valuteObj[valute];
//         putToHtml(charCode, +value.toFixed(2));
//     }
// }
// request.send();
