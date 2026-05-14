import axios from "axios";

const API =
  import.meta.env
    .VITE_API_URL;

export const getCandidateSummary =
  async ({
    candidate,
    recruiterQuery,
  }) => {

    const response =
      await axios.post(

        `${API}/api/ai/candidate-summary`,

        {
          candidate,
          recruiterQuery,
        }
      );

    return response.data;
  };