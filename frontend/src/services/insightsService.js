export const fetchCandidates =
  async () => {

    try {

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
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await res.json();

      return Array.isArray(data)
        ? data
        : [];

    } catch (err) {

      console.error(err);

      return [];
    }
  };