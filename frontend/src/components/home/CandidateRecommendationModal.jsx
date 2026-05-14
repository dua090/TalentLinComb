import {
  Sparkles,
  Brain,
  CircleCheck,
  TriangleAlert,
  BadgeCheck,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  isSemanticSkillMatch,
} from "../../utils/semanticSkillMatcher";

import {
  getCandidateSummary,
} from "../../services/aiService";

const CandidateRecommendationModal = ({
  selectedCandidate,
  setSelectedCandidate,
  parsedQuery,
}) => {

  // ================= AI STATES =================

  const [
    aiInsights,
    setAiInsights,
  ] = useState(null);

  const [
    aiLoading,
    setAiLoading,
  ] = useState(false);

  // ================= LOAD AI INSIGHTS =================

  useEffect(() => {

    const fetchInsights =
      async () => {

        if (
          !selectedCandidate
        ) {

          return;
        }

        try {

          setAiLoading(true);

          const data =
            await getCandidateSummary({

              candidate:
                selectedCandidate,

              recruiterQuery:
                parsedQuery
                  ?.originalQuery ||
                "",
            });

          setAiInsights(
            data.insights
          );

        } catch (error) {

          console.error(
            "AI SUMMARY ERROR:",
            error
          );

          setAiInsights(
            null
          );

        } finally {

          setAiLoading(
            false
          );
        }
      };

    fetchInsights();

  }, [
    selectedCandidate,
    parsedQuery,
  ]);

  // ================= NULL CHECK =================

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

  // ================= MATCH SCORE COLORS =================

  const matchBadgeStyles =

    selectedCandidate.matchPercentage >= 80

      ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900"

      : selectedCandidate.matchPercentage >= 60

      ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-900"

      : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900";

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

                {/* ================= MATCH SCORE ================= */}

                <div
                  className={`mt-3 inline-flex px-4 py-2 rounded-2xl font-semibold ${matchBadgeStyles}`}
                >

                  {selectedCandidate.matchPercentage}% Match Score

                </div>
              </div>
            </div>

            {/* CLOSE */}

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

          {/* ================= PROFILE MATCH INSIGHTS ================= */}

          <div className="mb-8">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">

                <Sparkles
                  className="text-blue-600 dark:text-blue-400"
                  size={24}
                />
              </div>

              <div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">

                  Profile Match Insights

                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">

                  Dynamic profile analysis based on recruiter search

                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">

              <p className="leading-8 text-[15px] text-blue-50 mb-6">

                This candidate demonstrates strong alignment with the required technical stack, practical implementation exposure, and relevant industry experience expectations.

              </p>

              <div className="space-y-4">

                {/* SKILL MATCH */}

                {parsedQuery?.skills?.map(
                  (
                    skill,
                    index
                  ) => {

                    const matched =
                      isSkillMatched(
                        skill
                      );

                    return (

                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >

                        {matched ? (

                          <CircleCheck
                            size={20}
                            className="text-green-300 mt-0.5"
                          />

                        ) : (

                          <TriangleAlert
                            size={20}
                            className="text-yellow-300 mt-0.5"
                          />
                        )}

                        <p className="text-sm leading-7 text-blue-50">

                          {matched

                            ? `${skill} expertise matched successfully with candidate profile`

                            : `${skill} alignment appears partially matched`}
                        </p>
                      </div>
                    );
                  }
                )}

                {/* EXPERIENCE */}

                <div className="flex items-start gap-3">

                  <BadgeCheck
                    size={20}
                    className="text-green-300 mt-0.5"
                  />

                  <p className="text-sm leading-7 text-blue-50">

                    {selectedCandidate.experience}+ years of relevant professional experience identified

                  </p>
                </div>

                {/* PROJECTS */}

                <div className="flex items-start gap-3">

                  <BadgeCheck
                    size={20}
                    className="text-green-300 mt-0.5"
                  />

                  <p className="text-sm leading-7 text-blue-50">

                    Candidate has hands-on project exposure across{" "}

                    {selectedCandidate.projects?.length || 0}

                    {" "}implementation areas

                  </p>
                </div>

                {/* EDUCATION */}

                <div className="flex items-start gap-3">

                  <BadgeCheck
                    size={20}
                    className="text-green-300 mt-0.5"
                  />

                  <p className="text-sm leading-7 text-blue-50">

                    Educational qualifications and technical background are available for evaluation

                  </p>
                </div>

                {/* SOURCE */}

                <div className="flex items-start gap-3">

                  {selectedCandidate.source === "manual" ? (

                    <BadgeCheck
                      size={20}
                      className="text-blue-200 mt-0.5"
                    />

                  ) : (

                    <Brain
                      size={20}
                      className="text-violet-200 mt-0.5"
                    />
                  )}

                  <p className="text-sm leading-7 text-blue-50">

                    {selectedCandidate.source === "manual"

                      ? "Profile was manually curated and verified"

                      : "Profile was parsed and structured using AI resume intelligence"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= AI RECRUITER SUMMARY ================= */}

          <div className="mb-8">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">

                <Brain
                  className="text-violet-600 dark:text-violet-400"
                  size={24}
                />
              </div>

              <div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">

                  AI Recruiter Summary

                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">

                  AI-generated candidate evaluation and hiring insights

                </p>
              </div>
            </div>

            {aiLoading ? (

              <div className="p-6 rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">

                <div className="flex items-center gap-4">

                  <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>

                  <p className="text-gray-600 dark:text-gray-300">

                    Generating recruiter insights using AI...

                  </p>
                </div>
              </div>

            ) : aiInsights ? (

              <div className="space-y-6">

                {/* SUMMARY */}

                <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg">

                  <div className="flex items-center gap-3 mb-4">

                    <Sparkles size={22} />

                    <h4 className="text-xl font-semibold">

                      AI Evaluation

                    </h4>
                  </div>

                  <p className="leading-8 text-[15px] text-violet-50">

                    {aiInsights.summary}

                  </p>
                </div>

                {/* STRENGTHS */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="p-6 rounded-3xl border border-green-100 dark:border-green-900 bg-green-50 dark:bg-green-900/20">

                    <h4 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-4">

                      Key Strengths

                    </h4>

                    <div className="space-y-3">

                      {aiInsights.strengths?.map(
                        (
                          item,
                          index
                        ) => (

                          <div
                            key={index}
                            className="flex items-start gap-3"
                          >

                            <CircleCheck
                              size={18}
                              className="text-green-600 dark:text-green-400 mt-0.5"
                            />

                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-6">

                              {item}

                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* GAPS */}

                  <div className="p-6 rounded-3xl border border-yellow-100 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/20">

                    <h4 className="text-lg font-semibold text-yellow-700 dark:text-yellow-400 mb-4">

                      Potential Gaps

                    </h4>

                    <div className="space-y-3">

                      {aiInsights.gaps?.map(
                        (
                          item,
                          index
                        ) => (

                          <div
                            key={index}
                            className="flex items-start gap-3"
                          >

                            <TriangleAlert
                              size={18}
                              className="text-yellow-600 dark:text-yellow-400 mt-0.5"
                            />

                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-6">

                              {item}

                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* RECOMMENDATION */}

                <div className="p-6 rounded-3xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20">

                  <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-3">

                    Hiring Recommendation

                  </h4>

                  <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">

                    {aiInsights.recommendation}

                  </p>
                </div>
              </div>

            ) : (

              <div className="p-6 rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">

                <p className="text-sm text-gray-500 dark:text-gray-400">

                  AI insights are currently unavailable for this candidate.

                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateRecommendationModal;