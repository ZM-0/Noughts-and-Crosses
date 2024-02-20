/**
 * Identifies the players.
 */
export enum Turn {
    NOUGHT,
    CROSS
}

/**
 * Maintains information about a game, such as whose turn it is and what was the latest move.
 */
export class Game {
    /**
     * Indicates whose turn it is.
     */
    public turn: Turn = Turn.CROSS;

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
}
