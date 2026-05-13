import { Sparkles } from "lucide-react";

import {
  isSemanticSkillMatch,
} from "../../utils/semanticSkillMatcher";

const CandidateRecommendationModal = ({
  selectedCandidate,
  setSelectedCandidate,
  parsedQuery,
}) => {

  if (!selectedCandidate) {
    return null;
  }

  // ================= HELPERS =================

  const isSkillMatched =
    (skill) => {

      return isSemanticSkillMatch(
        skill,
        selectedCandidate.skills
      );
    };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4">

      <div className="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">

        <div className="p-8 max-h-[90vh] overflow-y-auto">

          {/* ================= HEADER ================= */}

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

                <div className="mt-3 inline-flex px-4 py-2 rounded-2xl bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-semibold">

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

          {/* ================= SKILLS ================= */}

          <div className="mb-8">

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">

              Candidate Skills

            </h3>

            <div className="flex flex-wrap gap-3">

              {selectedCandidate.skills?.map((skill) => {

                // ================= FIXED MATCHING =================

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
                    className={`px-4 py-2 rounded-xl text-sm font-medium
                    
                    ${
                      matched

                        ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900"

                        : "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900"
                    }`}
                  >

                    {skill}

                  </span>
                );
              })}
            </div>
          </div>

          {/* ================= PROJECTS ================= */}

          <div className="mb-8">

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">

              Projects

            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {selectedCandidate.projects?.map((project) => (

                <div
                  key={project}
                  className="p-5 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50"
                >

                  <h4 className="font-semibold text-gray-900 dark:text-white">

                    {project}

                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* ================= EDUCATION ================= */}

          <div className="mb-8">

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">

              Education

            </h3>

            <div className="space-y-3">

              {selectedCandidate.education?.map((education) => (

                <div
                  key={education}
                  className="p-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50"
                >

                  🎓 {education}

                </div>
              ))}
            </div>
          </div>

          {/* ================= PROFILE MATCH INSIGHTS ================= */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-3xl p-8 text-white">

            <div className="flex items-center gap-3 mb-6">

              <Sparkles size={24} />

              <h3 className="text-2xl font-bold">

                Profile Match Insights

              </h3>
            </div>

            <div className="mb-6">

              <p className="text-blue-100 dark:text-blue-50 leading-relaxed text-lg">

                This candidate demonstrates strong alignment with the required technical stack, practical implementation exposure, and relevant industry experience expectations.

              </p>
            </div>

            <div className="space-y-3">

              {/* ================= SKILL INSIGHTS ================= */}

              {parsedQuery?.skills?.map((skill) => {

                const matched =
                  isSkillMatched(skill);

                return (

                  <div
                    key={skill}
                    className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3"
                  >

                    <div className="text-lg">

                      {matched
                        ? "✅"
                        : "⚠️"}

                    </div>

                    <p className="text-sm md:text-base">

                      {matched

                        ? `${skill} expertise matched successfully with candidate profile`

                        : `${skill} skill requirement was not identified in the profile`}

                    </p>
                  </div>
                );
              })}

              {/* ================= EXPERIENCE ================= */}

              <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3">

                <div className="text-lg">
                  ✅
                </div>

                <p className="text-sm md:text-base">

                  {selectedCandidate.experience || 0}+ years of relevant professional experience identified

                </p>
              </div>

              {/* ================= PROJECTS ================= */}

              {selectedCandidate.projects?.length > 0 && (

                <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3">

                  <div className="text-lg">
                    ✅
                  </div>

                  <p className="text-sm md:text-base">

                    Candidate has hands-on project exposure across{" "}

                    <span className="font-semibold">

                      {selectedCandidate.projects.length}

                    </span>

                    {" "}implementation areas

                  </p>
                </div>
              )}

              {/* ================= EDUCATION ================= */}

              {selectedCandidate.education?.length > 0 && (

                <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3">

                  <div className="text-lg">
                    ✅
                  </div>

                  <p className="text-sm md:text-base">

                    Educational qualifications and technical background are available for evaluation

                  </p>
                </div>
              )}

              {/* ================= SOURCE ================= */}

              <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3">

                <div className="text-lg">

                  {selectedCandidate.source === "manual"
                    ? "📝"
                    : "🤖"}

                </div>

                <p className="text-sm md:text-base">

                  {selectedCandidate.source === "manual"

                    ? "Profile was manually curated and verified"

                    : "Profile information was extracted using AI resume parsing"}

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateRecommendationModal;