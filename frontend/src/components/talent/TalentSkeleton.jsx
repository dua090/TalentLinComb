const TalentSkeleton = () => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {[...Array(6)].map(
        (_, index) => (

          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 animate-pulse"
          >

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>

                <div>

                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>

                  <div className="h-3 w-24 bg-gray-100 dark:bg-gray-700 rounded"></div>

                </div>
              </div>

              <div className="h-8 w-16 rounded-full bg-gray-100 dark:bg-gray-700"></div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TalentSkeleton;