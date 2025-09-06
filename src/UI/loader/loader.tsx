import "./loader.css";
const Loader = () => {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="loader"></div>
      <span>Loading...</span>
    </div>
  );
};

export default Loader;
