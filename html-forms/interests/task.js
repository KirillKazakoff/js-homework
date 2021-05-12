const interests = document.querySelectorAll(".interest__check");

interests.forEach(interest => 
    interest.addEventListener("change", () => onValueChange(interest))
)

function onValueChange(interest) {
    const parents = getParentsList(interest);
    const children = getChildrenList(interest);
    const allArray = parents.concat(children);
    const siblings  = getSiblingsList(interest);

    if (interest.checked) {
        parentsAndChildrenCheck(allArray);
    }
    else {
        parentsUncheck(siblings);
        childrenUncheck(children);
    }
    checkOrUncheckIndetermin(siblings);
}




function getParentsList(clickedInterest) {
    const parents = [];
    let htmlTree = clickedInterest.closest("li");

    while (htmlTree.parentElement.classList.contains("interests")) {
        const previousInterest = htmlTree.parentElement.previousElementSibling.firstElementChild;

        parents.push(previousInterest);
        htmlTree = htmlTree.parentElement.closest("li");
    }
    return parents;
}

function getChildrenList(clickedInterest) {
    let htmlTree = clickedInterest.closest("li");
    const children = Array.from(htmlTree.querySelectorAll(".interest__check"));

    children.splice(0, 1);
    return children;
}

function getSiblingsList(clickedInterest) {
    let htmlTree = clickedInterest.closest("ul");
    const liSiblings = Array.from(htmlTree.children);
    const interestSiblings = [];
    
    liSiblings.forEach(element => {
        while (element.className != "interest__check") {
            element = element.firstElementChild;
        }
        interestSiblings.push(element);
    })
    return interestSiblings;
}




function parentsAndChildrenCheck(all) {
    all.forEach(element => element.checked = true);
} 

function childrenUncheck(children) {
    children.forEach(element => element.checked = false);
}

function parentsUncheck(siblings) {
    if (siblings.every(element => element.checked == false)) {
        parentsActionRecourse(siblings[0], "checked", false, parentsUncheck)
    }
}

function checkOrUncheckIndetermin(siblings) {
    if (siblings.some(element => element.checked == true)) {
        if (!siblings.every(element => element.checked == true)) {
            parentsActionRecourse(siblings[0], "indeterminate", true, checkOrUncheckIndetermin)   
        }
    }

    if (
        siblings.every(element => element.checked) || 
        siblings.every(element => !element.checked)
    ) 
    parentsActionRecourse(siblings[0], "indeterminate", false, checkOrUncheckIndetermin)
}

function parentsActionRecourse(sibling, condition, bool, callback) {
    const closestUl = sibling.closest("ul");

    if (closestUl.className != "") {
        const parentInterest = closestUl.previousElementSibling.firstElementChild;
        const parentSiblings = getSiblingsList(parentInterest);
        
        parentInterest[condition] = bool;
        callback(parentSiblings);
    }
}
