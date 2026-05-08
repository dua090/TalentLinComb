// src/pages/TalentPool.jsx

import {
  useEffect,
  useRef,
  useState,
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

  // ================= INFINITE SCROLL =================

  const [
    visibleCount,
    setVisibleCount,
  ] = useState(12);

  const loaderRef =
    useRef(null);

  // ================= RESET VISIBLE COUNT =================

  useEffect(() => {

    setVisibleCount(12);

  }, [

    search,

    experienceFilter,

    domainFilter,

    selectedSkills,
  ]);

  // ================= INTERSECTION OBSERVER =================

  useEffect(() => {

    const observer =
      new IntersectionObserver(
        (entries) => {

          if (
            entries[0].isIntersecting &&
            visibleCount <
              filteredProfiles.length
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

    filteredProfiles.length,
  ]);

  // ================= VISIBLE PROFILES =================

  const visibleProfiles =
    filteredProfiles.slice(
      0,
      visibleCount
    );

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
          {/* ================= RESULTS ================= */}

          {visibleProfiles.length > 0 ? (

            <>
              {/* ================= COUNT ================= */}

              <div className="mb-6 flex items-center justify-between">

                <p className="text-sm text-gray-500 dark:text-gray-400">

                  Showing{" "}

                  <span className="font-semibold text-gray-700 dark:text-gray-200">

                    {visibleProfiles.length}

                  </span>

                  {" "}of{" "}

                  <span className="font-semibold text-gray-700 dark:text-gray-200">

                    {filteredProfiles.length}

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
                    />
                  )
                )}
              </div>

              {/* ================= INFINITE SCROLL ================= */}

              <div className="mt-10">

                {/* ================= LOADING MORE ================= */}

                {visibleCount <
                  filteredProfiles.length && (

                  <div
                    ref={loaderRef}
                    className="h-24 flex items-center justify-center"
                  >

                    <div className="flex flex-col items-center gap-3">

                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                      <p className="text-sm text-gray-500 dark:text-gray-400">

                        Loading more profiles...

                      </p>
                    </div>
                  </div>
                )}

                {/* ================= ALL LOADED ================= */}

                {visibleCount >=
                  filteredProfiles.length &&

                  filteredProfiles.length > 0 && (

                  <div className="text-center">

                    <p className="text-sm text-gray-400 dark:text-gray-500">

                      All candidate profiles loaded

                    </p>
                  </div>
                )}
              </div>
            </>

          ) : (

            /* ================= EMPTY STATE ================= */

            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-12 text-center">

              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-5 text-2xl">

                🔍

              </div>

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

      {/* ================= CANDIDATE MODAL ================= */}

      <CandidateModal
        selectedCandidate={selectedCandidate}
        setSelectedCandidate={setSelectedCandidate}
        darkMode={darkMode}
      />
    </div>
  );
};

export default TalentPool;