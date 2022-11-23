import { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm.js";

const generator = rough.generator();
const WhiteBoard = ({
  canvasRef,
  ctx,
  elements,
  setElements,
  tool,
  color,
  socket,
  room,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    const context = canvas.getContext("2d");

    context.strokeStyle = color;
    context.lineWidth = 5;
    context.lineCap = "round";

    ctx.current = context;
    ctx.current.strokeStyle = color;
  }, [canvasRef, color, ctx]);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);

    if (elements.length > 0)
      ctx.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

    elements.forEach((e) => {
      if (e.element === "pencil")
        roughCanvas.linearPath(e.path, {
          stroke: e.stroke,
        });
      else if (e.element === "line")
        roughCanvas.draw(
          generator.line(e.offsetX, e.offsetY, e.width, e.height, {
            stroke: e.stroke,
          })
        );
      else if (e.element === "rectangle")
        roughCanvas.draw(
          generator.rectangle(e.offsetX, e.offsetY, e.width, e.height, {
            stroke: e.stroke,
          })
        );
      else if (e.element === "square")
        roughCanvas.draw(
          generator.rectangle(e.offsetX, e.offsetY, e.height, e.height, {
            stroke: e.stroke,
          })
        );
      else if (e.element === "circle")
        roughCanvas.draw(
          generator.circle(e.offsetX, e.offsetY, e.width, {
            stroke: e.stroke,
          })
        );
    });

    const canvasImage = canvasRef.current.toDataURL();
    socket.emit("draw", { canvasImage, room, elements });
  }, [canvasRef, ctx, elements, room, socket]);

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prevElements) =>
        prevElements.map((element, idx) =>
          idx === elements.length - 1
            ? {
                offsetX: element.offsetX,
                offsetY: element.offsetY,
                path: [...element.path, [offsetX, offsetY]],
                element: element.element,
                stroke: element.stroke,
              }
            : element
        )
      );
    } else if (tool === "line") {
      setElements((prevElements) =>
        prevElements.map((element, idx) =>
          idx === elements.length - 1
            ? {
                offsetX: element.offsetX,
                offsetY: element.offsetY,

                width: offsetX,
                height: offsetY,

                element: element.element,
                stroke: element.stroke,
              }
            : element
        )
      );
    } else if (tool === "rectangle") {
      setElements((prevElements) =>
        prevElements.map((element, idx) =>
          idx === elements.length - 1
            ? {
                offsetX: element.offsetX,
                offsetY: element.offsetY,
                width: offsetX - element.offsetX,
                height: offsetY - element.offsetY,
                element: element.element,
                stroke: element.stroke,
              }
            : element
        )
      );
    } else if (tool === "star") {
    } else if (tool === "circle") {
      setElements((prevElements) =>
        prevElements.map((element, idx) =>
          idx === elements.length - 1
            ? {
                offsetX: element.offsetX,
                offsetY: element.offsetY,
                width: offsetX - element.offsetX,
                element: element.element,
                stroke: element.stroke,
              }
            : element
        )
      );
    } else if (tool === "square") {
      setElements((prevElements) =>
        prevElements.map((element, idx) =>
          idx === elements.length - 1
            ? {
                offsetX: element.offsetX,
                offsetY: element.offsetY,
                height: offsetY - element.offsetY,
                element: element.element,
                stroke: element.stroke,
              }
            : element
        )
      );
    } else if (tool === "heart") {
    }
  };

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil")
      setElements((prevElements) => [
        ...prevElements,
        {
          element: tool,
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ]);
    else {
      setElements((prevElements) => [
        ...prevElements,
        {
          element: tool,
          offsetX,
          offsetY,
          stroke: color,
        },
      ]);
    }

    setIsDrawing(true);
  };
  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

  return (
    <>
      <div
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        className="w-full h-[90%] border-4 border-black rounded overflow-hidden"
      >
        <canvas ref={canvasRef} />
      </div>
    </>
  );
};

export default WhiteBoard;
