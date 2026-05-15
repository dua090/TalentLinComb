import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

// ======================================================
// ================= CONTEXT ============================
// ======================================================

const AuthContext =
  createContext();

// ======================================================
// ================= HOOK ===============================
// ======================================================

export const useAuth =
  () =>
    useContext(
      AuthContext
    );

// ======================================================
// ================= PROVIDER ===========================
// ======================================================

export const AuthProvider =
  ({ children }) => {

    // ======================================================
    // ================= USER ===============================
    // ======================================================

    const [user, setUser] =
      useState(null);

    // ======================================================
    // ================= LOAD USER ==========================
    // ======================================================

    useEffect(() => {

      try {

        const storedUser =
          localStorage.getItem(
            "user"
          );

        if (storedUser) {

          const parsedUser =
            JSON.parse(
              storedUser
            );

          setUser(
            parsedUser
          );
        }

      } catch (error) {

        console.error(

          "AUTH LOAD ERROR:",

          error
        );

        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "token"
        );
      }

    }, []);

    // ======================================================
    // ================= SAVE SESSION =======================
    // ======================================================

    const saveSession =
      (data) => {

        setUser(data);

        localStorage.setItem(

          "user",

          JSON.stringify(
            data
          )
        );

        localStorage.setItem(

          "token",

          data.token
        );
      };

    // ======================================================
    // ================= LOGIN ==============================
    // ======================================================

    const login =
      async ({
        email,
        password,
      }) => {

        const res =
          await fetch(

            "http://localhost:5000/api/auth/login",

            {
              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({

                  email,

                  password,
                }),
            }
          );

        const data =
          await res.json();

        // ======================================================
        // ================= ERROR ==============================
        // ======================================================

        if (!res.ok) {

          throw new Error(

            data.message ||

            "Login failed"
          );
        }

        // ======================================================
        // ================= SAVE ===============================
        // ======================================================

        saveSession(
          data
        );

        return data;
      };

    // ======================================================
    // ================= SIGNUP =============================
    // ======================================================

    const signup =
      async ({
        name,
        email,
        companyName,
        password,
      }) => {

        const res =
          await fetch(

            "http://localhost:5000/api/auth/register",

            {
              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({

                  name,

                  email,

                  companyName,

                  password,
                }),
            }
          );

        const data =
          await res.json();

        // ======================================================
        // ================= ERROR ==============================
        // ======================================================

        if (!res.ok) {

          throw new Error(

            data.message ||

            "Signup failed"
          );
        }

        // ======================================================
        // ================= AUTO LOGIN =========================
        // ======================================================

        saveSession(
          data
        );

        return data;
      };

    // ======================================================
    // ================= REFRESH USER =======================
    // ======================================================

    const refreshUser =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) {
            return;
          }

          const response =
            await fetch(

              "http://localhost:5000/api/auth/me",

              {

                headers: {

                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await response.json();

          if (
            response.ok
          ) {

            saveSession({

              token,

              user:
                data.user,
            });
          }

        } catch (error) {

          console.error(

            "REFRESH USER ERROR:",

            error
          );
        }
      };

    // ======================================================
    // ================= LOGOUT =============================
    // ======================================================

    const logout =
      () => {

        setUser(null);

        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "token"
        );
      };

    // ======================================================
    // ================= CONTEXT VALUE ======================
    // ======================================================

    return (

      <AuthContext.Provider
        value={{

          user,

          setUser,

          login,

          signup,

          logout,

          refreshUser,
        }}
      >

        {children}

      </AuthContext.Provider>
    );
  };