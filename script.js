const win = function(token) {

}


/**
 * A cell in the grid. The cell draws the token on itself.
 */
class Cell {
    /**
     * Creates a new cell and links it with the DOM element.
     * @param {number} row The cell's row index.
     * @param {number} column The cell's column index.
     */
    constructor(row, column) {
        this.element = document.querySelector(`#cell-${row}-${column}`);
    }

    /**
     * Clears any tokens on the cell.
     */
    clear() {
        this.element.replaceChildren();
    }

    /**
     * Clears the cell and draws a nought on the cell.
     */
    drawNought() {
        this.clear();

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("height", "100%");
        svg.setAttribute("width", "100%");
        svg.setAttribute("viewBox", "0 0 100 100");

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "35");
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "#1B4332");
        circle.setAttribute("stroke-width", "3px");
        circle.setAttribute("stroke-linecap", "round");
        circle.setAttribute("stroke-dasharray", "1");
        circle.setAttribute("stroke-dashoffset"," -1");
        circle.setAttribute("pathLength", "1");
        circle.setAttribute("transform", "rotate(-90 50 50)");

        svg.append(circle);
        this.element.append(svg);
    }

    /**
     * Clears the cell and draws a cross on the cell.
     */
    drawCross() {
        this.clear();

        const svg = document.createAttributeNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("height", "100%");
        svg.setAttribute("width", "100%");
        svg.setAttribute("viewBox", "0 0 100 100");

        const line1 = document.createAttributeNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", "85");
        line1.setAttribute("y1", "15");
        line1.setAttribute("x2", "15");
        line1.setAttribute("y2", "85");
        line1.setAttribute("stroke", "#023E8A");
        line1.setAttribute("stroke-width", "3px");
        line1.setAttribute("stroke-linecap", "round");
        line1.setAttribute("stroke-dasharray", "1");
        line1.setAttribute("stroke-dashoffset", "1");
        line1.setAttribute("pathLength", "1");

        const line2 = document.createAttributeNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", "15");
        line2.setAttribute("y1", "15");
        line2.setAttribute("x2", "85");
        line2.setAttribute("y2", "85");
        line2.setAttribute("stroke", "#023E8A");
        line2.setAttribute("stroke-width", "3px");
        line2.setAttribute("stroke-linecap", "round");
        line2.setAttribute("stroke-dasharray", "1");
        line2.setAttribute("stroke-dashoffset", "1");
        line2.setAttribute("pathLength", "1");

        svg.append(line1, line2);
        this.element.append(svg);
    }
}


class Grid {
    constructor() {
        this.cells = [];

        // Create the cell objects
        for (let row = 1; row < 4; row++) {
            this.cells.push([]);

            for (let column = 1; column < 4; column++) {
                this.cells[row - 1].push(new Cell(row, column));
            }
        }
    }

    checkHorizontal(row, column, token) {
        return this.cells[row][(column + 1) % 3] === token && this.cells[row][(column + 2) % 3] === token;
    }

    checkVertical(row, column, token) {
        return this.cells[(row + 1) % 3][column] === token && this.cells[(row + 2) % 3][column] === token;
    }

    checkDiagonals(row, column, token) {
        return row === 1 && column === 1 && (this.cells[0][0] === token && this.cells[2][2] === token || this.cells[2][0] === token && this.cells[0][2] === token);
    }

    place(row, column, token) {
        this.cells[row][column] = token;

        if (this.checkHorizontal(row, column, token) || this.checkVertical(row, column, token) || this.checkDiagonals(row, column, token)) {
            win(token);
        }
    }
}


const grid = new Grid();
grid.cells[2][2].drawNought();
