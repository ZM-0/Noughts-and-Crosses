import { Cell } from "./cell.js";
import { turnDisplay, turnIcon } from "./script.js";
/**
 * The grid of cells. Responsible for checking for a win.
 */
export class Grid {
    /**
     * The grid dimensions in cells.
     */
    static SIZE = 3;
    /**
     * The cells in the grid.
     */
    cells = [];
    /**
     * The game being played.
     */
    game;
    /**
     * The grid DOM element.
     */
    element = document.querySelector("section#grid");
    /**
     * Creates a new grid of cells.
     * @param {Game} game The game being played.
     */
    constructor(game) {
        this.game = game;
        this.createCells(game);
        // Check for win or draw on click
        this.element.addEventListener("click", () => {
            if (this.game.isOver)
                return;
            const winLine = this.checkLines();
            if (winLine) {
                this.game.isOver = true;
                this.element.classList.add("end");
                turnDisplay.showWinner();
                turnIcon.switch();
                for (const cell of winLine)
                    cell.highlight(true);
            }
            else if (this.isFull()) {
                this.game.isOver = true;
                this.element.classList.add("end");
                turnDisplay.showDraw();
            }
        });
    }
    /**
     * Creates the cells.
     * @param {Game} game The current game.
     */
    createCells(game) {
        for (let row = 0; row < Grid.SIZE; row++) {
            this.cells.push([]);
            for (let column = 0; column < Grid.SIZE; column++) {
                this.cells[row].push(new Cell(row, column, game));
            }
        }
    }
    /**
     * Checks if all cells have a token.
     * @returns A boolean indicating if all cells are filled.
     */
    isFull() {
        for (const row of this.cells) {
            for (const cell of row) {
                if (!cell.token)
                    return false;
            }
        }
        return true;
    }
    /**
     * Checks all straight lines for a win.
     * @returns A list of the cells in the winning line if any, or null if there is no winning line.
     * @throws Error if the last game position is null.
     */
    checkLines() {
        if (!this.game.lastPosition)
            throw new Error("No moves taken");
        const [row, column] = this.game.lastPosition;
        const horizontal = this.cells[row];
        const vertical = this.cells.map((row) => row[column]);
        const diagonal1 = this.cells.map((row, index) => row[Grid.SIZE - index - 1]);
        const diagonal2 = this.cells.map((row, index) => row[index]);
        if (this.checkLine(horizontal))
            return horizontal;
        else if (this.checkLine(vertical))
            return vertical;
        else if (this.checkLine(diagonal1))
            return diagonal1;
        else if (this.checkLine(diagonal2))
            return diagonal2;
        else
            return null;
    }
    /**
     * Checks if a line of cells is full of one token type.
     * @param line A line of cells.
     * @returns A boolean indicating if the line is full of one token type.
     */
    checkLine(line) {
        if (!line[0].token)
            return false;
        const token = line[0].token;
        return !line.some((cell) => !cell.token || cell.token !== token);
    }
    /**
     * Resets the grid.
     */
    reset() {
        for (const row of this.cells) {
            for (const cell of row)
                cell.reset();
        }
        this.element.classList.remove("end");
    }
}
