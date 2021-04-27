function timeCounting() {
    let timer = document.getElementById("timer");
    let text = timer.textContent.split(":");
    let url = "example.jpg";
    let check = checkTimer(text);

    switch (check) {
        case 0: 
            decreaseSec();
            break;
        case 1:
            decreaseMin();
            break;
        case 2:
            decreaseHours();
            break;
        case 3:
            alert("Вы победили в конкурсе");
            clearInterval(timerId);
            downloadFile(url);
    }

    text = formatOutput(text);
    timer.textContent = text.join(":");



    function decreaseSec() {
        text[2]--;
    }

    function decreaseMin() {
        if (text[2] == 0) {
            text[2] = 59;
            text[1] --;
        }
        else decreaseSec();
    }

    function decreaseHours() {
        if (text[2] == 0 && text[1] == 0) {
            text[2] = 59;
            text[1] = 59;
            text[0]--;
        }
        else decreaseMin();
    }
}



function checkTimer(text) {
    return text.reduce((total, elem) => {
        if (elem == 0) total++;
        return total;
    }, 0) 
}

function formatOutput(text){
    text.forEach((element, index) => {
        element = parseInt(element, 10);
        if (element < 10)
        element = '0' + element.toString();
        text[index] = element;
    })
    return text;
}

function downloadFile(url) {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "download";
    a.click();
}


const timerId = setInterval(timeCounting, 1000);