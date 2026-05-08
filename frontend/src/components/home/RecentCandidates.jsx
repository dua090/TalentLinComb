// src/components/home/RecentCandidates.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  Sparkles,
  UserRound,
} from "lucide-react";

const RecentCandidates = () => {

  const [
    candidates,
    setCandidates,
  ] = useState([]);

  // ================= FETCH RECENT CANDIDATES =================

  useEffect(() => {

    const fetchCandidates =
      async () => {

        try {

          const storedUser =
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            );

          const token =
            storedUser?.token;

          const res =
            await fetch(
              `${import.meta.env.VITE_API_URL}/api/candidates`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          const data =
            await res.json();

          if (
            Array.isArray(data)
          ) {

            // ================= SORT LATEST FIRST =================

            const sortedCandidates =
              [...data].sort(
                (a, b) =>
                  new Date(
                    b.createdAt
                  ) -
                  new Date(
                    a.createdAt
                  )
              );

            // ================= TAKE LATEST 4 =================

            setCandidates(
              sortedCandidates.slice(
                0,
                4
              )
            );
          }

        } catch (err) {

          console.error(
            "Failed to fetch recent candidates:",
            err
          );
        }
      };

    fetchCandidates();

  }, []);

  // ================= FORMAT DATE =================

  const formatDate = (
    dateString
  ) => {

    if (!dateString) {
      return "Recently added";
    }

    return new Date(
      dateString
    ).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (

    <div>

      {/* ================= HEADER ================= */}

      <div className="mb-5">

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Recently Added Talent
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Latest uploaded and manually added candidate profiles
        </p>
      </div>

      {/* ================= EMPTY STATE ================= */}

      {candidates.length === 0 ? (

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-10 text-center">

          <p className="text-gray-500 dark:text-gray-400">
            No recent candidates available.
          </p>
        </div>

      ) : (

        /* ================= GRID ================= */

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          {candidates.map(
            (candidate) => {

              const isAIProfile =
                candidate.source === "ai";

              return (

                <div
                  key={candidate._id}
                  className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-5 hover:shadow-md transition flex flex-col"
                >

                  {/* ================= HEADER ================= */}

                  <div className="flex items-center gap-4 mb-5">

                    <img
                      src={`https://ui-avatars.com/api/?name=${candidate.name}&background=EFF6FF&color=2563EB&bold=true`}
                      alt={candidate.name}
                      className="w-14 h-14 rounded-2xl"
                    />

                    <div className="flex-1 min-w-0">

                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {candidate.name}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {candidate.experience || 0} years
                      </p>

                      {/* ================= SOURCE BADGE ================= */}

                      <div className="mt-2">

                        {isAIProfile ? (

                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-[11px] font-medium">

                            <Sparkles size={11} />

                            AI Parsed

                          </div>

                        ) : (

                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[11px] font-medium">

                            <UserRound size={11} />

                            Manual Entry

                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ================= SKILLS ================= */}

                  <div className="flex flex-wrap gap-2 mb-5 min-h-[68px]">

                    {candidate.skills
                      ?.slice(0, 3)
                      .map((skill) => (

                        <span
                          key={skill}
                          className="px-3 py-1 h-fit bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-lg font-medium"
                        >
                          {skill}
                        </span>
                      ))}

                    {candidate.skills?.length > 3 && (

                      <span
                        className="px-3 py-1 h-fit bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg font-medium"
                      >
                        +{candidate.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* ================= FOOTER ================= */}

                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">

                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      Added on
                    </span>

                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {formatDate(
                        candidate.createdAt
                      )}
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default RecentCandidates;