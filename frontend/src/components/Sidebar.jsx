import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  Home,
  Upload,
  Users,
  BarChart3,
  Sun,
  Moon,
  Menu,
  PanelLeftClose,
  LogOut,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import { TalentLinkLogo } from "../components/TalentLinkLogo";

const navItems = [
  {
    label: "Home",
    path: "/home",
    icon: Home,
  },
  {
    label: "Upload Profiles",
    path: "/upload",
    icon: Upload,
  },
  {
    label: "Talent Pool",
    path: "/talent",
    icon: Users,
  },
  {
    label: "Insights",
    path: "/insights",
    icon: BarChart3,
  },
];

export default function Sidebar({
  isOpen,
  setIsOpen,
}) {

  const { logout } =
    useAuth();

  const location =
    useLocation();

  const [user, setUser] =
    useState(null);

  const [darkMode, setDarkMode] =
    useState(false);

  // ================= USER & THEME =================

  useEffect(() => {

    try {

      const storedUser =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        );

      if (
        storedUser?.user
      ) {
        setUser(
          storedUser.user
        );
      }

      const savedTheme =
        localStorage.getItem(
          "theme"
        );

      setDarkMode(
        savedTheme === "dark"
      );

    } catch (err) {

      console.error(
        "Sidebar initialization failed:",
        err
      );
    }

  }, []);

  // ================= APPLY THEME =================

  useEffect(() => {

    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );

    localStorage.setItem(
      "theme",
      darkMode
        ? "dark"
        : "light"
    );

  }, [darkMode]);

  // ================= BODY SCROLL =================

  useEffect(() => {

    const isMobile =
      window.innerWidth < 768;

    document.body.style.overflow =
      isOpen && isMobile
        ? "hidden"
        : "auto";

    return () => {
      document.body.style.overflow =
        "auto";
    };

  }, [isOpen]);

  // ================= AUTO CLOSE MOBILE =================

  useEffect(() => {

    if (
      window.innerWidth < 768
    ) {
      setIsOpen(false);
    }

  }, [location.pathname]);

  // ================= HELPERS =================

  const handleMobileClose =
    () => {

      if (
        window.innerWidth < 768
      ) {
        setIsOpen(false);
      }
    };

  const getNavClass =
    (path) => `

      group relative flex items-center

      ${
        isOpen
          ? "gap-3 px-4"
          : "justify-center"
      }

      py-3 rounded-2xl cursor-pointer
      transition-all duration-300

      ${
        location.pathname ===
        path

          ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-semibold"

          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
      }
    `;

  // ================= TOOLTIP =================

  const Tooltip = ({
    text,
  }) => (

    <div
      className="
      absolute left-16
      opacity-0 group-hover:opacity-100
      pointer-events-none
      bg-gray-900 dark:bg-gray-700
      text-white text-xs
      px-3 py-2 rounded-xl
      whitespace-nowrap
      transition-all duration-200
      shadow-lg z-50
    "
    >
      {text}
    </div>
  );

  return (

    <>
      {/* MOBILE OVERLAY */}

      {isOpen && (

        <div
          onClick={() =>
            setIsOpen(false)
          }
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}

      <div
        className={`
        fixed top-0 left-0 h-screen
        flex flex-col justify-between
        bg-white dark:bg-gray-900
        border-r border-gray-100 dark:border-gray-800
        transition-all duration-300 z-50
        md:shadow-sm shadow-2xl

        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }

        ${
          isOpen
            ? "w-64"
            : "md:w-20 w-64"
        }
      `}
      >

        {/* TOP SECTION */}

        <div>

          {/* HEADER */}

          <div
            className={`
            h-24 border-b border-gray-100 dark:border-gray-800 flex items-center
            ${
              isOpen
                ? "justify-between px-5"
                : "justify-center"
            }
          `}
          >

            {/* LOGO */}

            <Link
              to="/home"
              onClick={
                handleMobileClose
              }
            >

              {isOpen ? (

                <TalentLinkLogo className="w-52" />

              ) : (

                <div className="w-11 h-11 flex items-center justify-center">

                  <img
                    src="/talentlink-icon.svg"
                    alt="TalentLink"
                    className="w-10 h-10"
                  />
                </div>
              )}
            </Link>

            {/* CONTROLS */}

            {isOpen ? (

              <>
                <button
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="md:hidden w-12 h-12 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
                >
                  <X className="text-gray-700 dark:text-gray-300" />
                </button>

                <button
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="hidden md:flex w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 items-center justify-center"
                >
                  <PanelLeftClose className="text-gray-600 dark:text-gray-300" />
                </button>
              </>

            ) : (

              <button
                onClick={() =>
                  setIsOpen(true)
                }
                className="
                hidden md:flex
                absolute top-7 right-[-18px]
                w-10 h-10 rounded-full
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                shadow-sm hover:shadow-md
                items-center justify-center
              "
              >
                <Menu className="text-gray-600 dark:text-gray-300" />
              </button>
            )}
          </div>

          {/* NAVIGATION */}

          <div className="px-3 py-6">

            <ul className="space-y-2">

              {navItems.map(
                ({
                  label,
                  path,
                  icon: Icon,
                }) => (

                  <Link
                    key={path}
                    to={path}
                    onClick={
                      handleMobileClose
                    }
                  >

                    <li
                      className={getNavClass(
                        path
                      )}
                    >

                      <Icon size={20} />

                      {isOpen ? (

                        <span>
                          {label}
                        </span>

                      ) : (

                        <Tooltip
                          text={label}
                        />
                      )}
                    </li>
                  </Link>
                )
              )}
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION */}

        <div className="p-4 border-t border-gray-100 dark:border-gray-800">

          {/* THEME TOGGLE */}

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            className={`
            mb-4 flex items-center
            ${
              isOpen
                ? "gap-3 w-full px-4"
                : "justify-center"
            }
            py-3 rounded-2xl
            text-gray-600 dark:text-gray-300
            hover:bg-gray-100 dark:hover:bg-gray-800
          `}
          >

            {darkMode
              ? <Sun />
              : <Moon />}

            {isOpen && (

              <span className="text-sm font-medium">

                {darkMode
                  ? "Light Mode"
                  : "Dark Mode"}

              </span>
            )}
          </button>

          {/* USER */}

          <div
            className={`
            flex items-center
            ${
              isOpen
                ? "gap-3 px-2"
                : "justify-center"
            }
            mb-5
          `}
          >

            <img
              src={`https://ui-avatars.com/api/?name=${user?.name || "User"}`}
              alt="User"
              className="w-11 h-11 rounded-2xl border border-blue-100"
            />

            {isOpen && (

              <div>

                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.name || "User"}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || "user@email.com"}
                </p>
              </div>
            )}
          </div>

          {/* LOGOUT */}

          <button
            onClick={logout}
            className={`
            w-full flex items-center
            ${
              isOpen
                ? "gap-3 px-4"
                : "justify-center"
            }
            py-3 rounded-2xl
            border border-gray-200 dark:border-gray-700
            text-gray-700 dark:text-gray-300
            hover:border-red-200
            hover:bg-red-50
            dark:hover:bg-red-900/20
            hover:text-red-600
          `}
          >

            <LogOut size={18} />

            {isOpen && (
              <span>
                Logout
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}