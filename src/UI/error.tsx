const Error = ({ msg }: { msg: string }) => {
  return (
    <div className="bg-red-100 w-64 h-24 mx-auto mt-28 p-2">
      <span className="text-red-800">Error</span>
      <hr />
      <div className="text-center ">{msg}</div>
    </div>
  );
};

export default Error;
