/**
 * Identifies the players.
 */
export enum Turn {
    NOUGHT = 1,
    CROSS
}

/**
 * Maintains information about a game, such as whose turn it is and what was the latest move.
 */
export class Game {
    /**
     * Indicates whose turn it is.
     */
    private _turn: Turn = Turn.CROSS;

    /**
     * Stores the position of the cell draw on in the last move.
     */
    public lastPosition: [number, number] | null = null;

    /**
     * Indicates if the game is over.
     */
    public isOver: boolean = false;;

    /**
     * Indicates if the game has started.
     */
    public started: boolean = false;

    /**
     * Gets the current turn.
     */
    public get turn(): Turn {
        return this._turn;
    }

    /**
     * Switches the turn between the players.
     */
    public switchTurn(): void {
        this._turn = this._turn === Turn.CROSS ? Turn.NOUGHT : Turn.CROSS;
    }

    /**
     * Resets the game.
     */
    public reset(): void {
        this._turn = Turn.CROSS;
        this.isOver = false;
        this.started = false;
    }
}
