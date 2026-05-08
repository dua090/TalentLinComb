// src/pages/Login.jsx

import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  Moon,
  Sun,
} from "lucide-react";

import { TalentLinkLogo } from "../components/TalentLinkLogo";

export default function Login() {

  const { login } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [darkMode, setDarkMode] =
    useState(false);

  // ================= THEME =================

  useEffect(() => {

    const savedTheme =
      localStorage.getItem(
        "theme"
      );

    setDarkMode(
      savedTheme === "dark"
    );

  }, []);

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

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await login(
        form.email,
        form.password
      );

      navigate("/home");

    } catch (err) {

      alert(err.message);
    }
  };

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] dark:bg-gray-950 px-4 transition-colors duration-300">

      {/* THEME TOGGLE */}

      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }
        className="
        absolute top-6 right-6
        w-12 h-12 rounded-2xl
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-700
        shadow-sm
        flex items-center justify-center
        hover:scale-105 transition
      "
      >

        {darkMode
          ? (
            <Sun className="text-yellow-400" />
          )
          : (
            <Moon className="text-gray-700" />
          )}
      </button>

      {/* LOGO */}

      <div className="mb-8">
        <TalentLinkLogo className="w-72" />
      </div>

      {/* LOGIN CARD */}

      <form
        onSubmit={handleSubmit}
        className="
        w-full max-w-md
        bg-white dark:bg-gray-900
        rounded-3xl
        border border-gray-100 dark:border-gray-800
        shadow-xl
        p-8
        transition-colors duration-300
      "
      >

        {/* HEADING */}

        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Sign in to continue to TalentLink
          </p>
        </div>

        {/* EMAIL */}

        <div className="mb-4">

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="
            w-full px-4 py-3 rounded-xl
            border border-gray-200 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800
            text-gray-900 dark:text-white
            outline-none
            focus:border-blue-500
            transition
          "
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
        </div>

        {/* PASSWORD */}

        <div className="mb-6">

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="
            w-full px-4 py-3 rounded-xl
            border border-gray-200 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800
            text-gray-900 dark:text-white
            outline-none
            focus:border-blue-500
            transition
          "
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />
        </div>

        {/* BUTTON */}

        <button
          className="
          w-full bg-blue-600 hover:bg-blue-700
          text-white py-3 rounded-xl
          font-semibold transition shadow-sm
        "
        >
          Login
        </button>

        {/* FOOTER */}

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">

          Don’t have an account?{" "}

          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}