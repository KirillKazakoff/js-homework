
    const drop = document.querySelector(".dropdown");
    const dropList = document.querySelector(".dropdown__list");
    const itemLinks = document.querySelectorAll(".dropdown__link");
    const activeItem = document.querySelector(".dropdown__value");
    

    function listenShowList() {
        drop.addEventListener("click", (event) => {
            if (event.target.className == "dropdown__value") {
                toggleList();
            }
        });
    }

    function listenSelectValue() {
        itemLinks.forEach(element => {
            element.addEventListener("click", function(e) {
                activeItem.textContent = this.textContent;
                toggleList();
                e.preventDefault();
            })
        });
    }

    function toggleList() {
        dropList.classList.toggle("dropdown__list_active")
    }

    listenShowList();
    listenSelectValue()

