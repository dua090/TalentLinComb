// ================= CandidateRecommendationModal.jsx =================

import {
  useEffect,
  useState,
} from "react";

import {
  getCandidateSummary,
} from "../../services/aiService";

import RecommendationHeader from "./recommendation/RecommendationHeader";

import CandidateSkills from "./recommendation/CandidateSkills";

import AIRankingBreakdown from "./recommendation/AIRankingBreakdown";

import AIRecruiterSummary from "./recommendation/AIRecruiterSummary";

const CandidateRecommendationModal = ({
  selectedCandidate,
  setSelectedCandidate,
  parsedQuery,
}) => {

  const [
    aiInsights,
    setAiInsights,
  ] = useState(null);

  const [
    aiLoading,
    setAiLoading,
  ] = useState(false);

  useEffect(() => {

    const fetchInsights =
      async () => {

        if (
          !selectedCandidate
        ) {

          return;
        }

        try {

          setAiLoading(true);

          const data =
            await getCandidateSummary({

              candidate:
                selectedCandidate,

              recruiterQuery:
                parsedQuery
                  ?.originalQuery ||
                "",
            });

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
  ]);

  if (!selectedCandidate) {
    return null;
  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4">

      <div className="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">

        <div className="p-8 max-h-[90vh] overflow-y-auto">

          <RecommendationHeader
            selectedCandidate={
              selectedCandidate
            }
            setSelectedCandidate={
              setSelectedCandidate
            }
          />

          <CandidateSkills
            selectedCandidate={
              selectedCandidate
            }
            parsedQuery={
              parsedQuery
            }
          />

          <AIRankingBreakdown
            selectedCandidate={
              selectedCandidate
            }
          />

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