import Control from "./Control/Control";
import Canvas from "./Canvas/Canvas";
import { useState, useRef, useEffect } from "react";
import { drawCells, drawGrid } from "./Canvas/drawFunctions";

function App() {

  const [gameAreaSize, setGameAreaSize] = useState({ width: 100, height: 100 });
  const [animate, setAnimate] = useState(false);
  const [fps, setFps] = useState(60);
  const fpsInterval = useRef(1000 / fps);
  const now = useRef(null);
  const then = useRef(Date.now());
  const elapsed = useRef(null);
  let animationFrameId = null;

  const frameId = useRef(animationFrameId);
  let cells;

  useEffect(() => {
    fpsInterval.current = 1000 / fps;
  }, [fps])

  const render = (context, width, height) => {
    now.current = Date.now();
    elapsed.current = now.current - then.current;
    if (elapsed.current > fpsInterval.current) {
      then.current = now.current - (elapsed.current % fpsInterval.current);
      cells = [];
      for (let index = 0; index < gameAreaSize.width * gameAreaSize.height; index++) {
        cells.push(Math.random() > 0.5 ? 1 : 0);
      }
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      drawGrid(context, width, height);
      drawCells(context, width, height, cells);
    }
    if (animate) {
      frameId.current = window.requestAnimationFrame(() => render(context, width, height));
    }
  }

  return (
    <div>
      <Control
        gameAreaSize={gameAreaSize}
        setGameAreaSize={setGameAreaSize}
        animate={animate}
        setAnimate={setAnimate}
        fps={fps}
        setFps={setFps}
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
