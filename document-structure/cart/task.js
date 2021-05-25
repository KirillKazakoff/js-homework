
"use strict"

const cart = document.querySelector(".cart");
let cartArr = [];
const cartList = document.querySelector(".cart__products");

const products = Array.from(document.querySelector(".products").children);
const controls = document.querySelectorAll(".product__quantity-control");
const addButtons = document.querySelectorAll(".product__add");

//Aux functions
function getCartProduct(product) {
    const children = Array.from(cartList.children);
    return children.find(element => element.dataset.id == product.id);
}

function getShopProduct(product) {
    return products.find(element => element.dataset.id == product.id);
}

// Storage
//set
const refreshHandler = function() {
    cartArr.forEach(element => delete element.img);
    // cartArr.forEach(element => element = JSON.stringify(element, ['id', 'value']))
    cartArr = JSON.stringify(cartArr);
    localStorage.setItem('cartData', cartArr);
}

window.addEventListener("unload", refreshHandler);


//get
const cartDataStorage = JSON.parse(localStorage.getItem("cartData"));

if (cartDataStorage.length > 0) {
    cart.classList.add("cart__active");

    cartArr = cartDataStorage;
    cartArr.forEach(element => {
        const img = getShopProduct(element).querySelector("img");

        element.img = img;
        renderProduct(element);
        setDeleteListener(element);
    });
}



//Animation
function getImgCoords(img) {
    const coords = img.getBoundingClientRect();

    let {top, left} = coords;
    top = top + pageYOffset;
    left = left + pageXOffset;

    const imgObj = {top, left}
    return imgObj;
}


function setImgAnimation(product, cartProd) {
    const cartProduct = cartProd ? cartProd : getCartProduct(product); 
    const cartImg = cartProduct.querySelector(".cart__product-image");
    const shopImg = product.img;
    
    const cartImgCoords = getImgCoords(cartImg);
    const shopImgCoords = getImgCoords(shopImg);

    if (cartProduct != cartProd) {
        cartImg.classList.remove("image__active");
    }

    const cartImgCopy = document.createElement("img");
    cartImgCopy.className = "cart__product-image image__active";
    cartImgCopy.src = product.img.src;

    const {top: shopTop, left: shopLeft} = shopImgCoords;
    cartImgCopy.style.position = "absolute";
    cartImgCopy.style.top = shopTop + "px";
    cartImgCopy.style.left = shopLeft + "px";
    cart.append(cartImgCopy);
    
    // new animation
    const {top: cartTop, left: cartLeft} = cartImgCoords;

    const animation = cartImgCopy.animate([
        {top: shopTop + "px", left: shopLeft + "px"},
        {top: cartTop + "px", left: cartLeft + "px"}
    ], {
        duration: 1000,
        iterations: 1,
        easing: "ease-in-out"
    })

    animation.addEventListener("finish", () => {
        cartImg.classList.add("image__active");
        cart.removeChild(cartImgCopy);
    });

    animation.play();
}


//Cart handle logic

const addValues = function(event) {
    const htmlProduct = event.target.closest(".product");
    const {id} = htmlProduct.dataset;
    const img = htmlProduct.querySelector("img");
    const value = +htmlProduct.querySelector(".product__quantity-value").innerText;

    const activeCart = cartArr.find(element => element.id == id);


    if (value > 0) {
        if (activeCart) {
            activeCart.value = value + activeCart.value;
        }
        else {
            const productObj = {id, img, value};
            cartArr.push(productObj);
        }
    }
    else return false;
}

function renderProduct(product) {
    const {id, img, value} = product;
    const code = `
        <div class="cart__product" data-id=${id}>
            <img class="cart__product-image image__active" src=${img.src}>
            <div class="cart__product-count">${value}</div>
            <div class="cart__product-delete">Удалить из корзины</div>
        </div>`;
    
    cartList.insertAdjacentHTML("beforeEnd", code);
}


function setDeleteListener(product) {
    const deletedProduct = getCartProduct(product);
    const deleteButton = deletedProduct.querySelector(".cart__product-delete");
    
    const deleteHandler = function() {
        const {id: productId} = product;
        const activeCart = getShopProduct(product);
        const quantity = activeCart.querySelector(".product__quantity-value");

        quantity.textContent = 0;
        cartArr.splice(cartArr.findIndex(element => element.id == productId), 1);
        cartList.removeChild(deletedProduct);
        if (cartArr.length == 0) {
            cart.classList.remove("cart__active");
        }
    }

    deleteButton.addEventListener("click", deleteHandler);
}

