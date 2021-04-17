import Control from "./Control/Control";
import Canvas from "./Canvas/Canvas";
import { useState, useRef, useEffect } from "react";
import { drawCells, drawGrid } from "./Canvas/drawFunctions";

function App() {

  const [gameAreaSize, setGameAreaSize] = useState({ width: 100, height: 100 });
  let animationFrameId = null;

  const frameId = useRef(animationFrameId);
  const cells = [];

  useEffect(() => {
    for (let index = 0; index < gameAreaSize.width * gameAreaSize.height; index++) {
      cells.push(Math.random() > 0.5 ? 1 : 0);
    }
  }, [gameAreaSize]);


  const render = (context, width, height) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawGrid(context, width, height);
    drawCells(context, width, height, cells);
    frameId.current = window.requestAnimationFrame(() => render(context, width, height));
  }


  return (
    <div>
      <Control
        gameAreaSize={gameAreaSize}
        setGameAreaSize={setGameAreaSize}
      />
      <main>
        <Canvas
          gameAreaSize={gameAreaSize}
          frameId={frameId}
          render={render}
        />
      </main>
    </div>
  );
}

export default App;
