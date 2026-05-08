const filterProfiles = ({
  profiles,
  search,
  experienceFilter,
  domainFilter,
  selectedSkills,
  domainMap,
}) => {

  return profiles.filter(
    (profile) => {

      // ================= SEARCH =================

      const matchesSearch =

        !search ||

        profile.skills?.some(
          (skill) =>

            skill
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );

      // ================= EXPERIENCE =================

      let matchesExperience =
        true;

      const experience =
        Number(
          profile.experience
        );

      if (
        experienceFilter ===
        "0-2"
      ) {

        matchesExperience =
          experience >= 0 &&
          experience <= 2;
      }

      else if (
        experienceFilter ===
        "3-5"
      ) {

        matchesExperience =
          experience >= 3 &&
          experience <= 5;
      }

      else if (
        experienceFilter ===
        "5+"
      ) {

        matchesExperience =
          experience >= 5;
      }

      // ================= DOMAIN =================

      let matchesDomain =
        true;

      if (
        domainFilter !== "All"
      ) {

        const domainSkills =
          domainMap[
            domainFilter
          ] || [];

        matchesDomain =
          profile.skills?.some(
            (skill) =>

              domainSkills.includes(
                skill
              )
          );
      }

      // ================= SELECTED SKILLS =================

      const matchesSkills =

        selectedSkills.length === 0 ||

        selectedSkills.every(
          (selectedSkill) =>

            profile.skills?.some(
              (skill) =>

                skill
                  .toLowerCase()
                  .includes(
                    selectedSkill.toLowerCase()
                  )
            )
        );

      // ================= FINAL =================

      return (

        matchesSearch &&

        matchesExperience &&

        matchesDomain &&

        matchesSkills
      );
    }
  );
};

export default filterProfiles;