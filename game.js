/*For Person v/s Person */
var parameters = location.search.substring(1).split("&");
var temp = parameters[0].split("=");
name1 = unescape(temp[1]);

temp = parameters[1].split("=");
name2 = unescape(temp[1]);

alert("Player1: " + name1 + "  Player2: " + name2);

document.getElementById("name1").innerHTML = name1;
document.getElementById("score1").innerHTML = 0;
document.getElementById("name2").innerHTML = name2;
document.getElementById("score2").innerHTML = 0;
document.getElementById("draw").innerHTML = "Draw"
document.getElementById("score").innerHTML = 0;
var c1 = 0;
var c2 = 0;
var cdraw = 0;

var gameactive = true;
var statusDisplay = document.querySelector('.game_status');
var gamestate = ["", "", "", "", "", "", "", "", ""];
var currentplayer = "X";
var name = name1;
var win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var winningMessage = () => `Congratulations, ${name} has won!`;
var drawMessage = () => `Ooopps.....Game ended in a draw!..Lets try once more`;
var currentPlayerTurn = () => `It's ${name}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();

function play(clickedCellEvent) {

    var clickcell = clickedCellEvent.target;
    var clickedcellindex = parseInt(clickcell.getAttribute('data-cell-index'));
    if (!gameactive || gamestate[clickedcellindex] !== "") {
        return;
    }
    if (currentplayer === "O") {
        clickcell.style.color = "white"
    }
    gamestate[clickedcellindex] = currentplayer;
    clickcell.innerHTML = currentplayer;
    result();
}

function result() {
    var won = false;
    for (var i = 0; i <= win.length - 1; i++) {
        var wincond = win[i];
        var a = gamestate[wincond[0]];
        var b = gamestate[wincond[1]];
        var c = gamestate[wincond[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        } else if (a === b && b === c) {
            won = true;
            break;
        }
    }
    if (won) {
        statusDisplay.innerHTML = winningMessage();
        if (currentplayer === "X") {
            c1 = c1 + 1;
            document.getElementById("score1").innerHTML = c1;
        } else if (currentplayer === "O") {
            c2 = c2 + 1;
            document.getElementById("score2").innerHTML = c2;
        }
        gameactive = false;
        return;
    }

    var draw = !gamestate.includes("");
    if (draw) {
        statusDisplay.innerHTML = drawMessage();
        cdraw = cdraw + 1;
        document.getElementById("score").innerHTML = cdraw;
        gameactive = false;
        return;
    }
    if (currentplayer === "X") {
        currentplayer = "O"
        name = name2;
    } else {
        currentplayer = "X"
        name = name1;
    }
    statusDisplay.innerHTML = currentPlayerTurn();
}

function restart() {
    gameactive = true;
    gamestate = ["", "", "", "", "", "", "", "", ""];
    currentplayer = "X";
    name = name1;

    for (var i = 0; i <= 8; i++) {
        var cell = document.getElementById(i);
        cell.innerHTML = "";
    }
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.square').forEach(square => square.addEventListener('click', play));
}


document.querySelectorAll('.square').forEach(square => square.addEventListener('click', play));
document.querySelector('.Restart').addEventListener('click', restart);