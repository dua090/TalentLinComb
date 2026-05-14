import {
  Sparkles,
  UserRound,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import {
  toggleBookmark,
} from "../../services/candidateService";

import toast from "react-hot-toast";

const CandidateCard = ({
  profile,
  darkMode,
  selectedSkills,
  search,
  domainFilter,
  generateMatchScore,
  setSelectedCandidate,

  // ================= NEW PROP =================
  updateBookmarkState,
}) => {

  const matchScore =
    generateMatchScore(profile);

  const isAIProfile =
    profile.source === "ai";

// ================= LOCAL BOOKMARK STATE =================

  const [
    isBookmarked,
    setIsBookmarked,
  ] = useState(
    profile.isBookmarked
  );

// ================= SYNC BOOKMARK =================

  useEffect(() => {

    setIsBookmarked(
      profile.isBookmarked
    );

  }, [profile.isBookmarked]);

  // ================= USER TOKEN =================

  const storedUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const token =
    storedUser?.token;

  // ================= BOOKMARK =================

  const handleBookmark =
    async () => {

      try {

        const response =
          await toggleBookmark({

            candidateId:
              profile._id,

            token,
          });

        // ================= UPDATED VALUE =================

        const updatedBookmark =
          response.candidate
            .isBookmarked;

        // ================= LOCAL UPDATE =================

        setIsBookmarked(
          updatedBookmark
        );

        // ================= PARENT UPDATE =================

        updateBookmarkState(
          profile._id,
          updatedBookmark
        );

        // ================= TOAST =================

        toast.success(

          updatedBookmark

            ? "Candidate bookmarked successfully"

            : "Bookmark removed"
        );

      } catch (error) {

        console.error(
          "BOOKMARK ERROR:",
          error
        );

        toast.error(
          "Bookmark update failed"
        );
      }
    };

  return (

    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition p-6 flex flex-col">

      {/* ================= HEADER ================= */}

      <div className="flex items-start justify-between mb-5">

        {/* ================= LEFT ================= */}

        <div className="flex items-center gap-4">

          {/* ================= AVATAR ================= */}

          <div className="relative">

            <img
              src={`https://ui-avatars.com/api/?name=${profile.name}&background=${
                darkMode
                  ? "1F2937"
                  : "EFF6FF"
              }&color=${
                darkMode
                  ? "60A5FA"
                  : "2563EB"
              }&bold=true`}
              alt={profile.name}
              className="w-14 h-14 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm"
            />
          </div>

          {/* ================= INFO ================= */}

          <div>

            <button
              onClick={() =>
                setSelectedCandidate(profile)
              }
              className="text-left"
            >

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">

                {profile.name}

              </h3>
            </button>

            <p className="text-sm text-gray-500 dark:text-gray-400">

              {profile.experience || 0} years experience

            </p>

            {/* ================= PROFILE SOURCE ================= */}

            <div className="mt-2">

              {isAIProfile ? (

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-[11px] font-medium">

                  <Sparkles size={12} />

                  AI Parsed

                </div>

              ) : (

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[11px] font-medium">

                  <UserRound size={12} />

                  Manual Entry

                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}

        <div className="flex flex-col items-end gap-3">

          {/* ================= BOOKMARK ================= */}

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
                className="text-gray-400 dark:text-gray-500"
              />
            )}
          </button>

          {/* ================= MATCH SCORE ================= */}

          <div className="flex flex-col items-end">

            <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium mb-1">

              {selectedSkills.length > 0 ||
              search ||
              domainFilter !== "All"

                ? "Match Score"

                : "Profile Strength"}

            </span>

            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold shadow-sm">

              {matchScore}%

            </div>
          </div>
        </div>
      </div>

      {/* ================= SKILLS ================= */}

      <div className="mb-5">

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">

          Skills

        </p>

        <div className="flex flex-wrap gap-2">

          {profile.skills
            ?.slice(0, 4)
            .map((skill, i) => (

              <span
                key={i}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-md"
              >

                {skill}

              </span>
            ))}

          {profile.skills?.length > 4 && (

            <button
              onClick={() =>
                setSelectedCandidate(profile)
              }
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md transition"
            >

              +{profile.skills.length - 4} more

            </button>
          )}
        </div>
      </div>

      {/* ================= PROJECTS ================= */}

      <div className="mt-auto">

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">

          Projects

        </p>

        <ul className="space-y-2">

          {profile.projects
            ?.slice(0, 2)
            .map((project, i) => (

              <li
                key={i}
                className="text-sm text-gray-600 dark:text-gray-400"
              >

                • {project}

              </li>
            ))}

          {profile.projects?.length > 2 && (

            <button
              onClick={() =>
                setSelectedCandidate(profile)
              }
              className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition"
            >

              +{profile.projects.length - 2} more projects

            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CandidateCard;