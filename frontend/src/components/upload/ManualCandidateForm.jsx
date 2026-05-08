import {
  useState,
} from "react";

import FormInput from "./FormInput";

import {
  createManualCandidate,
} from "../../services/candidateService";

const ManualCandidateForm = ({
  loading,
  setLoading,
}) => {

  const [msg, setMsg] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      skills: "",
      experience: "",
      education: "",
      projects: "",
    });

  const storedUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const token =
    storedUser?.token;

  // ================= INPUT CHANGE =================

  const handleInputChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  // ================= SUBMIT =================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setMsg("");

        const payload = {

          ...formData,

          source: "manual",

          experience:
            Number(
              formData.experience
            ),

          skills:
            formData.skills
              .split(",")
              .map((skill) =>
                skill.trim()
              ),

          education:
            formData.education
              ? formData.education
                  .split(",")
                  .map((edu) =>
                    edu.trim()
                  )
              : [],

          projects:
            formData.projects
              ? formData.projects
                  .split(",")
                  .map((project) =>
                    project.trim()
                  )
              : [],
        };

        await createManualCandidate({
          payload,
          token,
        });

        setMsg(
          "✅ Candidate added successfully"
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          skills: "",
          experience: "",
          education: "",
          projects: "",
        });

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
        onSubmit={handleSubmit}
        className="p-6 sm:p-8"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <FormInput
            label="Name *"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <FormInput
            label="Email *"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <FormInput
            label="Phone *"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />

          <FormInput
            label="Experience *"
            name="experience"
            type="number"
            value={formData.experience}
            onChange={handleInputChange}
            required
          />

          <div className="md:col-span-2">

            <FormInput
              label="Skills *"
              name="skills"
              placeholder="React, Node.js, MongoDB"
              value={formData.skills}
              onChange={handleInputChange}
              required
            />

          </div>

          <div className="md:col-span-2">

            <FormInput
              label="Education"
              name="education"
              placeholder="B.Tech CSE, MCA"
              value={formData.education}
              onChange={handleInputChange}
            />

          </div>

          <div className="md:col-span-2">

            <FormInput
              label="Projects"
              name="projects"
              placeholder="AI Resume Parser, Smart Diet System"
              value={formData.projects}
              onChange={handleInputChange}
            />

          </div>
        </div>

        {/* FOOTER */}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">

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
                Manual candidate entry enabled
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto min-w-[180px] bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-2xl font-medium transition"
          >

            {loading
              ? "Saving..."
              : "Add Candidate"}

          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualCandidateForm;