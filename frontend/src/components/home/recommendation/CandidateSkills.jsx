// ================= CandidateSkills.jsx =================

import {
  isSemanticSkillMatch,
} from "../../../utils/semanticSkillMatcher";

const CandidateSkills = ({
  selectedCandidate,
  parsedQuery,
}) => {

  return (

    <div className="mb-8">

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">

        Candidate Skills

      </h3>

      <div className="flex flex-wrap gap-3">

        {selectedCandidate.skills?.map((skill) => {

          const matched =
            parsedQuery?.skills?.some(
              (parsedSkill) =>

                isSemanticSkillMatch(
                  parsedSkill,
                  [skill]
                )
            );

          return (

            <span
              key={skill}
              className={`px-4 py-2 rounded-xl text-sm font-medium border
              
              ${
                matched

                  ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-100 dark:border-green-900"

                  : "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900"
              }`}
            >

              {skill}

            </span>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateSkills;