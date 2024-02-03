// The SVG namespace
const SVG_NS = "http://www.w3.org/2000/svg";

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
    if (row < 0 || row > 3 || column < 0 || column > 3) throw new RangeError("Invalid row or column index");
    
    const circle = makeCircle();
    circle.setAttribute("stroke", "#1B4332");
    circle.setAttribute("stroke-dashoffset", "-1");

    const svg = makeSVG();
    svg.append(circle);

    const cell = document.querySelector(`section#grid > div#cell-${row + 1}-${column + 1}`);
    cell.append(svg);
}

/**
 * Previews a nought on a cell.
 * @param {number} row The cell's row index to preview the nought.
 * @param {number} column The cell's column index to preview the nought.
 */
const previewNought = function(row, column) {
    if (row < 0 || row > 3 || column < 0 || column > 3) throw new RangeError("Invalid row or column index");
    
    const circle = makeCircle();
    circle.classList.add("preview");
    circle.setAttribute("stroke", "#DEE2E6");

    const svg = makeSVG();
    svg.append(circle);

    const cell = document.querySelector(`section#grid > div#cell-${row + 1}-${column + 1}`);
    cell.append(svg);
}

previewNought(0, 0);
drawNought(1, 1);
