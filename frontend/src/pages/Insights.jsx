// src/pages/Insights.jsx

import { useEffect, useState } from "react";

import {
  Users,
  TrendingUp,
  Briefcase,
  Search,
} from "lucide-react";

import useInsights from "../hooks/useInsights";

import KpiCard from "../components/insights/KpiCard";

import ChartsSection from "../components/insights/ChartsSection";

import ExpertiseSection from "../components/insights/ExpertiseSection";

import AIRecommendationCard from "../components/insights/AIRecommendationCard";

const Insights = () => {

  // ================= INSIGHTS HOOK =================

  const {

    totalProfiles,

    avgExperience,

    topSkill,

    topHiringDomain,

    skillChartData,

    experienceData,

    expertiseAreas,

    aiInsight,

  } = useInsights();

  // ================= DARK MODE =================

  const [
    darkMode,
    setDarkMode,
  ] = useState(false);

  useEffect(() => {

    const checkDarkMode = () => {

      const isDarkMode =
        document.documentElement.classList.contains(
          "dark"
        );

      setDarkMode(isDarkMode);
    };

    checkDarkMode();

    const observer =
      new MutationObserver(checkDarkMode);

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ["class"],
      }
    );

    return () =>
      observer.disconnect();

  }, []);

  return (

    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">

          Insights Dashboard

        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">

          AI-powered talent analytics and hiring intelligence

        </p>
      </div>

      {/* ================= KPI CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <KpiCard
          title="Total Profiles"
          value={totalProfiles}

          icon={
            <Users
              className="text-blue-600 dark:text-blue-400"
              size={22}
            />
          }

          badge="Active"

          iconBg="bg-blue-50 dark:bg-blue-900/30"

          badgeStyle="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
        />

        <KpiCard
          title="Most Popular Skill"
          value={topSkill}

          icon={
            <TrendingUp
              className="text-indigo-600 dark:text-indigo-400"
              size={22}
            />
          }

          badge="Trending"

          iconBg="bg-indigo-50 dark:bg-indigo-900/30"

          badgeStyle="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
        />

        <KpiCard
          title="Avg Experience"
          value={`${avgExperience} yrs`}

          icon={
            <Briefcase
              className="text-orange-500 dark:text-orange-400"
              size={22}
            />
          }

          badge="Experience"

          iconBg="bg-orange-50 dark:bg-orange-900/30"

          badgeStyle="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
        />

        <KpiCard
          title="Top Hiring Domain"

          value={
            topHiringDomain !== "No Data"

              ? topHiringDomain.replace(
                  "_",
                  " & "
                )

              : "No Data"
          }

          icon={
            <Search
              className="text-purple-600 dark:text-purple-400"
              size={22}
            />
          }

          badge="AI Insight"

          iconBg="bg-purple-50 dark:bg-purple-900/30"

          badgeStyle="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
        />
      </div>

      {/* ================= CHARTS ================= */}

      <ChartsSection
        darkMode={darkMode}
        skillChartData={skillChartData}
        experienceData={experienceData}
        totalProfiles={totalProfiles}
      />

      {/* ================= BOTTOM SECTION ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <ExpertiseSection
          expertiseAreas={expertiseAreas}
        />

        <AIRecommendationCard
          totalProfiles={totalProfiles}
          topHiringDomain={topHiringDomain}
          aiInsight={aiInsight}
        />
      </div>
    </div>
  );
};

export default Insights;