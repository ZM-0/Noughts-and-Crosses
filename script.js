const win = function(token) {

}

class Grid {
    constructor() {
        this.cells = [
            ["empty", "empty", "empty"],
            ["empty", "empty", "empty"],
            ["empty", "empty", "empty"]
        ];
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
