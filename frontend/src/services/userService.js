const API_BASE_URL =
  `${import.meta.env.VITE_API_URL}/api/users`;

// ======================================================
// ================= HEADERS ============================
// ======================================================

const getHeaders =
  (token) => ({

    "Content-Type":
      "application/json",

    Authorization:
      `Bearer ${token}`,
  });

// ======================================================
// ================= RESPONSE HANDLER ===================
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
// ================= GET USERS ==========================
// ======================================================

export const getUsers =
  async (token) => {

    const response =
      await fetch(

        API_BASE_URL,

        {
          headers:
            getHeaders(
              token
            ),
        }
      );

    return handleResponse(
      response
    );
  };

// ======================================================
// ================= CREATE USER ========================
// ======================================================

export const createUser =
  async ({
    payload,
    token,
  }) => {

    const response =
      await fetch(

        API_BASE_URL,

        {
          method: "POST",

          headers:
            getHeaders(
              token
            ),

          body:
            JSON.stringify(
              payload
            ),
        }
      );

    return handleResponse(
      response
    );
  };

// ======================================================
// ================= UPDATE USER ========================
// ======================================================

export const updateUser =
  async ({

    userId,

    payload,

    token,
  }) => {

    const response =
      await fetch(

        `${API_BASE_URL}/${userId}/role`,

        {
          method: "PATCH",

          headers:
            getHeaders(
              token
            ),

          body:
            JSON.stringify(
              payload
            ),
        }
      );

    return handleResponse(
      response
    );
  };

// ======================================================
// ================= TOGGLE STATUS ======================
// ======================================================

export const toggleUserStatus =
  async ({

    userId,

    token,
  }) => {

    const response =
      await fetch(

        `${API_BASE_URL}/${userId}/status`,

        {
          method: "PATCH",

          headers:
            getHeaders(
              token
            ),
        }
      );

    return handleResponse(
      response
    );
  };

// ======================================================
// ================= DELETE USER ========================
// ======================================================

export const deleteUser =
  async ({

    userId,

    token,
  }) => {

    const response =
      await fetch(

        `${API_BASE_URL}/${userId}`,

        {
          method: "DELETE",

          headers:
            getHeaders(
              token
            ),
        }
      );

    return handleResponse(
      response
    );
  };