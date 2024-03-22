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
        document.querySelectorAll(".cell").forEach((cell) => {
            cell.addEventListener("click", Game.handleClick);
        });
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
        // Add fade in animation
        messageElem.classList.remove("fadeIn");
        void messageElem.offsetWidth;
        messageElem.classList.add("fadeIn");
    };

    // FUNCTION TO UPDATE PLAYER WINS.
    const updateWins = (players) => {
        player1wins.textContent = players[0].wins;
        player2wins.textContent = players[1].wins;
    };

    return { updateMessage, updateWins };
})();

// GAME MODULE
const Game = (() => {
    let players = [];
    let currentPlayer;
    let isGameFinished;
    let isReset;

    const startBtn = document.querySelector("#start-btn");
    const player1 = document.querySelector("#player-1");
    const player2 = document.querySelector("#player-2");

    const start = () => {
        players = [
            Player(player1.value.trim() || "Player 1", "X"),
            Player(player2.value.trim() || "Player 2", "O"),
        ];
        currentPlayer = 0;
        isGameFinished = false;
        isReset = false;
        Gameboard.display();
        DisplayController.updateMessage(`${players[currentPlayer].name} plays`);
        startBtn.disabled = true;
    };

    const restart = () => {
        isGameFinished = false;
        isReset = false;
        Gameboard.clearBoard();
        DisplayController.updateMessage(`${players[currentPlayer].name} plays`);
    };

    const reset = () => {
        players.forEach((player) => (player.wins = 0));
        isGameFinished = true;
        isReset = true;
        Gameboard.clearBoard();
        DisplayController.updateMessage("Click start to play");
        DisplayController.updateWins(players);
        startBtn.disabled = false;
    };

    const handleClick = (event) => {
        if (isGameFinished) {
            if (isReset) {
                return;
            }
            restart();
            return;
        }

        const index = parseInt(event.target.id.slice(length - 1));
        const boardCell = Gameboard.getBoard()[index].mark;

        // Prevent marking non empty cells.
        if (boardCell !== "") return;

        // Mark cell with currentPlayer's mark
        const currentPlayerMark = players[currentPlayer].mark;
        Gameboard.markCell(index, currentPlayerMark);

        currentPlayer = currentPlayer === 0 ? 1 : 0;
        DisplayController.updateMessage(`${players[currentPlayer].name} plays`);
    };

    return {
        start,
        restart,
        reset,
        handleClick,
    };
})();
