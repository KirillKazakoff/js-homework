function tabManager() {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab__content");
    let activeTab = document.querySelector(".tab_active");
    let activeContent = document.querySelector(".tab__content_active");
    
    function onTabClick() {
        tabs.forEach((element, index) => 
            element.addEventListener("click", function() {
                switchTab.bind(this)(index)
            })
        )
    
        function switchTab(i) {
            activeTab.className = "tab";
            activeContent.className = "tab__content";
            
            this.className = "tab tab_active";
            contents[i].classList.add("tab__content_active");
    
            activeTab = this;
            activeContent = contents[i];
        }
    }
    
    onTabClick();
}

tabManager();