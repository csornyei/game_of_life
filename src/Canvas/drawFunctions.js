import { CELL_SIZE } from "../constants";

export const drawGrid = (ctx, width, height) => {
    ctx.beginPath();

    ctx.strokeStyle = "#0f0f0f";

    for (let i = 0; i < width; i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    for (let i = 0; i < height; i++) {
        ctx.moveTo(0, i * (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE + 1) * width + 1, i * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
}

export const drawCells = (ctx, width, height, cells) => {
    ctx.beginPath();

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = row * width + col;

            ctx.fillStyle = cells[idx] === 1 ? "#000" : "#fff";

            ctx.fillRect(
                col * (CELL_SIZE + 1) + 1,
                row * (CELL_SIZE + 1) + 1,
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }

    ctx.stroke();
}