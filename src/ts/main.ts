import { onHeightChange, onWidthChange, onCanvasClicked } from './eventHandlers';
import { gameAreaSize } from './globals';
import { changeGameArea, createGrid } from './functions';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const widthNumberInput = document.getElementById('widthNumber') as HTMLInputElement;
const heightNumberInput = document.getElementById('heightNumber') as HTMLInputElement;
const widthRange = document.getElementById('width') as HTMLInputElement;
const heightRange = document.getElementById('height') as HTMLInputElement;

export const ctx = canvas.getContext('2d')!;

widthNumberInput.oninput = event => {
    onWidthChange(event, widthNumberInput, widthRange, canvas, ctx);
};
widthRange.oninput = event => {
    onWidthChange(event, widthNumberInput, widthRange, canvas, ctx);
};
heightNumberInput.oninput = event => {
    onHeightChange(event, heightNumberInput, heightRange, canvas, ctx);
};
heightRange.oninput = event => {
    onHeightChange(event, heightNumberInput, heightRange, canvas, ctx);
};
canvas.onmousedown = event => {
    onCanvasClicked(event, canvas, ctx);
};

changeGameArea(canvas, ctx);
createGrid(ctx);

widthNumberInput.value = gameAreaSize.width.toString();
heightNumberInput.value = gameAreaSize.height.toString();
widthRange.value = gameAreaSize.width.toString();
heightRange.value = gameAreaSize.height.toString();
