import "./Control.css";


function Control({ gameAreaSize, setGameAreaSize }) {

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
            <div className="col button-col">
                <button className="button" onClick={() => { }}>Step</button>
                <button className="button">Start Game</button>
            </div>
        </header>
    )
}

export default Control;