// src/pages/Home.jsx

import {
  useState,
} from "react";

import WelcomeBanner from "../components/home/WelcomeBanner";

import QuickActions from "../components/home/QuickActions";

import AISearchBar from "../components/home/AISearchBar";

import SearchResults from "../components/home/SearchResults";

import RecentCandidates from "../components/home/RecentCandidates";

import CandidateRecommendationModal from "../components/home/CandidateRecommendationModal";

import useAISearch from "../hooks/useAISearch";

const Home = () => {

  // ================= AI SEARCH =================

  const {

    query,
    setQuery,

    loading,

    showResults,

    results,

    parsedQuery,

    handleSearch,

    quickSearch,

  } = useAISearch();

  // ================= STATES =================

  const [
    selectedCandidate,
    setSelectedCandidate,
  ] = useState(null);

  return (

    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">

      {/* ================= WELCOME BANNER ================= */}

      <div className="mb-8">

        <WelcomeBanner />

      </div>

      {/* ================= QUICK ACTIONS ================= */}

      {/* <div className="mb-10">

        <QuickActions />

      </div> */}

      {/* ================= AI SEARCH ================= */}

      <div className="mb-10">

        {/* HEADER */}

        <div className="mb-5">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">

            Smart Talent Search

          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">

            Discover candidates using natural language queries and AI-powered talent matching.

          </p>
        </div>

        {/* SEARCH BAR */}

        <AISearchBar
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          quickSearch={quickSearch}
          loading={loading}
        />
      </div>

      {/* ================= SEARCH RESULTS ================= */}

      {showResults && (

        <div className="mb-10">

          <SearchResults
            loading={loading}
            results={results}
            parsedQuery={parsedQuery}
            query={query}
            setSelectedCandidate={setSelectedCandidate}
          />

        </div>
      )}

      {/* ================= RECENT TALENT ================= */}

      <div className="mb-10">

        <RecentCandidates />

      </div>

      {/* ================= MODAL ================= */}

      <CandidateRecommendationModal
        selectedCandidate={selectedCandidate}
        setSelectedCandidate={setSelectedCandidate}
        parsedQuery={parsedQuery}
      />
    </div>
  );
};

export default Home;