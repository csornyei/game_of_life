const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const widthNumberInput = document.getElementById("widthNumber");
const heightNumberInput = document.getElementById("heightNumber");
const widthRange = document.getElementById("width");
const heightRange = document.getElementById("height");

changeGameArea();
createGrid();

widthNumberInput.value = gameAreaSize.width;
heightNumberInput.value = gameAreaSize.height;
widthRange.value = gameAreaSize.width;
heightRange.value = gameAreaSize.height;