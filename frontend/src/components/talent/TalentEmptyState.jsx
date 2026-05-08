const TalentEmptyState = () => {

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center shadow-sm">

      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-2xl">

        🔍

      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">

        No candidates found

      </h3>

      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">

        Try adjusting the filters or searching
        with different skills.

      </p>
    </div>
  );
};

export default TalentEmptyState;