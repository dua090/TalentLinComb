// src/hooks/useTalentPool.js

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import domainMap from "../constants/domainMap";

import filterProfiles from "../utils/filterProfiles";

import generateMatchScoreUtil from "../utils/generateMatchScore";

const useTalentPool = () => {

  // ================= STATES =================

  const [profiles, setProfiles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    experienceFilter,
    setExperienceFilter,
  ] = useState("All");

  const [
    domainFilter,
    setDomainFilter,
  ] = useState("All");

  const [
    selectedSkills,
    setSelectedSkills,
  ] = useState([]);

  // ================= FETCH CANDIDATES =================

  useEffect(() => {

    const fetchCandidates =
      async () => {

        try {

          setLoading(true);

          const storedUser =
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            );

          const token =
            storedUser?.token;

          const res =
            await fetch(
              `${import.meta.env.VITE_API_URL}/api/candidates`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          const data =
            await res.json();

          setProfiles(
            Array.isArray(data)
              ? data
              : []
          );

        } catch (err) {

          console.error(
            "Failed to fetch candidates:",
            err
          );

          setProfiles([]);

        } finally {

          setLoading(false);
        }
      };

    fetchCandidates();

  }, []);

  // ================= TOP SKILLS =================
  // DYNAMICALLY GENERATED FROM CANDIDATE DATA

  const allSkills =
    useMemo(() => {

      const skillFrequency = {};

      profiles.forEach(
        (profile) => {

          profile.skills?.forEach(
            (skill) => {

              skillFrequency[
                skill
              ] =

                (
                  skillFrequency[
                    skill
                  ] || 0
                ) + 1;
            }
          );
        }
      );

      return Object.entries(
        skillFrequency
      )

        // SORT BY MOST COMMON

        .sort(
          (a, b) =>
            b[1] - a[1]
        )

        // TOP 12 SKILLS

        .slice(0, 12)

        // RETURN ONLY SKILL NAME

        .map(
          ([skill]) => skill
        );

    }, [profiles]);

  // ================= TOGGLE SKILL =================

  const toggleSkill =
    useCallback(
      (skill) => {

        setSelectedSkills(
          (prev) =>

            prev.includes(skill)

              ? prev.filter(
                  (s) =>
                    s !== skill
                )

              : [
                  ...prev,
                  skill,
                ]
        );
      },
      []
    );

  // ================= ACTIVE FILTERS =================

  const hasActiveFilters =

    search.trim() ||

    selectedSkills.length > 0 ||

    domainFilter !== "All" ||

    experienceFilter !== "All";

  // ================= FILTER + SORT =================

  const filteredProfiles =
    useMemo(() => {

      // FILTER PROFILES

      const filtered =
        filterProfiles({

          profiles,

          search,

          experienceFilter,

          domainFilter,

          selectedSkills,

          domainMap,
        });

      // SORT PROFILES

      return [...filtered].sort(
        (a, b) => {

          // ================= FILTER MODE =================
          // SORT BY MATCH SCORE

          if (hasActiveFilters) {

            const scoreA =
              generateMatchScoreUtil({

                profile: a,

                selectedSkills,

                search,

                domainFilter,

                domainMap,
              });

            const scoreB =
              generateMatchScoreUtil({

                profile: b,

                selectedSkills,

                search,

                domainFilter,

                domainMap,
              });

            return scoreB - scoreA;
          }

          // ================= DEFAULT MODE =================
          // SORT BY LATEST

          return (
            new Date(b.createdAt) -
            new Date(a.createdAt)
          );
        }
      );

    }, [

      profiles,

      search,

      experienceFilter,

      domainFilter,

      selectedSkills,

      hasActiveFilters,
    ]);

  // ================= MATCH SCORE =================

  const generateMatchScore =
    useCallback(
      (profile) =>

        generateMatchScoreUtil({

          profile,

          selectedSkills,

          search,

          domainFilter,

          domainMap,
        }),

      [
        selectedSkills,
        search,
        domainFilter,
      ]
    );

  // ================= RESET FILTERS =================

  const resetFilters =
    () => {

      setSearch("");

      setExperienceFilter(
        "All"
      );

      setDomainFilter(
        "All"
      );

      setSelectedSkills([]);
    };

  // ================= RETURN =================

  return {

    profiles,

    loading,

    search,
    setSearch,

    experienceFilter,
    setExperienceFilter,

    domainFilter,
    setDomainFilter,

    selectedSkills,

    toggleSkill,

    filteredProfiles,

    allSkills,

    resetFilters,

    generateMatchScore,

    hasActiveFilters,
  };
};

export default useTalentPool;