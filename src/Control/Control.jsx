import "./Control.css";

function Control({ gameAreaSize, setGameAreaSize, animate, setAnimate, fps, setFps }) {

    const changeWidth = (event) => {
        setGameAreaSize({ ...gameAreaSize, width: event.target.value });
    }

    const changeHeight = (event) => {
        setGameAreaSize({ ...gameAreaSize, height: event.target.value });
    }

    return (
        <header>
            <div className="col">
                <div>
                    <label htmlFor="width" className="label">Width</label>
                    <input
                        value={gameAreaSize.width}
                        type="number"
                        min="50"
                        max="150"
                        name="width"
                        id="width"
                        onChange={changeWidth}
                    />
                    <input
                        value={gameAreaSize.width}
                        type="range"
                        min="50"
                        max="150"
                        name="widthRange"
                        id="widthRange"
                        onChange={changeWidth}
                    />
                </div>
                <div>
                    <label htmlFor="height" className="label">Height</label>
                    <input
                        type="number"
                        min="50"
                        max="150"
                        name="height"
                        id="height"
                        value={gameAreaSize.height}
                        onChange={changeHeight}
                    />
                    <input
                        type="range"
                        min="50"
                        max="150"
                        name="heightRange"
                        id="heightRange"
                        value={gameAreaSize.height}
                        onChange={changeHeight}
                    />
                </div>
            </div>
            <div className="col">
                <label htmlFor="fps" className="label">Frame/Second</label>
                <input
                    type="number"
                    min="1"
                    max="60"
                    name="fps"
                    id="fps"
                    value={fps}
                    onChange={event => setFps(event.target.value)}
                />
                <input
                    type="range"
                    min="1"
                    max="60"
                    name="fpsRange"
                    id="fpsRange"
                    value={fps}
                    onChange={event => setFps(event.target.value)}
                />
            </div>
            <div className="col button-col">
                <button className="button" onClick={() => setAnimate(!animate)}>
                    {
                        animate ?
                            "Stop" :
                            "Start"
                    }
                </button>
            </div>
        </header>
    )
}

export default Control;