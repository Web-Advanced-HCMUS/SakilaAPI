import { useEffect, useRef, useState } from "react";

const ClientBoard = ({ socket }) => {
  const [img,setImg] = useState(null);

  useEffect(() => {
    socket.on("board", (data) => {
      setImg(data.canvasImage);
    });
  }, [socket, img,setImg]);

  return (
    <>
      <div className="w-full h-[90%] border-4 border-black rounded overflow-hidden">
        <div
          style={{
            width: window.innerWidth * 2,
            height: window.innerHeight * 2,
          }}
          alt=""
        >
          <img src={img} alt="" />
        </div>
      </div>
    </>
  );
};

export default ClientBoard;
