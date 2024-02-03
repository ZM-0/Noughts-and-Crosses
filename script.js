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
    if (row < 0 || row > 3 || column < 0 || column > 3) throw new RangeError("Invalid row or column index");
    
    const line1 = makeLine1();
    line1.setAttribute("stroke", "#023E8A");
    line1.setAttribute("stroke-dashoffset", "1");

    const line2 = makeLine2();
    line2.setAttribute("stroke", "#023E8A");
    line2.setAttribute("stroke-dashoffset", "1");

    const svg = makeSVG();
    svg.append(line1, line2);

    const cell = document.querySelector(`section#grid > div#cell-${row + 1}-${column + 1}`);
    cell.append(svg);
}

/**
 * Previews a cross on a cell.
 * @param {number} row The cell's row index to preview the cross.
 * @param {number} column The cell's column index to preview the cross.
 */
const previewCross = function(row, column) {
    if (row < 0 || row > 3 || column < 0 || column > 3) throw new RangeError("Invalid row or column index");

    const line1 = makeLine1();
    line1.classList.add("preview");
    line1.setAttribute("stroke", "#DEE2E6");

    const line2 = makeLine2();
    line2.classList.add("preview");
    line2.setAttribute("stroke", "#DEE2E6");

    const svg = makeSVG();
    svg.append(line1, line2);

    const cell = document.querySelector(`section#grid > div#cell-${row + 1}-${column + 1}`);
    cell.append(svg);
}

previewNought(0, 0);
drawNought(1, 1);

previewCross(0, 2);
drawCross(2, 1)
