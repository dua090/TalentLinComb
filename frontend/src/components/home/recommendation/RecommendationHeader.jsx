// ================= RecommendationHeader.jsx =================

const RecommendationHeader = ({
  selectedCandidate,
  setSelectedCandidate,
}) => {

  const matchBadgeStyles =

    selectedCandidate.matchPercentage >= 80

      ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900"

      : selectedCandidate.matchPercentage >= 60

      ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-900"

      : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900";

  return (

    <div className="flex justify-between items-start mb-8">

      <div className="flex items-center gap-5">

        <img
          src={`https://ui-avatars.com/api/?name=${selectedCandidate.name}&background=EFF6FF&color=2563EB&bold=true`}
          alt={selectedCandidate.name}
          className="w-20 h-20 rounded-3xl border border-blue-100 dark:border-blue-900"
        />

        <div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">

            {selectedCandidate.name}

          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">

            {selectedCandidate.experience} years experience

          </p>

          <div
            className={`mt-3 inline-flex px-4 py-2 rounded-2xl font-semibold ${matchBadgeStyles}`}
          >

            {selectedCandidate.matchPercentage}% Match Score

          </div>
        </div>
      </div>

      <button
        onClick={() =>
          setSelectedCandidate(null)
        }
        className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl"
      >
        ×
      </button>
    </div>
  );
};

export default RecommendationHeader;