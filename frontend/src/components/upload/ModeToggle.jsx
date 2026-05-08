const ModeToggle = ({
  mode,
  setMode,
}) => {

  return (

    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-2 flex gap-2 w-full sm:w-fit">

      <button
        onClick={() =>
          setMode("upload")
        }
        className={`px-5 py-2 rounded-xl font-medium transition
        
        ${
          mode === "upload"

            ? "bg-blue-600 text-white"

            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        Upload Resume
      </button>

      <button
        onClick={() =>
          setMode("manual")
        }
        className={`px-5 py-2 rounded-xl font-medium transition
        
        ${
          mode === "manual"

            ? "bg-blue-600 text-white"

            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        Manual Entry
      </button>
    </div>
  );
};

export default ModeToggle;