import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";

const Form = (props) => {
  return (
    <div className="h-[80%] w-[80%] mx-auto">
      <div className="h-full flex flex-1 justify-between items-center">
        <div className="w-[550px] h-auto border-4 border-blue-600 p-10 rounded-lg">
          <h1 className="text-3xl text-blue-800 font-extrabold text-center mb-10">
            Create Room
          </h1>
          <CreateRoom {...props} />
        </div>
        <div className="w-[550px] h-auto border-4 border-blue-600 p-10 rounded-lg">
          <h1 className="text-3xl text-blue-800 font-extrabold text-center mb-10">
            Enroll Room
          </h1>
          <JoinRoom {...props} />
        </div>
      </div>
    </div>
  );
};

export default Form;
