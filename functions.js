function onWidthChange(event) {
    gameAreaSize.width = event.target.value;
    widthNumberInput.value = gameAreaSize.width;
    widthRange.value = gameAreaSize.width;
    changeGameArea();
}

function onHeightChange(event) {
    gameAreaSize.height = event.target.value;
    heightNumberInput.value = gameAreaSize.height;
    heightRange.value = gameAreaSize.height;
    changeGameArea();
}

function changeGameArea() {
    canvas.width = gameAreaSize.width * GRID_PIXEL_SIZE;
    canvas.height = gameAreaSize.height * GRID_PIXEL_SIZE;
    createGrid();
}

function createGrid() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";
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

function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const cursorPosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
    fillRectangle(cursorPosition);
}

function fillRectangle(cursorPosition) {
    const {
        x,
        y
    } = cursorPosition;
    const rectLeft = x - (x % GRID_PIXEL_SIZE) + 1;
    const rectTop = y - (y % GRID_PIXEL_SIZE) + 1;
    console.log(rects);
    for (let index = 0; index < rects.length; index++) {
        const rectangle = rects[index];
        if (rectangle.top === rectTop && rectangle.left === rectLeft) {
            ctx.fillStyle = "#fff";
            ctx.fillRect(rectLeft, rectTop, GRID_PIXEL_SIZE - 2, GRID_PIXEL_SIZE - 2);
            rects.splice(index, 1);
            return;
        }
    }
    ctx.fillStyle = "#234354";
    ctx.fillRect(rectLeft, rectTop, GRID_PIXEL_SIZE - 2, GRID_PIXEL_SIZE - 2);
    rects.push({
        top: rectTop,
        left: rectLeft
    });
}