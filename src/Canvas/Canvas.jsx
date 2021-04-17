import { useRef, useEffect } from "react";
import { CELL_SIZE } from "../constants";

function Canvas({ gameAreaSize }) {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        console.log(canvas);
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={gameAreaSize.width * (CELL_SIZE + 1) + 1}
            height={gameAreaSize.height * (CELL_SIZE + 1) + 1}
        />
    )
}

export default Canvas;