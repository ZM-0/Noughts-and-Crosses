/**
 * Identifies the players.
 */
export var Turn;
(function (Turn) {
    Turn[Turn["NOUGHT"] = 0] = "NOUGHT";
    Turn[Turn["CROSS"] = 1] = "CROSS";
})(Turn || (Turn = {}));
/**
 * Maintains information about a game, such as whose turn it is and what was the latest move.
 */
export class Game {
    /**
     * Indicates whose turn it is.
     */
    _turn = Turn.CROSS;
    /**
     * Stores the position of the cell draw on in the last move.
     */
    lastPosition = null;
    /**
     * Indicates if the game is over.
     */
    isOver = false;
    ;
    /**
     * Indicates if the game has started.
     */
    started = false;
    /**
     * Gets the current turn.
     */
    get turn() {
        return this._turn;
    }
    /**
     * Switches the turn between the players.
     */
    switchTurn() {
        this._turn = this._turn === Turn.CROSS ? Turn.NOUGHT : Turn.CROSS;
    }
    /**
     * Resets the game.
     */
    reset() {
        this._turn = Turn.CROSS;
    }
}
