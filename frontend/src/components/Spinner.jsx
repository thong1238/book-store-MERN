const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full border-t-4 border-red-500 border-opacity-80 border-solid h-16 w-16 top-1/3 absolute"></div>
    </div>
  );
};

export default Spinner;
