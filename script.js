// The SVG namespace
const SVG_NS = "http://www.w3.org/2000/svg";

// The row and column indexes of the most recently drawn token
let lastRow;
let lastColumn;

// Indicates if the game is over or not
let gameOver = false;

// Indicates if the next move is the first in a game
let firstMove = true;

// The grid board element
const board = document.querySelector("section#grid");

// The display for the current turn
const turnDisplay = document.querySelector("header h2");

// Changing start token

const turnChangeButton = document.querySelector("header h2 button");

turnChangeButton.addEventListener("click", () => {
    if (!firstMove) return;
    changeTurn();
});

// The display for the current token
const turnIcon = document.querySelector("header h2 span");

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
const changeTurn = function() {
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
// Making, drawing, and previewing a nought on a cell.
// 
// ====================================================================================================


/**
 * Creates an empty SVG element.
 * @returns An empty SVG element.
 */
const makeSVG = function() {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("height", "100%");
    svg.setAttribute("width", "100%");
    svg.setAttribute("viewBox", "0 0 100 100");
    return svg;
}

/**
 * Creates a nought as an SVG circle.
 * @returns A colourless default circle for a nought.
 */
const makeCircle = function() {
    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "35");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke-width", "3px");
    circle.setAttribute("stroke-linecap", "round");
    circle.setAttribute("stroke-dasharray", "1");
    circle.setAttribute("pathLength", "1");
    circle.setAttribute("transform", "rotate(-90 50 50)");
    return circle;
}

/**
 * Draws a nought on a cell.
 * @param {number} row The cell's row index to draw the nought.
 * @param {number} column The cell's column index to draw the nought.
 */
const drawNought = function(row, column) {
    if (row < 0 || row > 2 || column < 0 || column > 2) throw new RangeError("Invalid row or column index");
    
    const circle = makeCircle();
    circle.setAttribute("stroke", "#1B4332");
    circle.setAttribute("stroke-dashoffset", "-1");

    const svg = makeSVG();
    svg.append(circle);

    const cell = document.querySelector(`section#grid > div#cell-${row + 1}-${column + 1}`);
    cell.replaceChildren();
    cell.append(svg);
}

/**
 * Previews a nought on a cell.
 * @param {number} row The cell's row index to preview the nought.
 * @param {number} column The cell's column index to preview the nought.
 */
const previewNought = function(row, column) {
    if (row < 0 || row > 2 || column < 0 || column > 2) throw new RangeError("Invalid row or column index");

    const circle = makeCircle();
    circle.classList.add("preview");
    circle.setAttribute("stroke", "#DEE2E6");

    const svg = makeSVG();
    svg.append(circle);

    const cell = document.querySelector(`section#grid > div#cell-${row + 1}-${column + 1}`);
    cell.replaceChildren();
    cell.append(svg);
}


// ====================================================================================================
// 
// Making, drawing, and previewing a cross on a cell.
// 
// ====================================================================================================


/**
 * Creates the first line in an SVG cross.
 * @returns A colourless default forward-slanting line for a cross.
 */
const makeLine1 = function() {
    const line1 = document.createElementNS(SVG_NS, "line");
    line1.setAttribute("x1", "85");
    line1.setAttribute("y1", "15");
    line1.setAttribute("x2", "15");
    line1.setAttribute("y2", "85");
    line1.setAttribute("stroke-width", "3px");
    line1.setAttribute("stroke-linecap", "round");
    line1.setAttribute("stroke-dasharray", "1");
    line1.setAttribute("pathLength", "1");
    return line1;
}

/**
 * Creates the second line in an SVG cross.
 * @returns A colourless default backward-slanting line for a cross.
 */
const makeLine2 = function() {
    const line2 = document.createElementNS(SVG_NS, "line");
    line2.setAttribute("x1", "15");
    line2.setAttribute("y1", "15");
    line2.setAttribute("x2", "85");
    line2.setAttribute("y2", "85");
    line2.setAttribute("stroke-width", "3px");
    line2.setAttribute("stroke-linecap", "round");
    line2.setAttribute("stroke-dasharray", "1");
    line2.setAttribute("pathLength", "1");
    return line2;
}

/**
 * Draws a cross on a cell.
 * @param {number} row The cell's row index to draw the cross.
 * @param {number} column The cell's column index to draw the cross.
 */
const drawCross = function(row, column) {
    if (row < 0 || row > 2 || column < 0 || column > 2) throw new RangeError("Invalid row or column index");
    
    const line1 = makeLine1();
    line1.setAttribute("stroke", "#023E8A");
    line1.setAttribute("stroke-dashoffset", "1");

    const line2 = makeLine2();
    line2.setAttribute("stroke", "#023E8A");
    line2.setAttribute("stroke-dashoffset", "1");

    const svg = makeSVG();
    svg.append(line1, line2);

    const cell = document.querySelector(`section#grid > div#cell-${row + 1}-${column + 1}`);
    cell.replaceChildren();
    cell.append(svg);
}

