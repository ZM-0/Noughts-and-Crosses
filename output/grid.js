import { Cell, CellController } from "./cell.js";
import { board, resetTurn, switchTurnIcon, turnDisplay, turnSwitchButton } from "./script.js";
/**
 * The grid of cells. Checks for a win.
 */
export class Grid {
    /**
     * The cells in the grid.
     */
    cells = [];
    /**
     * The cell controllers.
     */
    controllers = [];
    /**
     * The game.
     */
    game;
    /**
     * Creates a new grid.
     * @param {Game} game The game being played.
     */
    constructor(game) {
        this.game = game;
        // Initialize the cells
        for (let row = 0; row < 3; row++) {
            this.cells.push([]);
            this.controllers.push([]);
            for (let column = 0; column < 3; column++) {
                const cell = new Cell(row, column);
                this.cells[row].push(cell);
                this.controllers[row].push(new CellController(cell, game));
            }
        }
        document.querySelector("section#grid").addEventListener("click", () => {
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
    get(row, column) {
        if (row < 0 || row > 2 || column < 0 || column > 2)
            throw new RangeError("Invalid cell row or column index");
        return this.cells[row][column];
    }
    /**
     * Checks for a winning row. Highlights the winning row if found.
     * @returns True if there is a winning row, else false.
     */
    checkRow() {
        const [row, column] = this.game.lastPosition;
        const token = this.get(row, column).token;
        const win = this.cells[row][(column + 1) % 3].token === token && this.cells[row][(column + 2) % 3].token === token;
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
        const [row, column] = this.game.lastPosition;
        const token = this.get(row, column).token;
        const win = this.cells[(row + 1) % 3][column].token === token && this.cells[(row + 2) % 3][column].token === token;
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
        const [row, column] = this.game.lastPosition;
        const token = this.get(row, column).token;
        const win = this.cells[0][2].token === token && this.cells[1][1].token === token && this.cells[2][0].token === token;
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
        const [row, column] = this.game.lastPosition;
        const token = this.get(row, column).token;
        const win = this.cells[0][0].token === token && this.cells[1][1].token === token && this.cells[2][2].token === token;
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
        if (this.game.isOver)
            return;
        if (this.checkRow() || this.checkColumn() || this.checkForwardDiagonal() || this.checkBackwardDiagonal()) {
            turnDisplay.replaceChildren("Winner:", turnSwitchButton);
            switchTurnIcon();
            this.game.isOver = true;
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
        this.game.isOver = false;
        this.game.started = false;
        board.classList.remove("end");
    }
}
