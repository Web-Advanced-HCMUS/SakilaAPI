import { useEffect } from "react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { WhiteBoard, UserBar } from "../components";
import ClientBoard from "../components/WhiteBoard/ClientBoard";

const RoomPage = ({ socket, user, users }) => {
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [room, setRoom] = useState(null);
  const [histories, setHistories] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    socket.on("message", (data) => {
      toast.info(data.message);
    });
  }, [socket]);

  useEffect(() => {
    const url = window.location.href;
    const els = url.split("/");
    setRoom(els[els.length - 1]);
  }, [setRoom]);

  const onClearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    ctx.current = context;
    setElements([ctx, canvasRef]);
  };
  const handleUndo = () => {
    if (elements.length !== 0) {
      setHistories((prevHistory) => [
        ...prevHistory,
        elements[elements.length - 1],
      ]);
      setElements((prevElements) =>
        prevElements.filter((ele, index) => index !== elements.length - 1)
      );
    }
  };
  const handleRedo = () => {
    if (histories.length !== 0) {
      setElements((prevElements) => [
        ...prevElements,
        histories[histories.length - 1],
      ]);
      setHistories((prevHistory) =>
        prevHistory.filter((ele, index) => index !== histories.length - 1)
      );
    }
  };
  return (
    <div className="w-[85%] h-[85%] mx-auto flex flex-row-reverse">
      <div
        className={`w-[250px] h-full fixed top-0 right-0 bg-black ${
          showUser ? "" : "hidden"
        }`}
        style={{ transition: "0.3 linear" }}
      >
        <div className="mt-20 text-white">
          <h1 className="p-2 text-2xl font-bold">Users:</h1>
          <ul>
            {users.map((e, idx) => (
              <li key={idx} className="p-2 break-words">
                {idx}: {e.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="h-full w-full mr-8">
        <button
          className="fixed top-2 right-2 p-2 bg-black rounded text-white"
          onClick={() => setShowUser(!showUser)}
        >
          Show Users
        </button>
        <h1 className="flex items-end justify-between my-1">
          <div>
            <h1 className="text-xl font-bold">WhiteBoard sharing</h1>
            <h4>
              <span className="font-semibold">Room: </span>
              Lorem ipsum dolor sit amet.
            </h4>
          </div>
          <span>[Users Online: {users.length}]</span>
        </h1>
        {user?.presenter ? (
          <>
            <UserBar
              setTool={setTool}
              setColor={setColor}
              onClearCanvas={onClearCanvas}
              handleUndo={handleUndo}
              handleRedo={handleRedo}
              permission={true}
            />
            <WhiteBoard
              canvasRef={canvasRef}
              ctx={ctx}
              elements={elements}
              setElements={setElements}
              tool={tool}
              color={color}
              socket={socket}
              room={room}
            />
          </>
        ) : (
          <>
            <div className="h-full w-full">
              <ClientBoard
                canvasRef={canvasRef}
                ctx={ctx}
                elements={elements}
                setElements={setElements}
                tool={tool}
                color={color}
                socket={socket}
                room={room}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoomPage;
