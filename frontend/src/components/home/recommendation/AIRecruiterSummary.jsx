// ================= AIRecruiterSummary.jsx =================

import {
  Brain,
  Sparkles,
  CircleCheck,
  TriangleAlert,
} from "lucide-react";

const AIRecruiterSummary = ({
  aiLoading,
  aiInsights,
}) => {

  return (

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

                Candidate Evaluation

              </h4>
            </div>

            <p className="leading-8 text-[15px] text-violet-50">

              {aiInsights.summary}

            </p>
          </div>

          {/* STRENGTHS + GAPS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* STRENGTHS */}

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
  );
};

export default AIRecruiterSummary;