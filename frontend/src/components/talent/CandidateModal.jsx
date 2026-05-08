const CandidateModal = ({
  selectedCandidate,
  setSelectedCandidate,
  darkMode,
}) => {

  if (!selectedCandidate) {
    return null;
  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/50 backdrop-blur-sm p-4">

      <div className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">

        <div className="p-8 max-h-[90vh] overflow-y-auto">

          {/* ================= HEADER ================= */}

          <div className="flex justify-between items-start mb-8">

            <div className="flex items-center gap-5">

              <img
                src={`https://ui-avatars.com/api/?name=${selectedCandidate.name}&background=${
                  darkMode
                    ? "1F2937"
                    : "EFF6FF"
                }&color=${
                  darkMode
                    ? "60A5FA"
                    : "2563EB"
                }&bold=true`}
                alt={selectedCandidate.name}
                className="w-20 h-20 rounded-3xl border border-blue-100 dark:border-blue-900/30 shadow-sm"
              />

              <div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedCandidate.name}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {selectedCandidate.experience || 0}+ Years Experience
                </p>
              </div>
            </div>

            {/* CLOSE BUTTON */}

            <button
              onClick={() =>
                setSelectedCandidate(null)
              }
              className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl leading-none"
            >
              ×
            </button>
          </div>

          {/* ================= SKILLS ================= */}

          <div className="mb-8">

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Skills
            </h3>

            <div className="flex flex-wrap gap-3">

              {selectedCandidate.skills?.map(
                (skill, i) => (

                  <span
                    key={i}
                    className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium rounded-xl border border-blue-100 dark:border-blue-800"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* ================= PROJECTS ================= */}

          <div className="mb-8">

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {selectedCandidate.projects?.map(
                (project, i) => (

                  <div
                    key={i}
                    className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-gray-50 dark:bg-gray-900/50"
                  >

                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {project}
                    </h4>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ================= EDUCATION ================= */}

          <div className="mb-8">

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Education
            </h3>

            <div className="space-y-2">

              {selectedCandidate.education?.map(
                (edu, i) => (

                  <p
                    key={i}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    🎓 {edu}
                  </p>
                )
              )}
            </div>
          </div>

          {/* ================= CONTACT ================= */}

          <div className="mb-8">

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Contact Information
            </h3>

            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">

              <div className="flex items-center gap-2">
                <span>📧</span>

                <span>
                  {selectedCandidate.email}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>📞</span>

                <span>
                  {selectedCandidate.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}

        <div className="border-t border-gray-100 dark:border-gray-700 px-8 py-5 flex justify-end gap-4 bg-white dark:bg-gray-800">

          <a
            href={`${import.meta.env.VITE_API_URL}/${selectedCandidate.resumeUrl}`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            View Resume
          </a>

          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;