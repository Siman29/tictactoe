/*For Machine v/s Person */
var parameters = location.search.substring(1).split("&");
var temp = parameters[0].split("=");
name1 = unescape(temp[1]);

temp = parameters[1].split("=");
player1 = unescape(temp[1]);


alert("Player1: " + name1 + "  Symbol u have chosed: " + player1);

var gameactive = true;
var statusDisplay = document.querySelector('.game_status');
var gamestate = ["", "", "", "", "", "", "", "", ""];
if (player1 === "X") {
    player2 = "O"
} else {
    player2 = "X"
}
var name2 = "Computer";
currentplayer = player2;
name = name2;
var c1 = 0;
var c2 = 0;
var cdraw = 0;
document.getElementById("name1").innerHTML = name1;
document.getElementById("score1").innerHTML = 0;
document.getElementById("name2").innerHTML = name2;
document.getElementById("score2").innerHTML = 0;
document.getElementById("draw").innerHTML = "Draw"
document.getElementById("score").innerHTML = 0;
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




function playerMove() {
    document.querySelectorAll('.square').forEach(square => square.addEventListener('click', play));
}

function computerMove() {
    let bestscore = -Infinity;
    let bestMove;
    for (let i = 0; i <= 8; i++) {
        if (gamestate[i] == "") {
            gamestate[i] = player2;
            let score = Number(minimax(gamestate, 0, true));
            gamestate[i] = "";
            if (score > bestscore) {
                bestscore = score;
                bestMove = i;
            }
        }
    }
    gameactive = true;
    gamestate[bestMove] = player2;
    var board = document.getElementById(bestMove);
    board.innerHTML = player2;
    var r = result();
    if (!gameactive) {
        display(r);
    } else if (gameactive) {
        currentplayer = player1;
        name = name1;
        statusDisplay.innerHTML = currentPlayerTurn();
        playerMove();
    }
}


function minimax(gamestate, depth, isMaximizing) {
    let r = Number(result());
    if (r) {
        return r;
    }
    let d = depth;
    if (isMaximizing) {
        let bestscore = -Infinity;
        for (let i = 0; i <= 8; i++) {
            if (gamestate[i] == "") {
                gamestate[i] = player2;
                d = d + 1;
                let score = Number(minimax(gamestate, d, false));
                gamestate[i] = "";
                bestscore = Math.max(score, bestscore)

            }
        }
        return bestscore;
    } else if (!isMaximizing) {
        let bestscore = Infinity;
        for (let i = 0; i <= 8; i++) {
            if (gamestate[i] == "") {
                gamestate[i] = player1;
                d = d + 1;
                let score = Number(minimax(gamestate, d, true));
                gamestate[i] = "";
                bestscore = Math.min(score, bestscore)
            }
        }
        return bestscore;
    }

}

function display(r) {
    if (r === 1 || r === -1) {
        statusDisplay.innerHTML = winningMessage();
        if (r === 1) {
            c2 = c2 + 1;
            document.getElementById("score2").innerHTML = c2;
        } else {
            c1 = c1 + 1;
            document.getElementById("score1").innerHTML = c1;
        }
    } else if (r === 0) {
        statusDisplay.innerHTML = drawMessage();
        cdraw = cdraw + 1;
        document.getElementById("score").innerHTML = cdraw;
    } else {
        return;
    }
}


function play(clickedCellEvent) {
    var clickcell = clickedCellEvent.target;
    var clickedcellindex = parseInt(clickcell.getAttribute('data-cell-index'));
    if (!gameactive || gamestate[clickedcellindex] !== "") {
        return;
    }
    clickcell.style.color = "white"
    gamestate[clickedcellindex] = currentplayer;
    clickcell.innerHTML = currentplayer;
    var r = result();
    if (!gameactive) {
        display(r);
    } else if (gameactive) {
        currentplayer = player2;
        name = name2;
        statusDisplay.innerHTML = currentPlayerTurn();
        computerMove();
    }
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
    var draw = !gamestate.includes("");
    if (won) {
        gameactive = false;

        if (currentplayer === player1) {
            return -1;
        } else if (currentplayer === player2) {
            return 1;
        }

    } else if (draw) {
        gameactive = false;
        return 0;
    }


}

function restart() {
    gameactive = true;
    gamestate = ["", "", "", "", "", "", "", "", ""];
    if (player1 === "X") {
        player2 = "O"
    } else {
        player2 = "X"
    }
    for (var i = 0; i <= 8; i++) {
        var cell = document.getElementById(i);
        cell.innerHTML = "";
    }
    name2 = "Computer";
    currentplayer = player1;
    name = name1;
    statusDisplay.innerHTML = currentPlayerTurn();
    if (currentplayer === player1) {
        playerMove();
    } else {
        computerMove();
    }
}

if (currentplayer === player1) {
    playerMove();
} else {
    computerMove();
}

document.querySelector('.Restart').addEventListener('click', restart);