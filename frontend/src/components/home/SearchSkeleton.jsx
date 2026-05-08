const SearchSkeleton = () => {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {Array.from({ length: 3 }).map(
        (_, index) => (

          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 animate-pulse"
          >

            {/* HEADER */}

            <div className="flex items-center gap-4 mb-6">

              <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700" />

              <div className="flex-1">

                <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700 mb-3" />

                <div className="h-3 w-20 rounded bg-gray-100 dark:bg-gray-700" />
              </div>
            </div>

            {/* CONTENT */}

            <div className="space-y-3">

              <div className="h-3 rounded bg-gray-100 dark:bg-gray-700" />

              <div className="h-3 rounded bg-gray-100 dark:bg-gray-700" />

              <div className="h-3 w-2/3 rounded bg-gray-100 dark:bg-gray-700" />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SearchSkeleton;