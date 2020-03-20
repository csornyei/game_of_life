function stepButtonClickHandler() {
    step = true;
    game = true;
}

function startButtonClickHandler() {
    game = !game;
    if (game) {
        startStopButton.textContent = "Stop Game";
    } else {
        startStopButton.textContent = "Start Game";
    }
}

function onWidthChange(event) {
    const newWidth = event.target.value
    updateCELLS(gameAreaSize.width, gameAreaSize.height, newWidth, gameAreaSize.height);
    gameAreaSize.width = newWidth;
    widthNumberInput.value = gameAreaSize.width;
    widthRange.value = gameAreaSize.width;
    changeGameArea();
}

function onHeightChange(event) {
    const newHeight = event.target.value;
    updateCELLS(gameAreaSize.width, gameAreaSize.height, gameAreaSize.width, newHeight);
    gameAreaSize.height = newHeight;
    heightNumberInput.value = gameAreaSize.height;
    heightRange.value = gameAreaSize.height;
    changeGameArea();
}

function onSpeedChange(event) {
    const newSpeed = event.target.value;
    speedRange.value = newSpeed;
    speedNumberInput.value = newSpeed;
    clearInterval(interval);
    interval = setInterval(() => {
        reDraw();
    }, newSpeed);
}