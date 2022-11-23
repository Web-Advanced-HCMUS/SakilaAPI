import { useState } from "react";
import { FaPlus, FaRegCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRoom = ({ uuid, socket, setUser }) => {
  const [room, setRoom] = useState(uuid());
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStartInstance = (e) => {
    e.preventDefault();

    if (name === "") {
      toast.error("Name must be required!", {
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

    const data = { name, room, user: socket.id, host: true, presenter: true };
    setUser(data);
    navigate(`/room/${room}`);
    socket.emit("user-joined", data);
  };

  return (
    <form className="m-1">
      <div className="mt-3 mb-8">
        <input
          className="outline-none border-2 p-2 w-full"
          placeholder="Enter your name"
          value={name}
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex mt-3 mb-8 items-center">
        <input
          className="outline-none border-2 p-2 w-full"
          placeholder="Enter room code"
          value={room}
          type="text"
          required
          disabled
        />
        <button
          className="border-2 border-blue-500 p-2 flex items-center bg-blue-500 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setRoom(uuid());
          }}
        >
          Generate
        </button>
        <button
          className="border-2 border-red-400 p-3 flex items-center cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(room);
            toast("Copy successfully!");
          }}
        >
          <FaRegCopy />
        </button>
      </div>
      <div className="float-right">
        <button
          className="border-2 py-2 px-4 flex items-center cursor-pointer hover:bg-gray-300"
          onClick={handleStartInstance}
        >
          <FaPlus className="mr-1" />
          Start an instant
        </button>
      </div>
    </form>
  );
};

export default CreateRoom;