function changeElem(cartProduct, productData) {
    const productCount = cartProduct.querySelector(".cart__product-count");
    productCount.innerText = productData.value;
}




const cartRenderHandler = function(event) {
    addValues(event);

    if (cartArr.length > 0) {
        cart.classList.add("cart__active");

        const shopProduct = event.target.closest(".product");
        const shopCount = shopProduct.querySelector(".product__quantity-value");

        if (shopCount.innerText > 0) {
            const productData = cartArr.find(product => product.id == shopProduct.dataset.id);
            const cartProduct = getCartProduct(productData);
    
            if (!cartProduct) {
                renderProduct(productData);
                setDeleteListener(productData);
            }
            else {
                changeElem(cartProduct, productData);
            }
        
            setImgAnimation(productData, cartProduct);
        }
    }

}

addButtons.forEach(element => element.addEventListener("click", cartRenderHandler));



//controls(+-)
const cartControlsHandler = function(event) {
    const {target} = event;
    let product = target.closest(".product");

    const quantity = product.querySelector(".product__quantity-value");
    let value = +quantity.innerText;

    if (target.className.includes("dec") && quantity.textContent > 0) value --;
    if (target.className.includes("inc")) value ++;
    quantity.innerText = value;
}


controls.forEach(element => element.addEventListener("click", cartControlsHandler));
























































// "use strict"

// const cart = document.querySelector(".cart");
// let cartArr = [];
// const cartList = document.querySelector(".cart__products");

// const products = Array.from(document.querySelector(".products").children);
// const controls = document.querySelectorAll(".product__quantity-control");
// const addButtons = document.querySelectorAll(".product__add");

// //Aux functions
// function getCartProduct(product) {
//     const children = Array.from(cartList.children);
//     return children.find(element => element.dataset.id == product.id);
// }

// function getShopProduct(product) {
//     return products.find(element => element.dataset.id == product.id);
// }

// // Storage
// //set
// const refreshHandler = function() {
//     cartArr.forEach(element => delete element.img);
//     // cartArr.forEach(element => element = JSON.stringify(element, ['id', 'value']))
//     cartArr = JSON.stringify(cartArr);
//     localStorage.setItem('cartData', cartArr);
// }

// window.addEventListener("unload", refreshHandler);


// //get
// const cartDataStorage = JSON.parse(localStorage.getItem("cartData"));

// if (cartDataStorage.length > 0) {
//     cart.classList.add("cart__active");

//     cartArr = cartDataStorage;
//     cartArr.forEach(element => {
//         const img = getShopProduct(element).querySelector("img");

//         element.img = img;
//         renderProduct(element);
//         setDeleteListener(element);
//     });
// }



// //Animation

// function fixCoords(obj) {
//     for (let axis in obj) {
//         obj[axis] = +obj[axis].toFixed();
//     }
// }

// function getCoefficient(start, destination) {
//     const {top: finishY, left: finishX} = destination;
//     const {top: startY, left: startX} = start;

//     const x = finishX - startX;
//     const y = startY - finishY;
//     return (x / y);
// }

// function getImgCoords(img) {
//     const coords = img.getBoundingClientRect();

//     let {top, left} = coords;
//     top = top + pageYOffset;
//     left = left + pageXOffset;

//     const imgObj = {top, left}
//     return imgObj;
// }

// function animation(origImg, copyImg, start, destination) {
//     const frameSpeed = 7;
//     fixCoords(destination); fixCoords(start);

//     const yTime = getCoefficient(start, destination) * frameSpeed;
//     const {top: finishY, left: finishX} = destination;
//     let {top: startY, left: startX} = start;

//     let startTimer = Date.now();

//     const drawer = function draw() {
//         const timePassed = (Date.now() - startTimer);
//         const length = 5; 

//         for (let i = 0; i < length; i++) {
//             if (startX != finishX) {
//                 startX = startX + 1;
//                 copyImg.style.left = startX + "px";
//             }
//             else {
//                 origImg.classList.add("image__active");
//                 cart.removeChild(copyImg);
//                 return;
//             }

//             if (timePassed >= yTime) {