/**
 * Previews a cross on a cell.
 * @param {number} row The cell's row index to preview the cross.
 * @param {number} column The cell's column index to preview the cross.
 */
const previewCross = function(row, column) {
    if (row < 0 || row > 2 || column < 0 || column > 2) throw new RangeError("Invalid row or column index");

    const line1 = makeLine1();
    line1.classList.add("preview");
    line1.setAttribute("stroke", "#DEE2E6");

    const line2 = makeLine2();
    line2.classList.add("preview");
    line2.setAttribute("stroke", "#DEE2E6");

    const svg = makeSVG();
    svg.append(line1, line2);

    const cell = document.querySelector(`section#grid > div#cell-${row + 1}-${column + 1}`);
    cell.replaceChildren();
    cell.append(svg);
}


// ====================================================================================================
// 
// Cell
// 
// ====================================================================================================


/**
 * A cell in the grid. Handles user events on each cell, and manages the token on the cell.
 */
class Cell {
    /**
     * Creates a new cell.
     * @param {number} row The cell's row index.
     * @param {number} column The cell's column index.
     */
    constructor(row, column) {
        if (row < 0 || row > 2 || column < 0 || column > 2) throw new RangeError("Invalid row or column index");

        this.element = document.querySelector(`section#grid > div#cell-${row + 1}-${column + 1}`);
        this.token = null;

        // Show preview on hover
        this.element.addEventListener("mouseenter", () => {
            if (this.token !== null || gameOver) return;

            if (turn === "x") previewCross(row, column);
            else previewNought(row, column);
        });

        // Remove preview after hover
        this.element.addEventListener("mouseleave", () => {
            if (this.token !== null || gameOver) return;
            this.element.replaceChildren();
        });

        // Draw token on click
        this.element.addEventListener("click", () => {
            if (this.token !== null || gameOver) return;

            if (turn === "x") drawCross(row, column);
            else drawNought(row, column);

            lastRow = row;
            lastColumn = column;
            this.token = turn;
            changeTurn();

            if (firstMove) {
                turnChangeButton.setAttribute("disabled", "true");
                firstMove = false;
            }
        });
    }

    /**
     * Highlights the cell to show a win line.
     * @param {string} token The winning token.
     */
    showWin(token) {
        this.element.classList.add(token === "x" ? "cross-win" : "nought-win");
    }

    /**
     * Resets the cell.
     */
    reset() {
        this.token = null;
        this.element.replaceChildren();
        this.element.classList.remove("nought-win", "cross-win");
    }
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
     * Creates a new grid.
     */
    constructor() {
        this.cells = [];

        // Initialize the cells
        for (let row = 0; row < 3; row++) {
            this.cells.push([]);

            for (let column = 0; column < 3; column++) {
                this.cells[row].push(new Cell(row, column));
            }
        }

        // Check for a win after a move
        document.querySelector("section#grid").addEventListener("click", () => {
            this.checkWin();
        });
    }

    /**
     * Checks for a winning row. Highlights the winning row if found.
     * @returns True if there is a winning row, else false.
     */
    checkRow() {
        const token = this.cells[lastRow][lastColumn].token;
        const win = this.cells[lastRow][(lastColumn + 1) % 3].token === token && this.cells[lastRow][(lastColumn + 2) % 3].token === token;
        
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
        const token = this.cells[lastRow][lastColumn].token;
        const win = this.cells[(lastRow + 1) % 3][lastColumn].token === token && this.cells[(lastRow + 2) % 3][lastColumn].token === token;
        
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
        const token = this.cells[lastRow][lastColumn].token;
        const win = this.cells[0][2].token === token && this.cells[1][1].token === token && this.cells[2][0].token === token;
        
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
        const token = this.cells[lastRow][lastColumn].token;
        const win = this.cells[0][0].token === token && this.cells[1][1].token === token && this.cells[2][2].token === token;
        
        if (win) {
            this.cells[0][0].showWin(token);
            this.cells[1][1].showWin(token);
            this.cells[2][2].showWin(token);
        }

        return win;
    }

    /**
     * Checks for a win. Highlights the winning line.
     */
    checkWin() {
        if (gameOver) return;

        if (this.checkRow() || this.checkColumn() || this.checkForwardDiagonal() || this.checkBackwardDiagonal()) {
            turnDisplay.replaceChildren("Winner:", turnChangeButton);
            toggleTurnIcon();
            gameOver = true;
            board.classList.add("end");
        }
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


const grid = new Grid();

// Game resetting

const resetButton = document.querySelector("header button");

resetButton.addEventListener("click", () => {
    grid.reset();
});
