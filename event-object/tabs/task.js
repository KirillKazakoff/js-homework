
    const tabs = Array.from(document.querySelectorAll(".tab"));
    const contents = Array.from(document.querySelectorAll(".tab__content"));
    // let activeTab = document.querySelector(".tab_active");
    // let activeContent = document.querySelector(".tab__content_active");
    
    let activeTab = tabs.find(element =>
        element.classList.contains("tab_active")
    );
    let activeContent = contents.find(element =>
        element.classList.contains("tab__content_active")
    );
    

    function onTabClick() {
        tabs.forEach((element, index) => 
            element.addEventListener("click", function() {
                switchTab.bind(this)(index)
            })
        )
    }

    function switchTab(i) {
        activeTab.classList.remove("tab_active")
        activeContent.classList.remove("tab__content_active")

        this.classList.add("tab_active");
        contents[i].classList.add("tab__content_active");

        activeTab = this;
        activeContent = contents[i];
    }
    onTabClick();


