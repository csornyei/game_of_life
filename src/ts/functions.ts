import { gameAreaSize, GRID_PIXEL_SIZE, rects } from './globals';

export function changeGameArea(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    canvas.width = gameAreaSize.width * GRID_PIXEL_SIZE;
    canvas.height = gameAreaSize.height * GRID_PIXEL_SIZE;
    createGrid(ctx);
}

export function createGrid(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000';
    for (let index = 0; index < gameAreaSize.width; index++) {
        ctx.beginPath();
        ctx.moveTo(index * GRID_PIXEL_SIZE, 0);
        ctx.lineTo(index * GRID_PIXEL_SIZE, gameAreaSize.height * GRID_PIXEL_SIZE);
        ctx.closePath();
        ctx.stroke();
    }

    for (let index = 0; index < gameAreaSize.height; index++) {
        ctx.beginPath();
        ctx.moveTo(0, index * GRID_PIXEL_SIZE);
        ctx.lineTo(gameAreaSize.width * GRID_PIXEL_SIZE, index * GRID_PIXEL_SIZE);
        ctx.closePath();
        ctx.stroke();
    }
}

export function fillRectangle(cursorPosition: { x: number; y: number }, ctx: CanvasRenderingContext2D) {
    const { x, y } = cursorPosition;
    const rectLeft = x - (x % GRID_PIXEL_SIZE) + 1;
    const rectTop = y - (y % GRID_PIXEL_SIZE) + 1;
    console.log(rects);
    for (let index = 0; index < rects.length; index++) {
        const rectangle = rects[index];
        if (rectangle.top === rectTop && rectangle.left === rectLeft) {
            ctx.fillStyle = '#fff';
            ctx.fillRect(rectLeft, rectTop, GRID_PIXEL_SIZE - 2, GRID_PIXEL_SIZE - 2);
            rects.splice(index, 1);
            return;
        }
    }
    ctx.fillStyle = '#234354';
    ctx.fillRect(rectLeft, rectTop, GRID_PIXEL_SIZE - 2, GRID_PIXEL_SIZE - 2);
    rects.push({
        top: rectTop,
        left: rectLeft,
    });
}
