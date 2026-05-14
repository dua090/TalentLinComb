const cosineSimilarity =
  (
    vecA,
    vecB
  ) => {

    if (
      !vecA?.length ||
      !vecB?.length
    ) {

      return 0;
    }

    let dotProduct = 0;

    let normA = 0;

    let normB = 0;

    for (
      let i = 0;
      i < vecA.length;
      i++
    ) {

      dotProduct +=
        vecA[i] * vecB[i];

      normA +=
        vecA[i] *
        vecA[i];

      normB +=
        vecB[i] *
        vecB[i];
    }

    return (
      dotProduct /
      (
        Math.sqrt(
          normA
        ) *
        Math.sqrt(
          normB
        )
      )
    );
  };

// ================= EXPERIENCE SCORE =================

const calculateExperienceScore =
  (
    requiredExperience,
    candidateExperience
  ) => {

    if (
      requiredExperience ===
      null
    ) {

      return 1;
    }

    const difference =

      candidateExperience -
      requiredExperience;

    // PERFECT MATCH

    if (
      difference >= 0
    ) {

      return 1;
    }

    // SLIGHTLY LOWER

    if (
      difference === -1
    ) {

      return 0.8;
    }

    // LOWER

    if (
      difference === -2
    ) {

      return 0.6;
    }

    // POOR MATCH

    return 0.3;
  };

// ================= SKILL SCORE =================

const calculateSkillScore =
  (
    requiredSkills,
    candidateSkills
  ) => {

    if (
      !requiredSkills
        ?.length
    ) {

      return 1;
    }

    const normalizedCandidateSkills =

      candidateSkills.map(
        (skill) =>

          skill
            .toLowerCase()
            .trim()
      );

    const matchedSkills =

      requiredSkills.filter(
        (
          requiredSkill
        ) => {

          return normalizedCandidateSkills.some(
            (
              candidateSkill
            ) =>

              candidateSkill.includes(
                requiredSkill.toLowerCase()
              )
          );
        }
      );

    return (
      matchedSkills.length /
      requiredSkills.length
    );
  };

// ================= PROJECT SCORE =================

const calculateProjectScore =
  (
    requiredSkills,
    projects
  ) => {

    if (
      !projects?.length
    ) {

      return 0.4;
    }

    const projectText =

      projects
        .join(" ")
        .toLowerCase();

    const matches =

      requiredSkills.filter(
        (skill) =>

          projectText.includes(
            skill.toLowerCase()
          )
      );

    return (
      matches.length /
      requiredSkills.length
    );
  };

// ================= MAIN RANKING ENGINE =================

const calculateCandidateRanking =
  ({

    candidate,

    parsedQuery,

    queryEmbedding,
  }) => {

    // ================= SEMANTIC SCORE =================

    const semanticSimilarity =

      cosineSimilarity(

        queryEmbedding,

        candidate.embedding
      );

    const semanticScore =
      semanticSimilarity * 100;

    // ================= SKILL SCORE =================

    const skillScore =

      calculateSkillScore(

        parsedQuery.skills,

        candidate.skills || []
      );

    // ================= EXPERIENCE SCORE =================

    const experienceScore =

      calculateExperienceScore(

        parsedQuery.experience,

        candidate.experience || 0
      );

    // ================= PROJECT SCORE =================

    const projectScore =

      calculateProjectScore(

        parsedQuery.skills,

        candidate.projects || []
      );

    // ================= FINAL AI SCORE =================

    const finalScore =

      (
        semanticScore * 0.4
      ) +

      (
        skillScore *
        100 *
        0.3
      ) +

      (
        experienceScore *
        100 *
        0.2
      ) +

      (
        projectScore *
        100 *
        0.1
      );

    const matchPercentage =

      Math.min(
        Math.round(
          finalScore
        ),
        95
      );

    // ================= RANKING REASONS =================

    const rankingReasons =
      [];

    if (
      semanticScore > 70
    ) {

      rankingReasons.push(
        "Strong semantic relevance to recruiter query"
      );
    }

    if (
      skillScore > 0.7
    ) {

      rankingReasons.push(
        "Strong skill alignment"
      );
    }

    if (
      experienceScore === 1
    ) {

      rankingReasons.push(
        "Experience closely matches requirement"
      );
    }

    if (
      projectScore > 0.5
    ) {

      rankingReasons.push(
        "Relevant project exposure identified"
      );
    }

    return {

      semanticScore:
        semanticScore.toFixed(
          2
        ),

      skillScore:
        (
          skillScore *
          100
        ).toFixed(2),

      experienceScore:
        (
          experienceScore *
          100
        ).toFixed(2),

      projectScore:
        (
          projectScore *
          100
        ).toFixed(2),

      matchPercentage,

      rankingReasons,
    };
  };

module.exports = {

  calculateCandidateRanking,
};