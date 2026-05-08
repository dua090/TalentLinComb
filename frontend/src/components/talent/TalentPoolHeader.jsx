const TalentPoolHeader = ({
  totalCandidates,
}) => {

  return (
    <div className="flex items-center justify-between mb-6">

      <div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Talent Pool
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Discover and connect with top talent
        </p>
      </div>

      <div className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300">

        {totalCandidates} Candidates

      </div>
    </div>
  );
};

export default TalentPoolHeader;