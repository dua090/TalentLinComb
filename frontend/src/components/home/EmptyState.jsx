const EmptyState = ({
  title = "No candidates found",
  description = "Try searching with different skills or experience levels.",
  icon = "🔍",
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-12 text-center">

      <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-5 text-2xl">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;