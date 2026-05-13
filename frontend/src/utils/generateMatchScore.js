const generateMatchScore = ({
  profile,
  selectedSkills,
  search,
  domainFilter,
  domainMap,
}) => {

  let score = 0;

  const normalizedProfileSkills =
    profile.skills?.map(
      (skill) =>
        skill
          .toLowerCase()
          .trim()
    ) || [];

  // ================= SKILL MATCH =================

  if (
    selectedSkills.length > 0
  ) {

    const normalizedSelectedSkills =
      selectedSkills.map(
        (skill) =>
          skill
            .toLowerCase()
            .trim()
      );

    const matchedSkills =
      normalizedSelectedSkills.filter(
        (selectedSkill) =>

          normalizedProfileSkills.some(
            (profileSkill) =>

              profileSkill.includes(
                selectedSkill
              ) ||

              selectedSkill.includes(
                profileSkill
              )
          )
      ).length;

    score +=
      (
        matchedSkills /
        normalizedSelectedSkills.length
      ) * 80;

  } else {

    score += 50;
  }

  // ================= SEARCH =================

  if (
    search.trim()
  ) {

    const normalizedSearch =
      search
        .toLowerCase()
        .trim();

    const hasSearchMatch =
      normalizedProfileSkills.some(
        (skill) =>

          skill.includes(
            normalizedSearch
          ) ||

          normalizedSearch.includes(
            skill
          )
      );

    if (
      hasSearchMatch
    ) {

      score += 10;
    }
  }

  // ================= EXPERIENCE =================

  const experience =
    profile.experience || 0;

  if (
    experience >= 5
  ) {

    score += 10;

  } else if (
    experience >= 3
  ) {

    score += 7;

  } else {

    score += 5;
  }

  // ================= DOMAIN =================

  if (
    domainFilter !== "All"
  ) {

    const normalizedDomainSkills =
      domainMap[
        domainFilter
      ]?.map(
        (skill) =>
          skill
            .toLowerCase()
            .trim()
      ) || [];

    const hasDomainMatch =
      normalizedProfileSkills.some(
        (profileSkill) =>

          normalizedDomainSkills.some(
            (domainSkill) =>

              profileSkill.includes(
                domainSkill
              ) ||

              domainSkill.includes(
                profileSkill
              )
          )
      );

    if (
      hasDomainMatch
    ) {

      score += 10;
    }
  }

  return Math.min(
    Math.round(score),
    100
  );
};

export default generateMatchScore;