import {
  FRONTEND_SKILLS,
  BACKEND_SKILLS,
  CLOUD_SKILLS,
  AI_SKILLS,
} from "./domainSkills";

// ================= NORMALIZE =================

const normalizeSkills = (
  skills = []
) => {

  return skills.map(
    (skill) =>
      skill
        .toLowerCase()
        .trim()
  );
};

// ================= DOMAIN DETECTION =================

export const getCandidateDomains =
  (candidateSkills = []) => {

    const normalizedSkills =
      normalizeSkills(
        candidateSkills
      );

    const hasDomainSkill =
      (
        candidateSkill,
        domainSkills
      ) => {

        return domainSkills.some(
          (domainSkill) =>

            candidateSkill ===
              domainSkill ||

            candidateSkill.includes(
              domainSkill
            ) ||

            domainSkill.includes(
              candidateSkill
            )
        );
      };

    return {

      frontend:
        normalizedSkills.some(
          (skill) =>

            hasDomainSkill(
              skill,
              FRONTEND_SKILLS
            )
        ),

      backend:
        normalizedSkills.some(
          (skill) =>

            hasDomainSkill(
              skill,
              BACKEND_SKILLS
            )
        ),

      cloud:
        normalizedSkills.some(
          (skill) =>

            hasDomainSkill(
              skill,
              CLOUD_SKILLS
            )
        ),

      ai:
        normalizedSkills.some(
          (skill) =>

            hasDomainSkill(
              skill,
              AI_SKILLS
            )
        ),
    };
  };

// ================= MAIN MATCHER =================

export const isSemanticSkillMatch =
  (
    querySkill,
    candidateSkills = []
  ) => {

    const normalizedQuery =
      querySkill
        .toLowerCase()
        .trim();

    const normalizedSkills =
      normalizeSkills(
        candidateSkills
      );

    // ================= DIRECT MATCH =================

    const directMatch =
      normalizedSkills.some(
        (skill) =>

          skill.includes(
            normalizedQuery
          ) ||

          normalizedQuery.includes(
            skill
          )
      );

    if (directMatch) {

      return true;
    }

    // ================= PARTIAL TOKEN MATCH =================

    const queryTokens =
      normalizedQuery.split(
        " "
      );

    const semanticMatch =
      normalizedSkills.some(
        (skill) =>

          queryTokens.some(
            (token) =>

              skill.includes(
                token
              ) ||

              token.includes(
                skill
              )
          )
      );

    return semanticMatch;
  };