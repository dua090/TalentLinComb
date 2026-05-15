import {
  useState,
} from "react";

import {
  smartSearch,
} from "../services/searchService";

// ======================================================
// ================= AI SEARCH HOOK =====================
// ======================================================

const useAISearch =
  () => {

    // ======================================================
    // ================= AUTH ===============================
    // ======================================================

    const storedUser =
      JSON.parse(

        localStorage.getItem(
          "user"
        )
      );

    const token =
      storedUser?.token;

    // ======================================================
    // ================= STATES =============================
    // ======================================================

    const [

      query,

      setQuery,

    ] = useState("");

    const [

      searchedQuery,

      setSearchedQuery,

    ] = useState("");

    const [

      loading,

      setLoading,

    ] = useState(false);

    const [

      showResults,

      setShowResults,

    ] = useState(false);

    const [

      results,

      setResults,

    ] = useState([]);

    const [

      parsedQuery,

      setParsedQuery,

    ] = useState(null);

    // ======================================================
    // ================= SEARCH =============================
    // ======================================================

    const handleSearch =
      async (
        customQuery
      ) => {

        const finalQuery =

          typeof customQuery ===
          "string"

            ? customQuery

            : query;

        // ================= EMPTY CHECK =================

        if (
          !finalQuery?.trim()
        ) {

          return;
        }

        try {

          setLoading(true);

          setShowResults(
            true
          );

          // ================= STORE QUERY =================

          setSearchedQuery(
            finalQuery
          );

          // ================= AI SEARCH =================

          const data =
            await smartSearch({

              prompt:
                finalQuery,

              token,
            });

          // ================= SAVE RESULTS =================

          setResults(

            data.candidates ||

            []
          );

          setParsedQuery(

            data.parsed ||

            null
          );

        } catch (err) {

          console.error(

            "AI SEARCH ERROR:",

            err
          );

          setResults([]);

          setParsedQuery(
            null
          );

        } finally {

          setLoading(
            false
          );
        }
      };

    // ======================================================
    // ================= QUICK SEARCH =======================
    // ======================================================

    const quickSearch =
      (value) => {

        setQuery(
          value
        );

        handleSearch(
          value
        );
      };

    // ======================================================
    // ================= RETURN =============================
    // ======================================================

    return {

      query,

      setQuery,

      searchedQuery,

      loading,

      showResults,

      results,

      parsedQuery,

      handleSearch,

      quickSearch,
    };
  };

export default
  useAISearch;