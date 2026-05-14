// ================= AIRankingBreakdown.jsx =================

import {
  Sparkles,
  CircleCheck,
} from "lucide-react";

const AIRankingBreakdown = ({
  selectedCandidate,
}) => {

  return (

    <div className="mb-8">

      <div className="flex items-center gap-3 mb-5">

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">

          <Sparkles
            className="text-emerald-600 dark:text-emerald-400"
            size={24}
          />
        </div>

        <div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">

            AI Ranking Breakdown

          </h3>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">

            AI-generated ranking signals and candidate relevance scoring

          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

        {[
          {
            label:
              "Semantic Relevance",

            value:
              selectedCandidate.semanticScore,

            color:
              "from-emerald-500 to-green-500",

            text:
              "text-emerald-600 dark:text-emerald-400",
          },

          {
            label:
              "Skill Alignment",

            value:
              selectedCandidate.skillScore,

            color:
              "from-blue-500 to-indigo-500",

            text:
              "text-blue-600 dark:text-blue-400",
          },

          {
            label:
              "Experience Match",

            value:
              selectedCandidate.experienceScore,

            color:
              "from-yellow-500 to-orange-500",

            text:
              "text-yellow-600 dark:text-yellow-400",
          },

          {
            label:
              "Project Relevance",

            value:
              selectedCandidate.projectScore,

            color:
              "from-violet-500 to-purple-500",

            text:
              "text-violet-600 dark:text-violet-400",
          },
        ].map(
          (
            item,
            index
          ) => (

            <div
              key={index}
              className="p-5 rounded-3xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900/30"
            >

              <div className="flex items-center justify-between mb-3">

                <h4 className="font-semibold text-gray-900 dark:text-white">

                  {item.label}

                </h4>

                <span
                  className={`text-sm font-bold ${item.text}`}
                >

                  {item.value || 0}%

                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">

                <div
                  style={{
                    width: `${item.value || 0}%`,
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                />
              </div>
            </div>
          )
        )}
      </div>

      {/* REASONS */}

      <div className="p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20">

        <h4 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-5">

          Why Ranked Highly?

        </h4>

        <div className="space-y-4">

          {selectedCandidate.rankingReasons?.map(
            (
              reason,
              index
            ) => (

              <div
                key={index}
                className="flex items-start gap-3"
              >

                <CircleCheck
                  size={18}
                  className="text-emerald-600 dark:text-emerald-400 mt-0.5"
                />

                <p className="text-sm text-gray-700 dark:text-gray-300 leading-7">

                  {reason}

                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRankingBreakdown;