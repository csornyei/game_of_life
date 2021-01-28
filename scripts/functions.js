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

function initCells() {
    for (let x = 0; x < gameAreaSize.width; x++) {
        CELLS[x] = [];
        for (let y = 0; y < gameAreaSize.height; y++) {
            CELLS[x][y] = 0;
        }
    }
}

function updateCELLS(previousWidth, previousHeight, nextWidth, nextHeight) {

    if (nextWidth > previousWidth) {
        for (let x = previousWidth; x < nextWidth; x++) {
            CELLS[x] = [];
            for (let y = 0; y < previousHeight; y++) {
                CELLS[x][y] = 0;
            }
        }
    }
    if (nextWidth < previousWidth) {
        for (let x = previousWidth - 1; x > nextWidth; x--) {
            delete CELLS[x];
        }
    }

    if (previousHeight < nextHeight) {
        for (let x = 0; x < CELLS.length; x++) {
            const cellCol = CELLS[x];
            for (let y = previousHeight; y < nextHeight; y++) {
                cellCol[y] = 0;
            }
        }
    }

    if (previousHeight > nextHeight) {
        for (let x = 0; x < CELLS.length; x++) {
            const cellCol = CELLS[x];
            for (let y = previousHeight - 1; y > nextHeight; y--) {
                delete cellCol[y]
            }
        }
    }

    console.log(`${CELLS.length}:${CELLS[0].length}`);
}

function fillRectangle(cursorPosition) {
    const {
        x,
        y
    } = cursorPosition;
    const rectLeft = x - (x % GRID_PIXEL_SIZE) + 1;
    const rectTop = y - (y % GRID_PIXEL_SIZE) + 1;

    const cellPositionX = (rectLeft - 1) / GRID_PIXEL_SIZE;
    const cellPositionY = (rectTop - 1) / GRID_PIXEL_SIZE;
    console.log(`${cellPositionX}:${cellPositionY}`);

    CELLS[cellPositionX][cellPositionY] = CELLS[cellPositionX][cellPositionY] === 1 ? 0 : 1;
}

function reDraw() {
    for (let x = 0; x < CELLS.length; x++) {
        const cellCol = CELLS[x];
        for (let y = 0; y < cellCol.length; y++) {
            const cells = cellCol[y];
            if (cells === 1) {
                ctx.fillStyle = "#234354";
            } else {
                ctx.fillStyle = "#fff";
            }
            ctx.fillRect(x * GRID_PIXEL_SIZE + 1, y * GRID_PIXEL_SIZE + 1, GRID_PIXEL_SIZE - 2, GRID_PIXEL_SIZE - 2);
        }
    }
    if (game) {
        const cellValues = calculateCellValues();
        liveOrDie(cellValues);
        if (step) {
            game = false;
            step = false;
        }
        generation++;
        generationSpan.innerText = generation;
    }
}

function calculateCellValues() {
    const cellValues = [];
    for (let x = 0; x < CELLS.length; x++) {
        cellValues[x] = []
        const cellCol = CELLS[x];
        for (let y = 0; y < cellCol.length; y++) {
            const cell = cellCol[y];
            if (x === 0) {
                if (y === 0) {
                    cellValues[x][y] = CELLS[x][y + 1] + CELLS[x + 1][y] + CELLS[x + 1][y + 1];
                } else if (y === gameAreaSize.height - 1) {
                    cellValues[x][y] = CELLS[0][gameAreaSize.height - 2] + CELLS[1][gameAreaSize.height - 1] + CELLS[1][gameAreaSize.height - 2];
                } else {
                    cellValues[x][y] = CELLS[x][y - 1] + CELLS[x][y + 1] + CELLS[x + 1][y] + CELLS[x + 1][y - 1] + CELLS[x + 1][y + 1];
                }
            } else if (x === gameAreaSize.width - 1) {
                if (y === 0) {
                    cellValues[x][y] = CELLS[x][y + 1] + CELLS[x - 1][y] + CELLS[x - 1][y + 1];
                } else if (y === gameAreaSize.height - 1) {
                    cellValues[x][y] = CELLS[x][gameAreaSize.height - 2] + CELLS[x - 1][gameAreaSize.height - 1] + CELLS[x - 1][gameAreaSize.height - 2];
                } else {
                    cellValues[x][y] = CELLS[x][y - 1] + CELLS[x][y + 1] + CELLS[x - 1][y] + CELLS[x - 1][y - 1] + CELLS[x - 1][y + 1];
                }
            } else {
                if (y === 0) {
                    cellValues[x][y] = CELLS[x - 1][y] + CELLS[x + 1][y] + CELLS[x][y + 1] + CELLS[x + 1][y + 1] + CELLS[x - 1][y + 1];
                } else if (y === gameAreaSize.height) {
                    cellValues[x][y] = CELLS[x - 1][y] + CELLS[x + 1][y] + CELLS[x][y - 1] + CELLS[x + 1][y - 1] + CELLS[x - 1][y - 1];
                } else {
                    cellValues[x][y] = CELLS[x + 1][y] + CELLS[x - 1][y] + CELLS[x][y + 1] + CELLS[x][y - 1] + CELLS[x + 1][y + 1] + CELLS[x + 1][y - 1] + CELLS[x - 1][y + 1] + CELLS[x - 1][y - 1];
                }
            }
        }
    }
    return cellValues
}

function liveOrDie(cellValues) {
    for (let x = 0; x < CELLS.length; x++) {
        const cellCol = CELLS[x];
        for (let y = 0; y < cellCol.length; y++) {
            let cell = cellCol[y];
            const cellValue = cellValues[x][y];
            if (cell === 0) {
                if (cellValue === 3) {
                    CELLS[x][y] = 1
                }
            } else {
                if (cellValue < 2 || cellValue > 3) {
                    CELLS[x][y] = 0
                }
            }
        }
    }
}