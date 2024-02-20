import { Cell, CellController } from "./cell.js";
import { Game, Turn } from "./game.js";

// The grid board element
const board = document.querySelector("section#grid")!;

// The display for the current turn
const turnDisplay = document.querySelector("header h2")!;

// The display for the current token
const turnIcon = document.querySelector("header h2 span")!;

/**
 * Changes the player icon without changing the turn.
 */
const switchTurnIcon = function() {
    const noughtOn = turnIcon.classList.contains("nought");
    turnIcon.classList.remove(noughtOn ? "nought" : "cross");
    turnIcon.classList.add(noughtOn ? "cross" : "nought");
    turnIcon.innerHTML = noughtOn ? "close" : "circle";
}

/**
 * Resets the turn to crosses.
 */
const resetTurn = function() {
    game.reset();
    turnIcon.classList.remove("nought");
    turnIcon.classList.add("cross");
    turnIcon.innerHTML = "close";
    turnSwitchButton.removeAttribute("disabled");
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
    private readonly cells: Cell[][] = [];

    /**
     * The cell controllers.
     */
    private readonly controllers: CellController[][] = [];
    
    /**
     * Creates a new grid.
     * @param {Game} game The game being played.
     */
    public constructor(game: Game) {
        // Initialize the cells
        for (let row = 0; row < 3; row++) {
            this.cells.push([]);
            this.controllers.push([]);

            for (let column = 0; column < 3; column++) {
                const cell: Cell = new Cell(row, column);
                this.cells[row].push(cell);
                this.controllers[row].push(new CellController(cell, game));
            }
        }

        document.querySelector("section#grid")!.addEventListener("click", () => {
            // Check for a win after a move. If there is no win, but the board is full, there's a draw.
            if (!this.checkWin() && this.checkFull()) {
                turnDisplay.replaceChildren("Draw");
                game.isOver = true;
                board.classList.add("end");
            }
        });
    }

    /**
     * Gets a cell from the grid.
     * @param row The row index.
     * @param column The column index.
     * @returns The cell.
     * @throws RangeError if either index is out of bounds.
     */
    private get(row: number, column: number): Cell {
        if (row < 0 || row > 2 || column < 0 || column > 2) throw new RangeError("Invalid cell row or column index");
        return this.cells[row][column];
    }

    /**
     * Checks for a winning row. Highlights the winning row if found.
     * @returns True if there is a winning row, else false.
     */
    checkRow() {
        const [row, column] = game.lastPosition!;
        const token: Turn = this.get(row, column).token!;
        const win: boolean = this.cells[row][(column + 1) % 3].token === token && this.cells[row][(column + 2) % 3].token === token;
        
        if (win) {
            this.controllers[row][column].highlight(true);
            this.controllers[row][(column + 1) % 3].highlight(true);
            this.controllers[row][(column + 2) % 3].highlight(true);
        }

        return win;
    }

    /**
     * Checks for a winning column. Highlights the winning column if found.
     * @returns True if there is a winning column, else false.
     */
    checkColumn() {
        const [row, column] = game.lastPosition!;
        const token: Turn = this.get(row, column).token!;
        const win: boolean = this.cells[(row + 1) % 3][column].token === token && this.cells[(row + 2) % 3][column].token === token;
        
        if (win) {
            this.controllers[row][column].highlight(true);
            this.controllers[(row + 1) % 3][column].highlight(true);
            this.controllers[(row + 2) % 3][column].highlight(true);
        }

        return win;
    }

    /**
     * Checks for a winning forward diagonal. Highlights the winning diagonal if found.
     * @returns True if there is a winning forward diagonal, else false.
     */
    checkForwardDiagonal() {
        const [row, column] = game.lastPosition!;
        const token: Turn = this.get(row, column).token!;
        const win: boolean = this.cells[0][2].token === token && this.cells[1][1].token === token && this.cells[2][0].token === token;
        
        if (win) {
            this.controllers[0][2].highlight(true);
            this.controllers[1][1].highlight(true);
            this.controllers[2][0].highlight(true);
        }

        return win;
    }

    /**
     * Checks for a winning backward diagonal. Highlights the winning diagonal if found.
     * @returns True if there is a winning backward diagonal, else false.
     */
    checkBackwardDiagonal() {
        const [row, column] = game.lastPosition!;
        const token: Turn = this.get(row, column).token!;
        const win: boolean = this.cells[0][0].token === token && this.cells[1][1].token === token && this.cells[2][2].token === token;
        
        if (win) {
            this.controllers[0][0].highlight(true);
            this.controllers[1][1].highlight(true);
            this.controllers[2][2].highlight(true);
        }

        return win;
    }

    /**
     * Checks for a win. Highlights the winning line.
     * @returns A boolean indicating if there is a win.
     */
    checkWin() {
        if (game.isOver) return;

        if (this.checkRow() || this.checkColumn() || this.checkForwardDiagonal() || this.checkBackwardDiagonal()) {
            turnDisplay.replaceChildren("Winner:", turnSwitchButton);
            switchTurnIcon();
            game.isOver = true;
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
            this.controllers[Math.floor(index / 3)][index % 3].reset();
        }

        turnDisplay.replaceChildren("Turn:", turnSwitchButton);
        resetTurn(); 
        game.isOver = false;
        game.started = false;
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

// User input to change starting player

export const turnSwitchButton: HTMLButtonElement = document.querySelector("header h2 button")!;

turnSwitchButton.addEventListener("click", () => {
    if (!game.started) {
        game.switchTurn();
        switchTurnIcon();
    }
});

// Game resetting

const resetButton = document.querySelector("header button")!;

resetButton.addEventListener("click", () => {
    grid.reset();
});
