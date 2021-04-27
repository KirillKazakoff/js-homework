
function game() {
    let missclicks = 0;
    let kills = 0

    function checkBody() {
        const body = document.body;
        body.onclick = function(){
            missclicks++;
            checkLose();
            output();
        }
    }

    function checkHole()  {
        const holeList = document.getElementById("hole-list").children;
        for (i = 0; i < holeList.length; i++) {
            holeList[i].onclick = function() {
                if (this.className == "hole hole_has-mole") {
                    kills++;
                    missclicks--;
                }
                checkWin();
                output();
            }
        }
    }

    function checkLose() {
        if (missclicks >= 5) {
            alert("Вы проиграли");
            refresh();
        }
    }
    
    function checkWin() {
        if (kills >= 10) {
            alert("Вы убили кротов");
            refresh();
        }
    }

    function refresh() {
        missclicks = 0;
        kills = 0;
    }

    function output() {
        const killsTxt = document.getElementById("dead");
        const missTxt = document.getElementById("lost");

        killsTxt.textContent = kills;
        missTxt.textContent = missclicks;
    }


    checkBody();
    checkHole();
}

game();