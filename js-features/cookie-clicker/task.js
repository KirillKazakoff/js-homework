function cookieOperation() {
    const img = document.getElementById("cookie");
    let count = document.getElementById("clicker__counter");
    let flag = true;
    let start = Date.now();

    img.onclick = function() {  
        count.textContent = parseInt(count.textContent) + 1;
        speedTrack(count.textContent);
        if(flag) {
            makeBigger();
            flag = false;
        }
        else {
            makeSmaller();
            flag = true;
        }
    }

    function makeBigger() {
        img.width = img.width + 10;
        img.height = img.height + 7;
    }

    function makeSmaller() {
        img.width = img.width - 10;
        img.height = img.height - 7;
    }

    function speedTrack(clicksCount) {
        let span = document.getElementById("speedSpan");
        if (span === null) {
            const span = document.createElement("span");
            span.id = "speedSpan";
            speedOutput(span);            
        }
        else {
            speedOutput(span);
        }

        function speedOutput(output) {
            const clickDiv = document.getElementById("clickDiv");
            let speed = (clicksCount / (timeDifference())).toFixed(2);
            output.textContent = speed;
            clickDiv.append(output);        
        }
    }

    function timeDifference() {
        let difference = ((Date.now() - start) / 1000).toFixed(2);
        console.log(difference);
        return difference;
    }
}

cookieOperation();
