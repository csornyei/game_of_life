import Control from "./Control/Control";
import Canvas from "./Canvas/Canvas";
import { useState } from "react";

function App() {

  const [gameAreaSize, setGameAreaSize] = useState({ width: 100, height: 100 });

  return (
    <div>
      <Control gameAreaSize={gameAreaSize} setGameAreaSize={setGameAreaSize} />
      <main>
        <Canvas gameAreaSize={gameAreaSize} />
      </main>
    </div>
  );
}

export default App;
