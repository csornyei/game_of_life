import { gameAreaSize } from './globals';
import { changeGameArea, fillRectangle } from './functions';

export function onWidthChange(
    event: any,
    widthNumberInput: HTMLInputElement,
    widthRange: HTMLInputElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
) {
    gameAreaSize.width = event.target.value;
    widthNumberInput.value = gameAreaSize.width.toString();
    widthRange.value = gameAreaSize.width.toString();
    changeGameArea(canvas, ctx);
}

export function onHeightChange(
    event: any,
    heightNumberInput: HTMLInputElement,
    heightRange: HTMLInputElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
) {
    console.log(typeof event);
    gameAreaSize.height = event.target!.value;
    heightNumberInput.value = gameAreaSize.height.toString();
    heightRange.value = gameAreaSize.height.toString();
    changeGameArea(canvas, ctx);
}

export function onCanvasClicked(event: MouseEvent, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const rect = canvas.getBoundingClientRect();
    const cursorPosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
    fillRectangle(cursorPosition, ctx);
}
