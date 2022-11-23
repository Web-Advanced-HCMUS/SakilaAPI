import {
  FaPencilAlt,
  FaRedo,
  FaRegCircle,
  FaSlash,
  FaTrash,
  FaUndo,
} from "react-icons/fa";
import {
  MdFavoriteBorder,
  MdStarOutline,
  MdOutlineCropDin,
  MdOutlineCrop169,
} from "react-icons/md";

const UserBar = ({
  setTool,
  setColor,
  onClearCanvas,
  handleUndo,
  handleRedo,
  permission,
}) => {
  return (
    <div className="w-full h-[80px] flex items-center justify-between bg-gray-100 my-2 px-10">
      <div className="flex items-center  border-2 border-black bg-white">
        <div
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={handleUndo}
        >
          <FaUndo />
        </div>
        <div
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={handleRedo}
        >
          <FaRedo />
        </div>
      </div>
      <div className="flex items-center border-2 border-black bg-white">
        <div
          onClick={() => setTool("pencil")}
          className="p-2 hover:bg-gray-100 cursor-pointer"
        >
          <FaPencilAlt />
        </div>
        <div
          onClick={() => setTool("line")}
          className="p-2 hover:bg-gray-100  cursor-pointer"
        >
          <FaSlash className="rotate-90" />
        </div>
        <div
          onClick={() => setTool("rectangle")}
          className="p-2 hover:bg-gray-100  cursor-pointer"
        >
          <MdOutlineCrop169 />
        </div>
        <div
          onClick={() => setTool("square")}
          className="p-2 hover:bg-gray-100  cursor-pointer"
        >
          <MdOutlineCropDin />
        </div>
        <div
          onClick={() => setTool("circle")}
          className="p-2 hover:bg-gray-100  cursor-pointer"
        >
          <FaRegCircle />
        </div>
        {/* <div
          onClick={() => setTool("star")}
          className="p-2 hover:bg-gray-100  cursor-pointer"
        >
          <MdStarOutline />
        </div>
        <div
          onClick={() => setTool("heart")}
          className="p-2 hover:bg-gray-100  cursor-pointer"
        >
          <MdFavoriteBorder />
        </div> */}
      </div>
      <div className="flex items-center">
        <span className="mr-2">Select color:</span>
        <input
          type="color"
          className="outline-none bg-inherit"
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div
        className={`py-2 px-4 border-2 flex items-center bg-red-600 text-xl font-bold text-gray-50 cursor-pointer ${
          permission ? "" : "hidden"
        }`}
        onClick={onClearCanvas}
      >
        Clear
        <FaTrash className="ml-1" />
      </div>
    </div>
  );
};

export default UserBar;
