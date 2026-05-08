// src/utils/filterProfiles.js

const filterProfiles = ({
  profiles,
  search,
  experienceFilter,
  domainFilter,
  selectedSkills,
  domainMap,
}) => {

  return profiles.filter((profile) => {

    // ================= SEARCH =================

    const matchesSearch =

      search.trim() === "" ||

      profile.skills
        ?.join(" ")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    // ================= EXPERIENCE =================

    let matchesExperience = true;

    if (
      experienceFilter === "Junior"
    ) {

      matchesExperience =
        profile.experience <= 2;
    }

    else if (
      experienceFilter === "Mid"
    ) {

      matchesExperience =
        profile.experience > 2 &&
        profile.experience <= 5;
    }

    else if (
      experienceFilter === "Senior"
    ) {

      matchesExperience =
        profile.experience > 5;
    }

    // ================= DOMAIN =================

    let matchesDomain = true;

    if (
      domainFilter !== "All"
    ) {

      matchesDomain =
        profile.skills?.some(
          (skill) =>
            domainMap[
              domainFilter
            ]?.includes(skill)
        );
    }

    // ================= SKILLS =================

    let matchesSkills = true;

    if (
      selectedSkills.length > 0
    ) {

      matchesSkills =
        selectedSkills.every(
          (skill) =>
            profile.skills?.includes(
              skill
            )
        );
    }

    return (
      matchesSearch &&
      matchesExperience &&
      matchesDomain &&
      matchesSkills
    );
  });
};

export default filterProfiles;