import { Cell } from "./cell.js";
import { Game, Turn } from "./game.js";

// The row and column indexes of the most recently drawn token
let lastRow: number;
let lastColumn: number;

// Indicates if the game is over or not
let gameOver = false;

// Indicates if the next move is the first in a game
let firstMove = true;

// The grid board element
const board = document.querySelector("section#grid")!;

// The display for the current turn
const turnDisplay = document.querySelector("header h2")!;

// Changing start token

export const turnChangeButton = document.querySelector("header h2 button")!;

turnChangeButton.addEventListener("click", () => {
    if (!firstMove) return;
    changeTurn();
});

// The display for the current token
const turnIcon = document.querySelector("header h2 span")!;

// The current player's token
let turn = "x";

/**
 * Changes the player icon without changing the turn.
 */
const toggleTurnIcon = function() {
    const noughtOn = turnIcon.classList.contains("nought");
    turnIcon.classList.remove(noughtOn ? "nought" : "cross");
    turnIcon.classList.add(noughtOn ? "cross" : "nought");
    turnIcon.innerHTML = noughtOn ? "close" : "circle";
}

/**
 * Changes the turn.
 */
export const changeTurn = function() {
    turn = turn === "x" ? "o" : "x";
    toggleTurnIcon();
}


/**
 * Resets the turn to crosses.
 */
const resetTurn = function() {
    turn = "x";
    turnIcon.classList.remove("nought");
    turnIcon.classList.add("cross");
    turnIcon.innerHTML = "close";
    turnChangeButton.removeAttribute("disabled");
}


// ====================================================================================================
// 
// Grid
// 
// ====================================================================================================


/**
 * The grid of cells. Checks for a win.
 */
class Grid {
    /**
     * The cells in the grid.
     */
    private readonly cells: Cell[][];
    
    /**
     * Creates a new grid.
     * @param {Game} game The game being played.
     */
    constructor(game: Game) {
        this.cells = [];

        // Initialize the cells
        for (let row = 0; row < 3; row++) {
            this.cells.push([]);

            for (let column = 0; column < 3; column++) {
                this.cells[row].push(new Cell(row, column, game));
            }
        }

        document.querySelector("section#grid")!.addEventListener("click", () => {
            // Check for a win after a move. If there is no win, but the board is full, there's a draw.
            if (!this.checkWin() && this.checkFull()) {
                turnDisplay.replaceChildren("Draw");
                gameOver = true;
                board.classList.add("end");
            }
        });
    }

    /**
     * Checks for a winning row. Highlights the winning row if found.
     * @returns True if there is a winning row, else false.
     */
    checkRow() {
        const token: Turn = this.cells[lastRow][lastColumn].token!;
        const win: boolean = this.cells[lastRow][(lastColumn + 1) % 3].token === token && this.cells[lastRow][(lastColumn + 2) % 3].token === token;
        
        if (win) {
            this.cells[lastRow][lastColumn].showWin(token);
            this.cells[lastRow][(lastColumn + 1) % 3].showWin(token);
            this.cells[lastRow][(lastColumn + 2) % 3].showWin(token);
        }

        return win;
    }

    /**
     * Checks for a winning column. Highlights the winning column if found.
     * @returns True if there is a winning column, else false.
     */
    checkColumn() {
        const token: Turn = this.cells[lastRow][lastColumn].token!;
        const win: boolean = this.cells[(lastRow + 1) % 3][lastColumn].token === token && this.cells[(lastRow + 2) % 3][lastColumn].token === token;
        
        if (win) {
            this.cells[lastRow][lastColumn].showWin(token);
            this.cells[(lastRow + 1) % 3][lastColumn].showWin(token);
            this.cells[(lastRow + 2) % 3][lastColumn].showWin(token);
        }

        return win;
    }

    /**
     * Checks for a winning forward diagonal. Highlights the winning diagonal if found.
     * @returns True if there is a winning forward diagonal, else false.
     */
    checkForwardDiagonal() {
        const token: Turn = this.cells[lastRow][lastColumn].token!;
        const win: boolean = this.cells[0][2].token === token && this.cells[1][1].token === token && this.cells[2][0].token === token;
        
        if (win) {
            this.cells[0][2].showWin(token);
            this.cells[1][1].showWin(token);
            this.cells[2][0].showWin(token);
        }

        return win;
    }

    /**
     * Checks for a winning backward diagonal. Highlights the winning diagonal if found.
     * @returns True if there is a winning backward diagonal, else false.
     */
    checkBackwardDiagonal() {
        const token: Turn = this.cells[lastRow][lastColumn].token!;
        const win: boolean = this.cells[0][0].token === token && this.cells[1][1].token === token && this.cells[2][2].token === token;
        
        if (win) {
            this.cells[0][0].showWin(token);
            this.cells[1][1].showWin(token);
            this.cells[2][2].showWin(token);
        }

        return win;
    }

    /**
     * Checks for a win. Highlights the winning line.
     * @returns A boolean indicating if there is a win.
     */
    checkWin() {
        if (gameOver) return;

        if (this.checkRow() || this.checkColumn() || this.checkForwardDiagonal() || this.checkBackwardDiagonal()) {
            turnDisplay.replaceChildren("Winner:", turnChangeButton);
            toggleTurnIcon();
            gameOver = true;
            board.classList.add("end");
            return true;
        }

        return false;
    }

    /**
     * Checks if the board is full. This will enable draw detection.
     * @returns A boolean indicating if the board is full.
     */
    checkFull() {
        for (let index = 0; index < 9; index++) {
            if (this.cells[Math.floor(index / 3)][index % 3].token === null) {
                return false;
            }
        }

        return true;
    }

    /**
     * Resets the grid.
     */
    reset() {
        for (let index = 0; index < 9; index++) {
            this.cells[Math.floor(index / 3)][index % 3].reset();
        }

        turnDisplay.replaceChildren("Turn:", turnChangeButton);
        resetTurn(); 
        gameOver = false;
        firstMove = true;
        board.classList.remove("end");       
    }
}


// ====================================================================================================
// 
// Main
// 
// ====================================================================================================


const game: Game = new Game();
const grid: Grid = new Grid(game);

// Game resetting

const resetButton = document.querySelector("header button")!;

resetButton.addEventListener("click", () => {
    grid.reset();
});
