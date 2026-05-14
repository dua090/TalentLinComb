import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  toggleBookmark,
} from "../../services/candidateService";

import {
  isSemanticSkillMatch,
} from "../../utils/semanticSkillMatcher";

import toast from "react-hot-toast";

const CandidateCard = ({
  candidate,
  parsedQuery,
  setSelectedCandidate,
}) => {

  const storedUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const token =
    storedUser?.token;

  // ================= LOCAL BOOKMARK STATE =================

  const [
    isBookmarked,
    setIsBookmarked,
  ] = useState(
    candidate.isBookmarked
  );

  // ================= MATCH BADGE =================

  const matchBadgeStyle =
    candidate.matchPercentage >= 80
      ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
      : candidate.matchPercentage >= 60
      ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
      : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400";

  // ================= BOOKMARK =================

  const handleBookmark =
    async () => {

      try {

        const response =
          await toggleBookmark({

            candidateId:
              candidate._id,

            token,
          });

        setIsBookmarked(

          response.candidate
            .isBookmarked
        );

        toast.success(

          response.candidate
            .isBookmarked

            ? "Candidate bookmarked successfully"

            : "Bookmark removed"
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Bookmark update failed"
        );
      }
    };

  return (

    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn p-6 flex flex-col">

      {/* HEADER */}

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

        <div className="flex flex-col items-end gap-3">

          {/* BOOKMARK */}

          <button
            onClick={
              handleBookmark
            }
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >

            {isBookmarked ? (

              <BookmarkCheck
                size={20}
                className="text-yellow-500 fill-yellow-500"
              />

            ) : (

              <Bookmark
                size={20}
                className="text-gray-400"
              />
            )}
          </button>

          {/* MATCH */}

          <div
            className={`px-3 py-1 rounded-full text-sm font-semibold ${matchBadgeStyle}`}
          >

            {candidate.matchPercentage}% Match

          </div>
        </div>
      </div>

      {/* WHY MATCH */}

      <div className="mb-5">

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">

          Why this candidate?

        </p>

        <div className="space-y-2">

          {parsedQuery?.skills
            ?.slice(0, 3)
            .map((skill) => {

              const matched =
                isSemanticSkillMatch(
                  skill,
                  candidate.skills
                );

              return (

                <div
                  key={skill}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >

                  {matched ? (

                    <CheckCircle2
                      size={16}
                      className="text-green-500"
                    />

                  ) : (

                    <XCircle
                      size={16}
                      className="text-red-500"
                    />
                  )}

                  <span>
                    {skill}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* SKILLS */}

      <div className="mb-6">

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">

          Skills

        </p>

        <div className="flex flex-wrap gap-2">

          {candidate.skills
            ?.slice(0, 4)
            .map((skill) => (

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

      {/* FOOTER */}

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