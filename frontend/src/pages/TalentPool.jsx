import {
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

import useDarkMode from "../hooks/useDarkMode";

import useTalentPool from "../hooks/useTalentPool";

import TalentPoolFilters from "../components/talent/TalentPoolFilters";

import CandidateCard from "../components/talent/CandidateCard";

import CandidateModal from "../components/talent/CandidateModal";

const TalentPool = () => {

  // ================= DARK MODE =================

  const darkMode =
    useDarkMode();

  // ================= TALENT POOL =================

  const {

    loading,

    search,
    setSearch,

    experienceFilter,
    setExperienceFilter,

    domainFilter,
    setDomainFilter,

    selectedSkills,

    toggleSkill,

    filteredProfiles,

    allSkills,

    resetFilters,

    generateMatchScore,

  } = useTalentPool();

  // ================= STATES =================

  const [
    selectedCandidate,
    setSelectedCandidate,
  ] = useState(null);

  const [
    showBookmarked,
    setShowBookmarked,
  ] = useState(false);

  const [
    visibleCount,
    setVisibleCount,
  ] = useState(12);

  // ================= BOOKMARK STATE =================

  const [
    bookmarkedIds,
    setBookmarkedIds,
  ] = useState(
    new Set()
  );

  // ================= HYDRATE BOOKMARKS =================

  useEffect(() => {

    if (
      filteredProfiles.length > 0
    ) {

      const bookmarked =
        filteredProfiles
          .filter(
            (profile) =>
              profile.isBookmarked
          )
          .map(
            (profile) =>
              profile._id
          );

      setBookmarkedIds(
        new Set(bookmarked)
      );
    }

  }, [filteredProfiles]);

  // ================= LOADER =================

  const loaderRef =
    useRef(null);

  // ================= UPDATE BOOKMARK =================

  const updateBookmarkState =
    (
      candidateId,
      isBookmarked
    ) => {

      setBookmarkedIds(
        (prev) => {

          const updated =
            new Set(prev);

          if (
            isBookmarked
          ) {

            updated.add(
              candidateId
            );

          } else {

            updated.delete(
              candidateId
            );
          }

          return updated;
        }
      );
    };

  // ================= MERGED PROFILES =================

  const profiles =
    useMemo(() => {

      return filteredProfiles.map(
        (profile) => ({

          ...profile,

          isBookmarked:
            bookmarkedIds.has(
              profile._id
            ),
        })
      );

    }, [

      filteredProfiles,

      bookmarkedIds,
    ]);

  // ================= FINAL FILTER =================

  const finalProfiles =
    showBookmarked

      ? profiles.filter(
          (profile) =>
            profile.isBookmarked
        )

      : profiles;

  // ================= RESET VISIBLE =================

  useEffect(() => {

    setVisibleCount(12);

  }, [

    search,

    experienceFilter,

    domainFilter,

    selectedSkills,

    showBookmarked,
  ]);

  // ================= INFINITE SCROLL =================

  useEffect(() => {

    const observer =
      new IntersectionObserver(
        (entries) => {

          if (
            entries[0]
              .isIntersecting &&
            visibleCount <
              finalProfiles.length
          ) {

            setVisibleCount(
              (prev) =>
                prev + 12
            );
          }
        },
        {
          threshold: 1,
        }
      );

    if (loaderRef.current) {

      observer.observe(
        loaderRef.current
      );
    }

    return () =>
      observer.disconnect();

  }, [

    visibleCount,

    finalProfiles.length,
  ]);

  // ================= VISIBLE =================

  const visibleProfiles =
    finalProfiles.slice(
      0,
      visibleCount
    );

  // ================= COUNT =================

  const bookmarkedCount =
    bookmarkedIds.size;

  return (

    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 p-4 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">

          Talent Pool

        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">

          Explore and filter candidate profiles across skills, experience, and domains.

        </p>
      </div>

      {/* ================= TABS ================= */}

      <div className="mb-6 flex items-center gap-4">

        <button
          onClick={() =>
            setShowBookmarked(
              false
            )
          }
          className={`px-5 py-2 rounded-2xl text-sm font-medium transition

          ${
            !showBookmarked

              ? "bg-blue-600 text-white shadow-sm"

              : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >

          All Candidates

        </button>

        <button
          onClick={() =>
            setShowBookmarked(
              true
            )
          }
          className={`px-5 py-2 rounded-2xl text-sm font-medium transition flex items-center gap-2

          ${
            showBookmarked

              ? "bg-yellow-500 text-white shadow-sm"

              : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >

          Bookmarked

          <span className="px-2 py-0.5 rounded-full bg-black/10 text-xs">

            {bookmarkedCount}

          </span>
        </button>
      </div>

      {/* ================= FILTERS ================= */}

      <div className="mb-8">

        <TalentPoolFilters
          search={search}
          setSearch={setSearch}

          experienceFilter={experienceFilter}
          setExperienceFilter={setExperienceFilter}

          domainFilter={domainFilter}
          setDomainFilter={setDomainFilter}

          selectedSkills={selectedSkills}

          toggleSkill={toggleSkill}

          allSkills={allSkills}

          resetFilters={resetFilters}
        />
      </div>

      {/* ================= LOADING ================= */}

      {loading ? (

        <div className="flex items-center justify-center py-24">

          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        </div>

      ) : (

        <>
          {visibleProfiles.length > 0 ? (

            <>
              {/* ================= COUNT ================= */}

              <div className="mb-6 flex items-center justify-between">

                <p className="text-sm text-gray-500 dark:text-gray-400">

                  Showing{" "}

                  <span className="font-semibold text-gray-700 dark:text-gray-200">

                    {
                      visibleProfiles.length
                    }

                  </span>

                  {" "}of{" "}

                  <span className="font-semibold text-gray-700 dark:text-gray-200">

                    {
                      finalProfiles.length
                    }

                  </span>

                  {" "}profiles

                </p>
              </div>

              {/* ================= GRID ================= */}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {visibleProfiles.map(
                  (profile) => (

                    <CandidateCard
                      key={profile._id}

                      profile={profile}

                      darkMode={darkMode}

                      selectedSkills={selectedSkills}

                      search={search}

                      domainFilter={domainFilter}

                      generateMatchScore={generateMatchScore}

                      setSelectedCandidate={setSelectedCandidate}

                      updateBookmarkState={updateBookmarkState}
                    />
                  )
                )}
              </div>

              {/* ================= INFINITE ================= */}

              <div className="mt-10">

                {visibleCount <
                  finalProfiles.length && (

                  <div
                    ref={loaderRef}
                    className="h-24 flex items-center justify-center"
                  >

                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                  </div>
                )}
              </div>
            </>

          ) : (

            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-12 text-center">

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">

                No candidates found

              </h3>

              <p className="text-gray-500 dark:text-gray-400">

                Try adjusting filters or search criteria.

              </p>
            </div>
          )}
        </>
      )}

      {/* ================= MODAL ================= */}

      <CandidateModal
        selectedCandidate={selectedCandidate}
        setSelectedCandidate={setSelectedCandidate}
        darkMode={darkMode}
      />
    </div>
  );
};

export default TalentPool;