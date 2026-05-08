import {
  useRef,
  useState,
} from "react";

import {
  uploadResume,
} from "../../services/candidateService";

const UploadResumeCard = ({
  loading,
  setLoading,
}) => {

  const [file, setFile] =
    useState(null);

  const [msg, setMsg] =
    useState("");

  const [dragActive, setDragActive] =
    useState(false);

  const fileInputRef =
    useRef(null);

  const storedUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const token =
    storedUser?.token;

  // ================= FILE CHANGE =================

  const handleFileChange =
    (e) => {

      const selectedFile =
        e.target.files[0];

      if (!selectedFile) return;

      setFile(selectedFile);

      setMsg("");
    };

  // ================= DRAG =================

  const handleDragOver =
    (e) => {

      if (loading) return;

      e.preventDefault();

      setDragActive(true);
    };

  const handleDragLeave =
    () => {

      if (loading) return;

      setDragActive(false);
    };

  const handleDrop =
    (e) => {

      if (loading) return;

      e.preventDefault();

      setDragActive(false);

      const droppedFile =
        e.dataTransfer.files[0];

      if (!droppedFile) return;

      setFile(droppedFile);

      setMsg("");
    };

  // ================= UPLOAD =================

  const handleUpload =
    async (e) => {

      e.preventDefault();

      if (!file) {

        setMsg(
          "Please select a resume"
        );

        return;
      }

      try {

        setLoading(true);

        setMsg("");

        await uploadResume({
          file,
          token,
        });

        setMsg(
          "✅ Resume uploaded successfully"
        );

        setFile(null);

        if (
          fileInputRef.current
        ) {

          fileInputRef.current.value =
            "";
        }

      } catch (err) {

        setMsg(
          "❌ " + err.message
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm overflow-hidden">

      <form
        onSubmit={handleUpload}
      >

        <div className="p-6 sm:p-8">

          <label
            role="button"

            onDragOver={
              handleDragOver
            }

            onDragLeave={
              handleDragLeave
            }

            onDrop={handleDrop}

            className={`w-full min-h-[300px] border-2 border-dashed rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer transition
            
            ${
              dragActive

                ? "border-blue-500 bg-blue-50/40 dark:bg-blue-900/20"

                : "border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
            }`}
          >

            <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6">

              <svg
                className="w-10 h-10 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Upload Resume
            </h3>

            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Drag & drop your resume or click to browse
            </p>

            <div className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 break-all">

              {file
                ? file.name
                : "No file selected"}

            </div>

            <p className="text-xs text-gray-400 mt-4">
              Supported: PDF / DOCX
            </p>

            <input
              ref={
                fileInputRef
              }
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={
                handleFileChange
              }
              className="hidden"
            />
          </label>
        </div>

        {/* FOOTER */}

        <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="text-sm">

            {msg ? (

              <span
                className={`${
                  msg.includes("✅")

                    ? "text-green-600"

                    : "text-red-600"
                }`}
              >
                {msg}
              </span>

            ) : (

              <span className="text-gray-500 dark:text-gray-400">
                AI-powered resume parsing enabled
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={
              loading || !file
            }
            className="w-full sm:w-auto min-w-[180px] bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-2xl font-medium transition"
          >

            {loading
              ? "Uploading..."
              : "Upload Resume"}

          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadResumeCard;