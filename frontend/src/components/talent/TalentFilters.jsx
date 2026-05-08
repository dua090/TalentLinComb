const TalentFilters = ({
  experienceFilter,
  setExperienceFilter,

  domainFilter,
  setDomainFilter,

  resetFilters,

  allSkills,

  selectedSkills,

  toggleSkill,
}) => {

  return (
    <div className="sticky top-4 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-5 mb-8">

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

        <div className="flex flex-wrap gap-4">

          {/* EXPERIENCE */}

          <select
            value={experienceFilter}
            onChange={(e) =>
              setExperienceFilter(
                e.target.value
              )
            }
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-blue-400 dark:focus:border-blue-500"
          >

            <option value="All">
              All Experience
            </option>

            <option value="Junior">
              Junior (0-2 yrs)
            </option>

            <option value="Mid">
              Mid (3-5 yrs)
            </option>

            <option value="Senior">
              Senior (5+ yrs)
            </option>

          </select>

          {/* DOMAIN */}

          <select
            value={domainFilter}
            onChange={(e) =>
              setDomainFilter(
                e.target.value
              )
            }
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-blue-400 dark:focus:border-blue-500"
          >

            <option value="All">
              All Domains
            </option>

            <option value="Frontend">
              Frontend
            </option>

            <option value="Backend">
              Backend
            </option>

            <option value="Cloud">
              Cloud
            </option>

            <option value="AI_ML">
              AI / ML
            </option>

          </select>

          {/* RESET */}

          <button
            onClick={resetFilters}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >

            Reset Filters

          </button>
        </div>
      </div>

      {/* SKILLS */}

      <div className="mt-5">

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">

          Filter by Skills

        </p>

        <div className="flex flex-wrap gap-3">

          {allSkills.map(
            (skill, index) => {

              const active =
                selectedSkills.includes(
                  skill
                );

              return (

                <button
                  key={index}
                  onClick={() =>
                    toggleSkill(skill)
                  }
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition border
                  
                  ${
                    active
                      ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                      : "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                  }`}
                >

                  {skill}

                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default TalentFilters;