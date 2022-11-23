import { useState } from "react";
import { FaRegCopy, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const JoinRoom = ({ uuid, socket, setUser }) => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const handleJoinInstant = (e) => {
    e.preventDefault();
    if (name === "" || room === "") {
      toast.error("Name and Room must be required!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const data = { room, name, user: socket.id, host: false, presenter: false };
    setUser(data);
    navigate(`/room/${room}`);
    socket.emit("user-joined", data);
  };

  return (
    <form className="m-1">
      <div className="mt-3 mb-8 ">
        <input
          className="outline-none border-2 p-2 w-full"
          placeholder="Enter your name"
          value={name}
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex mt-3 mb-8  items-center">
        <input
          className="outline-none border-2 p-2 w-full"
          placeholder="Enter room code"
          value={room}
          type="text"
          required
          onChange={(e) => setRoom(e.target.value)}
        />
        <button
          className="border-2 border-red-400 p-3 flex items-center cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setRoom(uuid());
          }}
        >
          <FaRegCopy />
        </button>
      </div>
      <div className="float-right">
        <button
          className="border-2 py-2 px-4 flex items-center cursor-pointer hover:bg-gray-300"
          onClick={handleJoinInstant}
        >
          Join an instant
          <FaSignInAlt className="ml-1" />
        </button>
      </div>
    </form>
  );
};

export default JoinRoom;
