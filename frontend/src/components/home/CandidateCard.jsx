const CandidateCard = ({
  candidate,
  parsedQuery,
  setSelectedCandidate,
}) => {

  // ================= MATCH BADGE STYLE =================

  const matchBadgeStyle =
    candidate.matchPercentage >= 80
      ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
      : candidate.matchPercentage >= 60
      ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
      : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400";

  // ================= MATCH CHECK =================

  const isSkillMatched = (skill) => {
    return candidate.skills?.some((candidateSkill) =>
      candidateSkill
        .toLowerCase()
        .includes(skill.toLowerCase())
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn p-6 flex flex-col">

      {/* ================= HEADER ================= */}

      <div className="flex items-start justify-between mb-5">

        <div className="flex items-center gap-4">

          <img
            src={`https://ui-avatars.com/api/?name=${candidate.name}&background=EFF6FF&color=2563EB&bold=true`}
            alt={candidate.name}
            className="w-14 h-14 rounded-2xl"
          />

          <div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {candidate.name}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {candidate.experience} years experience
            </p>
          </div>
        </div>

        {/* ================= MATCH ================= */}

        <div
          className={`px-3 py-1 rounded-full text-sm font-semibold ${matchBadgeStyle}`}
        >
          {candidate.matchPercentage}% Match
        </div>
      </div>

      {/* ================= WHY MATCH ================= */}

      <div className="mb-5">

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Why this candidate?
        </p>

        <div className="space-y-2">

          {parsedQuery?.skills?.slice(0, 3).map((skill) => {

            const matched = isSkillMatched(skill);

            return (
              <div
                key={skill}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <span>
                  {matched ? "✅" : "❌"}
                </span>

                <span>{skill}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= SKILLS ================= */}

      <div className="mb-6">

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Skills
        </p>

        <div className="flex flex-wrap gap-2">

          {candidate.skills?.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium"
            >
              {skill}
            </span>
          ))}

          {candidate.skills?.length > 4 && (
            <button
              onClick={() =>
                setSelectedCandidate(candidate)
              }
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition"
            >
              +{candidate.skills.length - 4} more
            </button>
          )}
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <div className="mt-auto pt-5 border-t border-gray-100 dark:border-gray-700">

        <button
          onClick={() =>
            setSelectedCandidate(candidate)
          }
          className="w-full px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition"
        >
          Why this profile?
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;