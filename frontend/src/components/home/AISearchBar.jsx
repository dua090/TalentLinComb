import { Sparkles } from "lucide-react";

// ================= QUICK SEARCH OPTIONS =================

const quickSearches = [
  "React developer",
  "Node.js backend engineer",
  "AWS cloud engineer",
  "AI/ML engineer",
];

const AISearchBar = ({
  query,
  setQuery,
  handleSearch,
  quickSearch,
  loading,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-5 shadow-sm">

      <div className="flex flex-col lg:flex-row gap-4">

        {/* ================= INPUT ================= */}

        <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl px-4">

          <Sparkles
            className="text-blue-500 dark:text-blue-400 mr-3"
            size={20}
          />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: React developer with AWS and 4 years experience..."
            className="w-full py-4 bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        {/* ================= BUTTON ================= */}

        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition disabled:opacity-70"
        >
          {loading ? "Searching..." : "Smart Search"}
        </button>
      </div>

      {/* ================= QUICK SEARCH ================= */}

      <div className="flex flex-wrap gap-3 mt-5">

        {quickSearches.map((item) => (
          <button
            key={item}
            onClick={() => quickSearch(item)}
            className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AISearchBar;