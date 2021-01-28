import { GRID_PIXEL_SIZE } from './globals';

export class Cell {

    top: number;
    left: number;
    state: State;
    neighbours: Cell[];

    constructor(top: number, left: number, neighbours: Cell[], state: State = "dead") {
        this.top = top;
        this.left = left;
        this.state = state;
        this.neighbours = neighbours;
    }

    drawRect(ctx: CanvasRenderingContext2D) {
        if (this.state === "alive") {
            ctx.fillStyle = '#234354';
        } else {
            ctx.fillStyle = '#fff';
        }
        ctx.fillRect(this.left, this.top, GRID_PIXEL_SIZE - 2, GRID_PIXEL_SIZE - 2);
    }

    changeState(state?: State) {
        if (state) {
            this.state = state;
        } else {
            if (this.state === "willDie") {
                this.state = "dead";
            } else if (this.state === "willLive") {
                this.state = "alive";
            }
        }
    }

    isAlive() {
        return this.state === "alive";
    }

    isDead() {
        return this.state === "dead";
    }

    step() {
        let aliveNeighbours: number = 0;
        for (const neighbour of this.neighbours) {
            if (neighbour.isAlive()) {
                aliveNeighbours += 1;
            }
        }

        if (aliveNeighbours < 2 && this.isAlive()) {
            // UNDERPOPULATION
            this.changeState("willDie");
            return;
        } else if ((aliveNeighbours === 2 || aliveNeighbours === 3) && this.isAlive()) {
            // LIVE TO THE NEXT GENERATION
            return;
        } else if ((aliveNeighbours === 2 || aliveNeighbours === 3) && this.isDead()) {
            // REPRODUCTION
            this.changeState("willLive");
            return;
        } else if (aliveNeighbours > 3 && this.isAlive()) {
            // OVERPOPULATION
            this.changeState("willDie");
            return;
        }
    }
}

type State = "dead" | "alive" | "willLive" | "willDie";