const Bar = ({ num }: { num: number }) => {
  return (
    <div className="w-">
      <progress value={num} max={300} className="rounded-lg bg-gray-300 h-3" />
    </div>
  );
};

export default Bar;
