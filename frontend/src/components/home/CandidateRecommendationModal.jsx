import {
  useEffect,
  useState,
} from "react";

// ================= SERVICES =================

import {
  getCandidateSummary,
} from "../../services/aiService";

// ================= COMPONENTS =================

import RecommendationHeader from "./recommendation/RecommendationHeader";

import CandidateSkills from "./recommendation/CandidateSkills";

import AIRankingBreakdown from "./recommendation/AIRankingBreakdown";

import AIRecruiterSummary from "./recommendation/AIRecruiterSummary";

// ======================================================
// ================= MODAL ==============================
// ======================================================

const CandidateRecommendationModal = ({

  selectedCandidate,

  setSelectedCandidate,

  parsedQuery,

  token,
}) => {

  // ======================================================
  // ================= STATES =============================
  // ======================================================

  const [

    aiInsights,

    setAiInsights,

  ] = useState(null);

  const [

    aiLoading,

    setAiLoading,

  ] = useState(false);

  // ======================================================
  // ================= FETCH AI INSIGHTS ==================
  // ======================================================

  useEffect(() => {

    const fetchInsights =
      async () => {

        // ================= NO CANDIDATE =================

        if (
          !selectedCandidate
        ) {

          setAiInsights(
            null
          );

          return;
        }

        try {

          setAiLoading(
            true
          );

          // ================= AI REQUEST =================

          const data =
            await getCandidateSummary({

              candidate:
                selectedCandidate,

              recruiterQuery:

                parsedQuery
                  ?.originalQuery ||

                "",

              token,
            });

          // ================= SAVE INSIGHTS =================

          setAiInsights(

            data.insights
          );

        } catch (error) {

          console.error(

            "AI SUMMARY ERROR:",

            error
          );

          setAiInsights(
            null
          );

        } finally {

          setAiLoading(
            false
          );
        }
      };

    fetchInsights();

  }, [

    selectedCandidate,

    parsedQuery,

    token,
  ]);

  // ======================================================
  // ================= NO MODAL ===========================
  // ======================================================

  if (!selectedCandidate) {

    return null;
  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4">

      {/* ====================================================== */}
      {/* ================= MODAL CONTAINER ==================== */}
      {/* ====================================================== */}

      <div className="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">

        {/* ====================================================== */}
        {/* ================= SCROLL CONTAINER =================== */}
        {/* ====================================================== */}

        <div className="p-8 max-h-[90vh] overflow-y-auto">

          {/* ================= HEADER ================= */}

          <RecommendationHeader

            selectedCandidate={
              selectedCandidate
            }

            setSelectedCandidate={
              setSelectedCandidate
            }
          />

          {/* ================= SKILLS ================= */}

          <CandidateSkills

            selectedCandidate={
              selectedCandidate
            }

            parsedQuery={
              parsedQuery
            }
          />

          {/* ================= RANKING ================= */}

          <AIRankingBreakdown

            selectedCandidate={
              selectedCandidate
            }
          />

          {/* ================= AI SUMMARY ================= */}

          <AIRecruiterSummary

            aiLoading={
              aiLoading
            }

            aiInsights={
              aiInsights
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateRecommendationModal;