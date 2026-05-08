export const smartSearch =
  async (query) => {

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

          `${import.meta.env.VITE_API_URL}/api/search/smart-search`,

          {
            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              prompt: query,
            }),
          }
        );

      const data =
        await res.json();

      if (!res.ok) {

        throw new Error(
          data.msg ||
          "Search failed"
        );
      }

      return data;

    } catch (err) {

      console.error(
        "SMART SEARCH ERROR:",
        err
      );

      throw err;
    }
  };