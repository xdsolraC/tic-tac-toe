// GAMEBOARD
const Gameboard = (() => {
    let gameboard = [];
    for (let i = 0; i < 9; i++) {
        gameboard.push({ mark: "", painted: false });
    }

    // FUNCTION TO DISPLAY GAMEBOARD
    const display = () => {
        let newBoard = "";
        gameboard.forEach((obj, index) => {
            newBoard += `<div class="cell ${
                obj.painted ? "painted" : ""
            }" id="cell-${index}">${obj.mark}</div>`;
        });
        document.querySelector(".game-board").innerHTML = newBoard;
    };

    // FUNCTION TO MARK GAMEBOARD CELL
    const markCell = (index, marker) => {
        gameboard[index].mark = marker;
        display();
    };

    // FUNCTION TO PAINT WINNING CELLS
    const paintWinningCells = (combination) => {
        combination.forEach((index) => {
            gameboard[index].painted = true;
        });
        display();
    };

    // FUNCTION TO GET GAMEBOARD
    const getBoard = () => gameboard;

    // FUNCTION TO CLEAR GAMEBOARD
    const clearBoard = () => {
        gameboard.forEach((cell) => {
            cell.mark = "";
            cell.painted = false;
        });
        display();
    };

    return { display, markCell, paintWinningCells, getBoard, clearBoard };
})();

// PLAYER FACTORY FUNCTION
function Player(name, mark) {
    return { name, mark, wins: 0 };
}

// DISPLAY CONTROLLER
const DisplayController = (() => {
    const messageElem = document.querySelector("#message-text");
    const player1wins = document.querySelector(".wins-1");
    const player2wins = document.querySelector(".wins-2");

    // FUNCTION TO UPDATE MESSAGES
    const updateMessage = (message) => {
        messageElem.innerHTML = message;
    };

    // FUNCTION TO UPDATE PLAYER WINS.
    const updateWins = (players) => {
        player1wins.textContent = players[0].wins;
        player2wins.textContent = players[1].wins;
    };

    return { updateMessage, updateWins };
})();
