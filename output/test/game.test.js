import { expect } from "/node_modules/chai/chai.js";
import { Game, Turn } from "../game.js";
describe("Game", () => {
    describe("constructor()", () => {
        it("Initialises attributes", () => {
            const game = new Game();
            expect(game.turn).to.equal(Turn.CROSS);
            expect(game.lastPosition).to.be.null;
            expect(game.isOver).to.be.false;
            expect(game.started).to.be.false;
        });
    });
    describe("switchTurn()", () => {
        it("Changes the turn", () => {
            const game = new Game();
            game.switchTurn();
            expect(game.turn).to.equal(Turn.NOUGHT);
            game.switchTurn();
            expect(game.turn).to.equal(Turn.CROSS);
        });
    });
    describe("reset()", () => {
        it("Resets the game", () => {
            const game = new Game();
            game.switchTurn();
            game.lastPosition = [2, 2];
            game.isOver = true;
            game.started = true;
            game.reset();
            expect(game.turn).to.equal(Turn.CROSS);
            expect(game.lastPosition).to.be.null;
            expect(game.isOver).to.be.false;
            expect(game.started).to.be.false;
        });
    });
});
