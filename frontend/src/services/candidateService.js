export const uploadResume = async ({
  file,
  token,
}) => {

  const formData =
    new FormData();

  formData.append(
    "resume",
    file
  );

  const res =
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/candidates/upload`,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },

        body: formData,
      }
    );

  const data =
    await res.json();

  if (!res.ok) {

    throw new Error(
      data.msg ||
      "Resume upload failed"
    );
  }

  return data;
};

export const createManualCandidate =
  async ({
    payload,
    token,
  }) => {

    const res =
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/candidates/manual`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

    const data =
      await res.json();

    if (!res.ok) {

      throw new Error(
        data.msg ||
        "Failed to create candidate"
      );
    }

    return data;
  };