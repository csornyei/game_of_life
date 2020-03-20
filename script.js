const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const widthNumberInput = document.getElementById("widthNumber");
const heightNumberInput = document.getElementById("heightNumber");
const speedNumberInput = document.getElementById("speedNumber");
const widthRange = document.getElementById("width");
const heightRange = document.getElementById("height");
const speedRange = document.getElementById("speed");
const startStopButton = document.getElementById("startStopButton");
const generationSpan = document.getElementById("generation");

changeGameArea();
createGrid();
initCells();

let interval = setInterval(() => {
    reDraw()
}, frameLength);

widthNumberInput.value = gameAreaSize.width;
heightNumberInput.value = gameAreaSize.height;
speedNumberInput.value = frameLength;
widthRange.value = gameAreaSize.width;
heightRange.value = gameAreaSize.height;
speedRange.value = frameLength;