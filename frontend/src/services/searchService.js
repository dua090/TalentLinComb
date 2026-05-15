const API_BASE_URL =

  `${import.meta.env.VITE_API_URL}/api/candidates`;

// ======================================================
// ================= AUTH HEADERS =======================
// ======================================================

const getAuthHeaders =
  (token) => ({

    "Content-Type":
      "application/json",

    Authorization:
      `Bearer ${token}`,
  });

// ======================================================
// ================= HANDLE RESPONSE ====================
// ======================================================

const handleResponse =
  async (response) => {

    const data =
      await response.json();

    // ======================================================
    // ================= ERROR ==============================
    // ======================================================

    if (!response.ok) {

      throw new Error(

        data.msg ||

        data.message ||

        "Request failed"
      );
    }

    return data;
  };

// ======================================================
// ================= SMART SEARCH =======================
// ======================================================

export const smartSearch =
  async ({

    prompt,

    token,
  }) => {

    try {

      const response =
        await fetch(

          `${API_BASE_URL}/smart-search`,

          {
            method: "POST",

            headers:
              getAuthHeaders(
                token
              ),

            body:
              JSON.stringify({

                prompt,
              }),
          }
        );

      return handleResponse(
        response
      );

    } catch (err) {

      console.error(

        "SMART SEARCH ERROR:",

        err
      );

      throw err;
    }
  };