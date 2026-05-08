const TalentPoolFilters = ({

  search,
  setSearch,

  experienceFilter,
  setExperienceFilter,

  domainFilter,
  setDomainFilter,

  selectedSkills,

  toggleSkill,

  allSkills,

  resetFilters,

}) => {

  return (

    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">

      {/* ================= TOP FILTERS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        {/* SEARCH */}

        <div>

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

            Search Skills

          </label>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="React, Node.js..."
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* EXPERIENCE */}

        <div>

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

            Experience

          </label>

          <select
            value={experienceFilter}
            onChange={(e) =>
              setExperienceFilter(
                e.target.value
              )
            }
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="All">
              All
            </option>

            <option value="0-2">
              0 - 2 Years
            </option>

            <option value="3-5">
              3 - 5 Years
            </option>

            <option value="5+">
              5+ Years
            </option>

          </select>
        </div>

        {/* DOMAIN */}

        <div>

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">

            Domain

          </label>

          <select
            value={domainFilter}
            onChange={(e) =>
              setDomainFilter(
                e.target.value
              )
            }
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>
      </div>

      {/* ================= SKILLS ================= */}

      <div className="mb-6">

        <div className="flex items-center justify-between mb-3">

          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">

            Filter by Skills

          </h3>

          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >

            Reset Filters

          </button>
        </div>

        <div className="flex flex-wrap gap-3">

          {allSkills.map(
            (skill) => (

              <button
                key={skill}
                onClick={() =>
                  toggleSkill(skill)
                }
                className={`px-4 py-2 rounded-xl text-sm font-medium transition

                ${
                  selectedSkills.includes(
                    skill
                  )

                    ? "bg-blue-600 text-white"

                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >

                {skill}

              </button>
            )
          )}
        </div>
      </div>

      {/* ================= ACTIVE FILTERS ================= */}

      {(selectedSkills.length > 0 ||

        search ||

        experienceFilter !==
          "All" ||

        domainFilter !==
          "All") && (

        <div className="pt-5 border-t border-gray-100 dark:border-gray-700">

          <p className="text-sm text-gray-500 dark:text-gray-400">

            Active filters applied

          </p>
        </div>
      )}
    </div>
  );
};

export default TalentPoolFilters;