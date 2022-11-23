import { Form } from "../components";

const HomePage = (props) => {
  return (
    <div className="h-full flex justify-between items-center">
      <Form {...props} />
    </div>
  );
};

export default HomePage;
