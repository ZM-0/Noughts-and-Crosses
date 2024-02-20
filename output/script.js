import { Game } from "./game.js";
import { Grid } from "./grid.js";
const game = new Game();
const grid = new Grid(game);
// The current turn display
export const turnDisplay = {
    element: document.querySelector("header h2"),
    showWinner() {
        this.element.replaceChildren("Winner:", switchTurnButton);
    },
    showDraw() {
        this.element.replaceChildren("Draw");
    },
    reset() {
        this.element.replaceChildren("Turn:", switchTurnButton);
    }
};
// The current token display
export const turnIcon = {
    element: document.querySelector("header h2 span"),
    switch() {
        const noughtOn = this.element.classList.contains("nought");
        this.element.classList.remove(noughtOn ? "nought" : "cross");
        this.element.classList.add(noughtOn ? "cross" : "nought");
        this.element.innerHTML = noughtOn ? "close" : "circle";
    },
    reset() {
        this.element.classList.replace("nought", "cross");
        this.element.innerHTML = "close";
        switchTurnButton.removeAttribute("disabled");
    }
};
// User input to change starting player
export const switchTurnButton = document.querySelector("header h2 button");
switchTurnButton.addEventListener("click", () => {
    if (!game.started) {
        game.switchTurn();
        turnIcon.switch();
    }
});
// Game resetting
const resetButton = document.querySelector("header button");
resetButton.addEventListener("click", () => {
    game.reset();
    grid.reset();
    turnDisplay.reset();
    turnIcon.reset();
});
