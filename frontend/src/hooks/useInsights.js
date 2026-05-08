// src/hooks/useInsights.js

import {
  useEffect,
  useState,
} from "react";

import {
  fetchCandidates,
} from "../services/insightsService";

const domainMap = {

  Frontend: [
    "React",
    "React.js",
    "Next.js",
    "Vue",
    "Vue.js",
    "Angular",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "SCSS",
    "Bootstrap",
    "Tailwind CSS",
    "Redux",
    "Redux Toolkit",
    "Material UI",
    "UI/UX",
    "Figma",
    "Responsive Design",
  ],

  Backend: [
    "Node.js",
    "Node",
    "Express",
    "Express.js",
    "Java",
    "Spring Boot",
    "Python",
    "Django",
    "Flask",
    "PHP",
    "Laravel",
    "REST APIs",
    "GraphQL",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "SQL",
    "Firebase",
    "Redis",
    "API Development",
    "Microservices",
  ],

  Cloud: [
    "AWS",
    "Azure",
    "Google Cloud",
    "GCP",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Jenkins",
    "Terraform",
    "Linux",
    "Nginx",
    "DevOps",
    "Cloud Computing",
    "Serverless",
  ],

  AI_ML: [
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "TensorFlow",
    "PyTorch",
    "NLP",
    "Computer Vision",
    "LLM",
    "OpenAI",
    "LangChain",
    "Generative AI",
    "Data Science",
    "Data Analysis",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "AI",
  ],
};

const useInsights = () => {

  const [profiles, setProfiles] =
    useState([]);

  // ================= FETCH =================

  useEffect(() => {

    const loadCandidates =
      async () => {

        const data =
          await fetchCandidates();

        setProfiles(data);
      };

    loadCandidates();

  }, []);

  // ================= KPI =================

  const totalProfiles =
    profiles.length;

  const totalExperience =
    profiles.reduce(
      (acc, profile) =>
        acc +
        (profile.experience || 0),
      0
    );

  const avgExperience =
    totalProfiles > 0
      ? (
          totalExperience /
          totalProfiles
        ).toFixed(1)
      : 0;

  // ================= SKILLS =================

  const skillMap = {};

  profiles.forEach(
    (profile) => {

      profile.skills?.forEach(
        (skill) => {

          skillMap[skill] =
            (skillMap[skill] || 0) + 1;
        }
      );
    }
  );

  const sortedSkills =
    Object.entries(skillMap)
      .sort(
        (a, b) =>
          b[1] - a[1]
      );

  const skillChartData =
    sortedSkills
      .slice(0, 6)
      .map(
        ([skill, count]) => ({
          skill,
          count,
        })
      );

  const topSkill =
    sortedSkills[0]?.[0]
    || "No Data";

  // ================= DOMAINS =================

  const domainCounts = {

    Frontend: 0,

    Backend: 0,

    Cloud: 0,

    AI_ML: 0,
  };

  profiles.forEach(
    (profile) => {

      profile.skills?.forEach(
        (skill) => {

          Object.entries(domainMap)
            .forEach(
              ([
                domain,
                skills,
              ]) => {

                if (
                  skills.includes(
                    skill
                  )
                ) {

                  domainCounts[
                    domain
                  ]++;
                }
              }
            );
        }
      );
    }
  );

  const sortedDomains =
    Object.entries(
      domainCounts
    ).sort(
      (a, b) =>
        b[1] - a[1]
    );

  const topHiringDomain =
    sortedDomains[0]?.[0]
    || "No Data";

  // ================= EXPERIENCE =================

  const experienceData = [

    {
      name: "Junior",
      value: profiles.filter(
        (profile) =>
          profile.experience <= 2
      ).length,
    },

    {
      name: "Mid",
      value: profiles.filter(
        (profile) =>
          profile.experience > 2 &&
          profile.experience <= 5
      ).length,
    },

    {
      name: "Senior",
      value: profiles.filter(
        (profile) =>
          profile.experience > 5
      ).length,
    },
  ];

  // ================= EXPERTISE =================

  const expertiseAreas =
    sortedDomains.slice(0, 3);

  // ================= DYNAMIC INSIGHT =================

  const topSkills =
    sortedSkills
      .slice(0, 3)
      .map(([skill]) => skill);

  let aiInsight = "";

  if (totalProfiles === 0) {

    aiInsight =
      "Upload candidate resumes to generate talent insights and hiring analytics.";
  }

  else if (
    topHiringDomain === "Frontend"
  ) {

    aiInsight = `
      ${topSkills.join(", ")}
      are currently the strongest frontend capabilities identified across the talent pool.
    `;
  }

  else if (
    topHiringDomain === "Backend"
  ) {

    aiInsight = `
      ${topSkills.join(", ")}
      are driving backend engineering demand across candidate profiles.
    `;
  }

  else if (
    topHiringDomain === "Cloud"
  ) {

    aiInsight = `
      Cloud-focused profiles show growing expertise in
      ${topSkills.join(", ")}.
    `;
  }

  else if (
    topHiringDomain === "AI_ML"
  ) {

    aiInsight = `
      AI and Machine Learning profiles are increasingly focused on
      ${topSkills.join(", ")}.
    `;
  }

  else {

    aiInsight =
      "Candidate expertise is currently distributed across multiple technical domains.";
  }

  return {

    profiles,

    totalProfiles,

    avgExperience,

    topSkill,

    topHiringDomain,

    skillChartData,

    experienceData,

    expertiseAreas,

    aiInsight,
  };
};

export default useInsights;