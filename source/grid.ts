import { Cell } from "./cell.js";
import { Game, Turn } from "./game.js";
import { turnDisplay, turnIcon } from "./script.js";

/**
 * The grid of cells. Responsible for checking for a win.
 */
export class Grid {
    /**
     * The grid dimensions in cells.
     */
    private static readonly SIZE: number = 3;

    /**
     * The cells in the grid.
     */
    private readonly cells: Cell[][] = [];

    /**
     * The game being played.
     */
    private readonly game: Game;

    /**
     * The grid DOM element.
     */
    private readonly element: HTMLElement = document.querySelector("section#grid")!;

    /**
     * Creates a new grid of cells.
     * @param {Game} game The game being played.
     */
    public constructor(game: Game) {
        this.game = game;
        this.createCells(game);

        // Check for win or draw on click
        this.element.addEventListener("click", () => {
            if (this.game.isOver) return;

            const winLine: Cell[] | null = this.checkLines();
            if (winLine) {
                this.game.isOver = true;
                this.element.classList.add("end");
                turnDisplay.showWinner();
                turnIcon.switch();

                for (const cell of winLine) cell.highlight(true);
                
            } else if (this.isFull()) {
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
    private createCells(game: Game): void {
        for (let row: number = 0; row < Grid.SIZE; row++) {
            this.cells.push([]);

            for (let column: number = 0; column < Grid.SIZE; column++) {
                this.cells[row].push(new Cell(row, column, game));
            }
        }
    }

    /**
     * Checks if all cells have a token.
     * @returns A boolean indicating if all cells are filled.
     */
    private isFull(): boolean {
        for (const row of this.cells) {
            for (const cell of row) {
                if (!cell.token) return false;
            }
        }

        return true;
    }

    /**
     * Checks all straight lines for a win.
     * @returns A list of the cells in the winning line if any, or null if there is no winning line.
     * @throws Error if the last game position is null.
     */
    private checkLines(): Cell[] | null {
        if (!this.game.lastPosition) throw new Error("No moves taken");
        const [row, column]: [number, number] = this.game.lastPosition!;

        const horizontal: Cell[] = this.cells[row];
        const vertical: Cell[] = this.cells.map((row: Cell[]): Cell => row[column]);
        const diagonal1: Cell[] = this.cells.map((row: Cell[], index: number): Cell => row[Grid.SIZE - index - 1]);
        const diagonal2: Cell[] = this.cells.map((row: Cell[], index: number): Cell => row[index]);

        if (this.checkLine(horizontal)) return horizontal;
        else if (this.checkLine(vertical)) return vertical;
        else if (this.checkLine(diagonal1)) return diagonal1;
        else if (this.checkLine(diagonal2)) return diagonal2;
        else return null;
    }

    /**
     * Checks if a line of cells is full of one token type.
     * @param line A line of cells.
     * @returns A boolean indicating if the line is full of one token type.
     */
    private checkLine(line: Cell[]): boolean {
        if (!line[0].token) return false;
        const token: Turn = line[0].token;

        return !line.some((cell: Cell): boolean => !cell.token || cell.token !== token);
    }

    /**
     * Resets the grid.
     */
    public reset(): void {
        for (const row of this.cells) {
            for (const cell of row) cell.reset();
        }
            
        this.element.classList.remove("end"); 
    }
}
