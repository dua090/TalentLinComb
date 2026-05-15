import axios from "axios";

// ================= API BASE =================

const API_BASE_URL =

  `${import.meta.env.VITE_API_URL}/api/ai`;

// ================= AXIOS INSTANCE =================

const aiAPI =
  axios.create({

    baseURL:
      API_BASE_URL,
  });

// ================= AUTH HEADERS =================

const getAuthHeaders =
  (token) => ({

    headers: {

      Authorization:
        `Bearer ${token}`,
    },
  });

// ======================================================
// ================= CANDIDATE SUMMARY ==================
// ======================================================

export const getCandidateSummary =
  async ({

    candidate,

    recruiterQuery,

    token,
  }) => {

    try {

      const response =
        await aiAPI.post(

          "/candidate-summary",

          {

            candidate,

            recruiterQuery,
          },

          getAuthHeaders(
            token
          )
        );

      return response.data;

    } catch (error) {

      console.error(

        "AI SUMMARY ERROR:",

        error
      );

      throw new Error(

        error?.response?.data
          ?.message ||

        "Failed to generate AI summary"
      );
    }
  };