const TalentSearchBar = ({
  search,
  setSearch,
}) => {

  return (
    <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm mb-5 px-4">

      <svg
        className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />

      </svg>

      <input
        type="text"
        placeholder="Search by skill..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        autoComplete="off"
        className="flex-1 py-4 bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>
  );
};

export default TalentSearchBar;