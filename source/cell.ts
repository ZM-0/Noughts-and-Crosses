import { Game, Turn } from "./game.js";
import { switchTurnButton, turnIcon } from "./script.js";

/**
 * A cell in a grid. Handles user input on itself and manages and displays any token on itself.
 */
export class Cell {
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
     * The token on the cell.
     */
    public token: Turn | null = null;

    /**
     * Creates a new cell view.
     * @param {number} row The cell's row index.
     * @param {number} column The cell's column index.
     * @param {Game} game The current game.
     */
    public constructor(row: number, column: number, game: Game) {
        this.element = document.querySelector(`section#grid > div#cell-${row + 1}-${column + 1}`)!;

        // Show preview on hover
        this.element.addEventListener("mouseenter", () => {
            if (this.token || game.isOver) return;
            this.draw(game.turn, true);
        });
    
        // Remove preview after hover
        this.element.addEventListener("mouseleave", () => {
            if (this.token || game.isOver) return;
            this.element.replaceChildren();
        });
    
        // Draw token on click
        this.element.addEventListener("click", () => {
            if (this.token || game.isOver) return;
            
            this.draw(game.turn);
            this.token = game.turn;
            game.lastPosition = [row, column];
            game.switchTurn();
            turnIcon.switch();
    
            if (!game.started) {
                switchTurnButton.setAttribute("disabled", "true");
                game.started = true;
            }
        });
    }
    
    /**
     * Creates an empty SVG element.
     * @returns An empty SVG element.
     */
    private makeSVG(): SVGSVGElement {
        const svg: SVGSVGElement = document.createElementNS(Cell.SVG_NS, "svg") as SVGSVGElement;
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
        const circle: SVGCircleElement = document.createElementNS(Cell.SVG_NS, "circle") as SVGCircleElement;
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
        circle.setAttribute("stroke", preview ? Cell.PREVIEW_COLOUR : Cell.NOUGHT_COLOUR);
    
        if (preview) {
            circle.classList.add("preview");
        } else {
            circle.setAttribute("stroke-dashoffset", "-1");
        }

        const svg: SVGSVGElement = this.makeSVG();
        svg.append(circle);
        this.element.replaceChildren(svg);
    }
    
    /**
     * Creates the first line in an SVG cross.
     * @returns A colourless default forward-slanting line for a cross.
     */
    private makeLine1(): SVGLineElement {
        const line1: SVGLineElement = document.createElementNS(Cell.SVG_NS, "line") as SVGLineElement;
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
        const line2: SVGLineElement = document.createElementNS(Cell.SVG_NS, "line") as SVGLineElement;
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
        line1.setAttribute("stroke", preview ? Cell.PREVIEW_COLOUR : Cell.CROSS_COLOUR);
        line2.setAttribute("stroke", preview ? Cell.PREVIEW_COLOUR : Cell.CROSS_COLOUR);
    
        if (preview) {
            line1.classList.add("preview");
            line2.classList.add("preview");
        } else {
            line1.setAttribute("stroke-dashoffset", "1");
            line2.setAttribute("stroke-dashoffset", "1");
        }
    
        const svg: SVGSVGElement = this.makeSVG();
        svg.append(line1, line2);
        this.element.replaceChildren(svg);
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
            this.element.classList.add(this.token === Turn.CROSS ? "cross-win" : "nought-win");
        } else {
            this.element.classList.remove("nought-win", "cross-win");
        }
    }

    /**
     * Resets the cell and its display.
     */
    public reset(): void {
        this.token = null;
        this.element.replaceChildren();
        this.highlight(false);
    }
}
