import { useRef, useEffect } from "react";
import { CELL_SIZE } from "../constants";

function Canvas({ gameAreaSize, frameId, render }) {
    const { width, height } = gameAreaSize;
    const canvasRef = useRef(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        render(context, width, height);

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            window.cancelAnimationFrame(frameId.current);
        }

    }, [frameId, width, height, render]);

    return (
        <canvas
            ref={canvasRef}
            width={width * (CELL_SIZE + 1) + 1}
            height={height * (CELL_SIZE + 1) + 1}
        />
    )
}

export default Canvas;