//                 if (startY != finishY) {
//                     startY = startY - 1;
//                     copyImg.style.top = startY + "px";
//                 }
//                 else return;

//                 startTimer = Date.now();
//             }

//         }

//         setTimeout(draw, frameSpeed)
//     }

//     drawer();
// }

// function setImgAnimation(product, cartProd) {
//     const cartProduct = cartProd ? cartProd : getCartProduct(product); 
//     const cartImg = cartProduct.querySelector(".cart__product-image");
//     const shopImg = product.img;
    
//     const cartImgCoords = getImgCoords(cartImg);
//     const shopImgCoords = getImgCoords(shopImg);

//     if (cartProduct != cartProd) {
//         cartImg.classList.remove("image__active");
//     }

//     const cartImgCopy = document.createElement("img");
//     cartImgCopy.className = "cart__product-image image__active";
//     cartImgCopy.src = product.img.src;

//     const {top, left} = shopImgCoords;
//     cartImgCopy.style.position = "absolute";
//     cartImgCopy.style.top = top + "px";
//     cartImgCopy.style.left = left + "px";
//     cart.append(cartImgCopy);

//     animation(cartImg, cartImgCopy, shopImgCoords, cartImgCoords);
// }



// //Cart handle

// const addValues = function(event) {
//     const htmlProduct = event.target.closest(".product");
//     const {id} = htmlProduct.dataset;
//     const img = htmlProduct.querySelector("img");
//     const value = +htmlProduct.querySelector(".product__quantity-value").innerText;

//     const activeCart = cartArr.find(element => element.id == id);


//     if (value > 0) {
//         if (activeCart) {
//             activeCart.value = value + activeCart.value;
//         }
//         else {
//             const productObj = {id, img, value};
//             cartArr.push(productObj);
//         }
//     }
//     else return false;
// }

// function renderProduct(product) {
//     const {id, img, value} = product;
//     const code = `
//         <div class="cart__product" data-id=${id}>
//             <img class="cart__product-image image__active" src=${img.src}>
//             <div class="cart__product-count">${value}</div>
//             <div class="cart__product-delete">Удалить из корзины</div>
//         </div>`;
    
//     cartList.insertAdjacentHTML("beforeEnd", code);
// }


// function setDeleteListener(product) {
//     const deletedProduct = getCartProduct(product);
//     const deleteButton = deletedProduct.querySelector(".cart__product-delete");
    
//     const deleteHandler = function() {
//         const {id: productId} = product;
//         const activeCart = getShopProduct(product);
//         const quantity = activeCart.querySelector(".product__quantity-value");

//         quantity.textContent = 0;
//         cartArr.splice(cartArr.findIndex(element => element.id == productId), 1);
//         cartList.removeChild(deletedProduct);
//         if (cartArr.length == 0) {
//             cart.classList.remove("cart__active");
//         }
//     }

//     deleteButton.addEventListener("click", deleteHandler);
// }

// function changeElem(cartProduct, productData) {
//     const productCount = cartProduct.querySelector(".cart__product-count");
//     productCount.innerText = productData.value;
// }




// const cartRenderHandler = function(event) {
//     addValues(event);

//     if (cartArr.length > 0) {
//         cart.classList.add("cart__active");

//         const shopProduct = event.target.closest(".product");
//         const shopCount = shopProduct.querySelector(".product__quantity-value");

//         if (shopCount.innerText > 0) {
//             const productData = cartArr.find(product => product.id == shopProduct.dataset.id);
//             const cartProduct = getCartProduct(productData);
    
//             if (!cartProduct) {
//                 renderProduct(productData);
//                 setDeleteListener(productData);
//             }
//             else {
//                 changeElem(cartProduct, productData);
//             }
        
//             setImgAnimation(productData, cartProduct);
//         }
//     }

// }

// addButtons.forEach(element => element.addEventListener("click", cartRenderHandler));




// const cartControlsHandler = function(event) {
//     const {target} = event;
//     let product = target.closest(".product");

//     const quantity = product.querySelector(".product__quantity-value");
//     let value = +quantity.innerText;

//     if (target.className.includes("dec") && quantity.textContent > 0) value --;
//     if (target.className.includes("inc")) value ++;
//     quantity.innerText = value;
// }


// controls.forEach(element => element.addEventListener("click", cartControlsHandler));










































































































