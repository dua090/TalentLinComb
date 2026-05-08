const LoadingOverlay = ({
  text,
}) => (

  <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">

    <div className="bg-white dark:bg-gray-800 rounded-2xl px-8 py-6 flex flex-col items-center gap-4 shadow-xl">

      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="text-gray-800 dark:text-white font-medium">
        {text}
      </p>
    </div>
  </div>
);

export default LoadingOverlay;