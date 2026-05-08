import SearchSkeleton from "./SearchSkeleton";
import EmptyState from "./EmptyState";
import CandidateCard from "./CandidateCard";

const SearchResults = ({
  loading,
  results = [],
  parsedQuery,
  query,
  setSelectedCandidate,
}) => {

  const hasResults =
    results.length > 0;

  return (
    <div className="mb-10">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Search Results
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">

            Showing candidates for

            <span className="ml-2 font-semibold text-blue-600 dark:text-blue-400">
              "{query}"
            </span>
          </p>

          {/* PARSED QUERY */}

          {parsedQuery && (

            <div className="flex flex-wrap gap-2 mt-3">

              {parsedQuery.skills?.map(
                (skill) => (

                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium"
                  >
                    {skill}
                  </span>
                )
              )}

              {parsedQuery.experience && (

                <span className="px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-medium">
                  {parsedQuery.experience}+ years
                </span>
              )}
            </div>
          )}
        </div>

        {/* MATCH COUNT */}

        <div className="px-4 py-2 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium">

          {results.length} Matches Found

        </div>
      </div>

      {/* LOADING */}

      {loading && (
        <SearchSkeleton />
      )}

      {/* RESULTS */}

      {!loading && hasResults && (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {results.map(
            (candidate) => (

              <CandidateCard
                key={candidate._id}
                candidate={candidate}
                parsedQuery={parsedQuery}
                setSelectedCandidate={setSelectedCandidate}
              />
            )
          )}
        </div>
      )}

      {/* EMPTY STATE */}

      {!loading && !hasResults && (
        <EmptyState />
      )}
    </div>
  );
};

export default SearchResults;