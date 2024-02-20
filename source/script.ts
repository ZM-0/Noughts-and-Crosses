import { Game } from "./game.js";
import { Grid } from "./grid.js";

// The grid board element
export const board = document.querySelector("section#grid")!;

// The display for the current turn
export const turnDisplay = document.querySelector("header h2")!;

// The display for the current token
const turnIcon = document.querySelector("header h2 span")!;

/**
 * Changes the player icon without changing the turn.
 */
export const switchTurnIcon = function() {
    const noughtOn = turnIcon.classList.contains("nought");
    turnIcon.classList.remove(noughtOn ? "nought" : "cross");
    turnIcon.classList.add(noughtOn ? "cross" : "nought");
    turnIcon.innerHTML = noughtOn ? "close" : "circle";
}

/**
 * Resets the turn to crosses.
 */
export const resetTurn = function() {
    game.reset();
    turnIcon.classList.remove("nought");
    turnIcon.classList.add("cross");
    turnIcon.innerHTML = "close";
    turnSwitchButton.removeAttribute("disabled");
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
