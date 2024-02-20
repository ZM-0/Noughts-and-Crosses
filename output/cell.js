import { Turn } from "./game.js";
import { changeTurn, turnChangeButton } from "./script.js";
// The SVG namespace
const SVG_NS = "http://www.w3.org/2000/svg";
// The preview colour for tokens
const PREVIEW_COLOUR = "#DEE2E6";
/**
 * Creates an empty SVG element.
 * @returns An empty SVG element.
 */
const makeSVG = function () {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("height", "100%");
    svg.setAttribute("width", "100%");
    svg.setAttribute("viewBox", "0 0 100 100");
    return svg;
};
// ====================================================================================================
// 
// Functions for making, drawing, and previewing a nought on a cell.
// 
// ====================================================================================================
// The nought token colour
const NOUGHT_COLOUR = "#1B4332";
/**
 * Creates a nought as an SVG circle.
 * @returns A colourless default circle for a nought.
 */
const makeCircle = function () {
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
};
/**
 * Draws or previews a nought on a cell.
 * @param {HTMLElement} cell The cell to draw the nought on.
 * @param {boolean} preview Indicates whether to draw the nought as a preview.
 */
const drawNought = function (cell, preview = false) {
    const circle = makeCircle();
    circle.setAttribute("stroke", preview ? PREVIEW_COLOUR : NOUGHT_COLOUR);
    if (preview) {
        circle.classList.add("preview");
    }
    else {
        circle.setAttribute("stroke-dashoffset", "-1");
    }
    const svg = makeSVG();
    svg.append(circle);
    cell.replaceChildren();
    cell.append(svg);
};
// ====================================================================================================
// 
// Functions for making, drawing, and previewing a cross on a cell.
// 
// ====================================================================================================
// The cross token colour
const CROSS_COLOUR = "#023E8A";
/**
 * Creates the first line in an SVG cross.
 * @returns A colourless default forward-slanting line for a cross.
 */
const makeLine1 = function () {
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
};
/**
 * Creates the second line in an SVG cross.
 * @returns A colourless default backward-slanting line for a cross.
 */
const makeLine2 = function () {
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
};
/**
 * Draws or previews a cross on a cell.
 * @param {HTMLElement} cell The cell to draw the cross on.
 * @param {boolean} preview Indicates whether to draw the cross as a preview.
 */
const drawCross = function (cell, preview = false) {
    const line1 = makeLine1();
    const line2 = makeLine2();
    line1.setAttribute("stroke", preview ? PREVIEW_COLOUR : CROSS_COLOUR);
    line2.setAttribute("stroke", preview ? PREVIEW_COLOUR : CROSS_COLOUR);
    if (preview) {
        line1.classList.add("preview");
        line2.classList.add("preview");
    }
    else {
        line1.setAttribute("stroke-dashoffset", "1");
        line2.setAttribute("stroke-dashoffset", "1");
    }
    const svg = makeSVG();
    svg.append(line1, line2);
    cell.replaceChildren();
    cell.append(svg);
};
// ====================================================================================================
// 
// Cell
// 
// ====================================================================================================
/**
 * A cell in the grid. Handles user events on each cell, and manages the token on the cell.
 */
export class Cell {
    /**
     * The DOM element for the cell.
     */
    element;
    /**
     * The token on the cell.
     */
    token;
    /**
     * Creates a new cell.
     * @param {number} row The cell's row index.
     * @param {number} column The cell's column index.
     * @param {Game} game The game being played.
     */
    constructor(row, column, game) {
        if (row < 0 || row > 2 || column < 0 || column > 2)
            throw new RangeError("Invalid row or column index");
        this.element = document.querySelector(`section#grid > div#cell-${row + 1}-${column + 1}`);
        this.token = null;
        // Show preview on hover
        this.element.addEventListener("mouseenter", () => {
            if (this.token !== null || game.isOver)
                return;
            if (game.turn === Turn.CROSS)
                drawCross(this.element, true);
            else
                drawNought(this.element, true);
        });
        // Remove preview after hover
        this.element.addEventListener("mouseleave", () => {
            if (this.token !== null || game.isOver)
                return;
            this.element.replaceChildren();
        });
        // Draw token on click
        this.element.addEventListener("click", () => {
            if (this.token !== null || game.isOver)
                return;
            if (game.turn === Turn.CROSS)
                drawCross(this.element);
            else
                drawNought(this.element);
            game.lastPosition = [row, column];
            this.token = game.turn;
            changeTurn();
            if (!game.started) {
                turnChangeButton.setAttribute("disabled", "true");
                game.started = true;
            }
        });
    }
    /**
     * Highlights the cell to show a win line.
     * @param {Turn} token The winning token.
     */
    showWin(token) {
        this.element.classList.add(token === Turn.CROSS ? "cross-win" : "nought-win");
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
