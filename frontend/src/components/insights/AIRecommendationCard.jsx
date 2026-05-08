const AIRecommendationCard = ({
  totalProfiles,
  topHiringDomain,
  aiInsight,
}) => {

  const hasProfiles =
    totalProfiles > 0;

  const formattedDomain =
    topHiringDomain?.replace(
      "_",
      " & "
    );

  const heading =
    hasProfiles
      ? `${formattedDomain} talent demand is growing rapidly.`
      : "AI insights will appear once candidate data is available.";

  const description =
    hasProfiles
      ? aiInsight
      : "Upload candidate resumes to generate hiring intelligence and talent insights.";

  return (

    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-sm text-white">

      <p className="text-sm opacity-80 mb-2">
        Talent Insights
      </p>

      <h3 className="text-2xl font-bold leading-snug mb-4">
        {heading}
      </h3>

      <p className="text-sm opacity-90 leading-relaxed">
        {description}
      </p>

      <div className="mt-6">

        <span className="inline-flex px-3 py-1 rounded-full bg-white/20 text-sm">
          Data-driven Insight
        </span>

      </div>
    </div>
  );
};

export default AIRecommendationCard;