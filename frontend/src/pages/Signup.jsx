// src/pages/Signup.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  Moon,
  Sun,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import { TalentLinkLogo } from "../components/TalentLinkLogo";

export default function Signup() {

  const { signup } = useAuth();

  const navigate = useNavigate();

  const [darkMode, setDarkMode] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] =
    useState({});

  const [loading, setLoading] =
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

  // ================= VALIDATION =================

  const validateForm = () => {

    const newErrors = {};

    if (!form.name.trim()) {

      newErrors.name =
        "Full name is required";
    }

    else if (
      form.name.trim().length < 3
    ) {

      newErrors.name =
        "Name must be at least 3 characters";
    }

    if (!form.email.trim()) {

      newErrors.email =
        "Email is required";
    }

    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        form.email
      )
    ) {

      newErrors.email =
        "Invalid email address";
    }

    if (!form.password.trim()) {

      newErrors.password =
        "Password is required";
    }

    else if (
      form.password.length < 6
    ) {

      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    try {

      setLoading(true);

      await signup(
        form.name,
        form.email,
        form.password
      );

      alert("Signup successful");

      navigate("/");

    } catch (err) {

      alert(
        err.message ||
        "Signup failed"
      );

    } finally {

      setLoading(false);
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

      {/* CARD */}

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

        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Join TalentLink and discover top talent
          </p>
        </div>

        {/* NAME */}

        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="
            w-full px-4 py-3 rounded-xl
            border border-gray-200 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800
            text-gray-900 dark:text-white
            outline-none
            focus:border-blue-500
            transition
          "
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-2">
              {errors.name}
            </p>
          )}
        </div>

        {/* EMAIL */}

        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="
            w-full px-4 py-3 rounded-xl
            border border-gray-200 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800
            text-gray-900 dark:text-white
            outline-none
            focus:border-blue-500
            transition
          "
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-2">
              {errors.email}
            </p>
          )}
        </div>

        {/* PASSWORD */}

        <div className="mb-6">

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="
            w-full px-4 py-3 rounded-xl
            border border-gray-200 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800
            text-gray-900 dark:text-white
            outline-none
            focus:border-blue-500
            transition
          "
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password}
            </p>
          )}
        </div>

        {/* BUTTON */}

        <button
          disabled={loading}
          className="
          w-full bg-blue-600 hover:bg-blue-700
          disabled:bg-blue-300
          text-white py-3 rounded-xl
          font-semibold transition shadow-sm
        "
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

        {/* FOOTER */}

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}