import {
  useState,
} from "react";

import {
  Sparkles,
  UserPlus,
} from "lucide-react";

import useDarkMode from "../hooks/useDarkMode";

import UploadResumeCard from "../components/upload/UploadResumeCard";

import ManualCandidateForm from "../components/upload/ManualCandidateForm";

export default function UploadProfile() {

  // ================= DARK MODE =================

  useDarkMode();

  // ================= STATES =================

  const [mode, setMode] =
    useState("upload");

  const [loading, setLoading] =
    useState(false);

  return (

    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 p-4 sm:p-6 lg:p-8 relative">

      {/* ================= LOADING ================= */}

      {loading && (

        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">

          <div className="bg-white dark:bg-gray-800 rounded-2xl px-8 py-6 flex flex-col items-center gap-4 shadow-xl">

            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            <p className="text-gray-800 dark:text-white font-medium">
              Processing candidate profile...
            </p>
          </div>
        </div>
      )}

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">

          Talent Intake

        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl leading-relaxed">

          Import candidate profiles using AI-powered resume parsing
          or create recruiter-managed profiles through manual entry.

        </p>
      </div>

      {/* ================= TOGGLE ================= */}

      <div className="max-w-4xl mb-6">

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 w-full sm:w-fit shadow-sm">

          {/* AI RESUME */}

          <button
            onClick={() =>
              setMode("upload")
            }
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium transition
            
            ${
              mode === "upload"

                ? "bg-blue-600 text-white shadow-sm"

                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >

            <Sparkles size={18} />

            AI Resume Parsing

          </button>

          {/* MANUAL */}

          <button
            onClick={() =>
              setMode("manual")
            }
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium transition
            
            ${
              mode === "manual"

                ? "bg-blue-600 text-white shadow-sm"

                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >

            <UserPlus size={18} />

            Manual Profile Entry

          </button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="max-w-4xl">

        {mode === "upload" ? (

          <UploadResumeCard
            loading={loading}
            setLoading={setLoading}
          />

        ) : (

          <ManualCandidateForm
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </div>
    </div>
  );
}