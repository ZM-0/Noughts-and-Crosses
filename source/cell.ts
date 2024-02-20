import { Game, Turn } from "./game.js";
import { turnSwitchButton } from "./script.js";

/**
 * A cell in the grid. The cell manages any token on itself.
 */
export class Cell {
    /**
     * The cell's position.
     */
    private readonly position: [number, number];

    /**
     * The token on the cell.
     */
    public token: Turn | null = null;
    
    /**
     * Creates a new cell.
     * @param {number} row The cell's row index.
     * @param {number} column The cell's column index.
     */
    constructor(row: number, column: number) {
        if (row < 0 || row > 2 || column < 0 || column > 2) throw new RangeError("Invalid row or column index");
        this.position = [row, column];
    }

    /**
     * Gets the cell's row index.
     */
    public get row(): number {
        return this.position[0];
    }

    /**
     * Gets the cell's column index.
     */
    public get column(): number {
        return this.position[1];
    }
}

/**
 * Responsible for handling user input on the cell and displaying any token on it.
 */
export class CellController {
    /**
     * The SVG namespace
     */
    private static readonly SVG_NS: string = "http://www.w3.org/2000/svg";
    
    /**
     * The nought token colour
     */
    private static readonly NOUGHT_COLOUR: string = "#1B4332";
   
    /**
     * The cross token colour
     */
    private static readonly CROSS_COLOUR: string = "#023E8A";

    /**
     * The preview colour for tokens
     */
    private static readonly PREVIEW_COLOUR: string = "#DEE2E6";

    /**
     * The DOM element for cell being displayed.
     */
    private readonly element: HTMLElement;

    /**
     * The cell being managed.
     */
    private readonly cell: Cell;

    /**
     * Creates a new cell view.
     * @param {Cell} cell The cell being managed.
     * @param {Game} game The current game.
     */
    public constructor(cell: Cell, game: Game) {
        this.element = document.querySelector(`section#grid > div#cell-${cell.row + 1}-${cell.column + 1}`)!;
        this.cell = cell;

        // Show preview on hover
        this.element.addEventListener("mouseenter", () => {
            if (cell.token || game.isOver) return;
            this.draw(game.turn, true);
        });
    
        // Remove preview after hover
        this.element.addEventListener("mouseleave", () => {
            if (cell.token || game.isOver) return;
            this.element.replaceChildren();
        });
    
        // Draw token on click
        this.element.addEventListener("click", () => {
            if (cell.token || game.isOver) return;
            
            this.draw(game.turn);
            cell.token = game.turn;
            game.lastPosition = [cell.row, cell.column];
            game.switchTurn();
    
            if (!game.started) {
                turnSwitchButton.setAttribute("disabled", "true");
                game.started = true;
            }
        });;
    }
    
    /**
     * Creates an empty SVG element.
     * @returns An empty SVG element.
     */
    private makeSVG(): SVGSVGElement {
        const svg: SVGSVGElement = document.createElementNS(CellController.SVG_NS, "svg") as SVGSVGElement;
        svg.setAttribute("height", "100%");
        svg.setAttribute("width", "100%");
        svg.setAttribute("viewBox", "0 0 100 100");
        return svg;
    }    
    
    /**
     * Creates a nought as an SVG circle.
     * @returns A colourless default circle for a nought.
     */
    private makeCircle(): SVGCircleElement {
        const circle: SVGCircleElement = document.createElementNS(CellController.SVG_NS, "circle") as SVGCircleElement;
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
     * Draws or previews a nought on the cell.
     * @param {boolean} preview Indicates whether to draw the nought as a preview.
     */
    private drawNought(preview: boolean = false): void {    
        const circle: SVGCircleElement = this.makeCircle();
        circle.setAttribute("stroke", preview ? CellController.PREVIEW_COLOUR : CellController.NOUGHT_COLOUR);
    
        if (preview) {
            circle.classList.add("preview");
        } else {
            circle.setAttribute("stroke-dashoffset", "-1");
        }
    
        const svg: SVGSVGElement = this.makeSVG();
        svg.append(circle);
    
        this.element.replaceChildren();
        this.element.append(svg);
    }
    
    /**
     * Creates the first line in an SVG cross.
     * @returns A colourless default forward-slanting line for a cross.
     */
    private makeLine1(): SVGLineElement {
        const line1: SVGLineElement = document.createElementNS(CellController.SVG_NS, "line") as SVGLineElement;
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
    private makeLine2(): SVGLineElement {
        const line2: SVGLineElement = document.createElementNS(CellController.SVG_NS, "line") as SVGLineElement;
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
     * Draws or previews a cross on the cell.
     * @param {boolean} preview Indicates whether to draw the cross as a preview.
     */
    private drawCross(preview: boolean = false): void {    
        const line1 = this.makeLine1();
        const line2 = this.makeLine2();
        line1.setAttribute("stroke", preview ? CellController.PREVIEW_COLOUR : CellController.CROSS_COLOUR);
        line2.setAttribute("stroke", preview ? CellController.PREVIEW_COLOUR : CellController.CROSS_COLOUR);
    
        if (preview) {
            line1.classList.add("preview");
            line2.classList.add("preview");
        } else {
            line1.setAttribute("stroke-dashoffset", "1");
            line2.setAttribute("stroke-dashoffset", "1");
        }
    
        const svg = this.makeSVG();
        svg.append(line1, line2);
    
        this.element.replaceChildren();
        this.element.append(svg);
    }

    /**
     * Draws or previews a token on the cell.
     * @param symbol Indicates whether to draw a nought or a cross.
     * @param preview Indicates whether to draw a preview or the coloured token.
     */
    private draw(symbol: Turn, preview: boolean = false): void {
        if (symbol === Turn.NOUGHT) this.drawNought(preview);
        else this.drawCross(preview);
    }

    /**
     * Highlights the cell to show it's part of a win line.
     * @param {boolean} highlight Indicates whether to highlight or unhighlight the cell.
     */
    public highlight(highlight: boolean) {
        if (highlight) {
            this.element.classList.add(this.cell.token === Turn.CROSS ? "cross-win" : "nought-win");
        } else {
            this.element.classList.remove("nought-win", "cross-win");
        }
    }

    /**
     * Resets the cell and its display.
     */
    public reset(): void {
        this.cell.token = null;
        this.element.replaceChildren();
        this.highlight(false);
    }
}
