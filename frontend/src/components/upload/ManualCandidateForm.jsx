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

  const [errors, setErrors] =
    useState({});

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

      const {
        name,
        value,
      } = e.target;

      setFormData({
        ...formData,
        [name]: value,
      });

      // ================= CLEAR FIELD ERROR =================

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    };

  // ================= VALIDATION =================

  const validateForm =
    () => {

      const newErrors = {};

      // ================= NAME =================

      if (
        !formData.name.trim()
      ) {

        newErrors.name =
          "Name is required";
      }

      // ================= EMAIL =================

      if (
        !formData.email.trim()
      ) {

        newErrors.email =
          "Email is required";

      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          formData.email
        )
      ) {

        newErrors.email =
          "Enter valid email address";
      }

      // ================= PHONE =================

      if (
        !formData.phone.trim()
      ) {

        newErrors.phone =
          "Phone number is required";

      } else if (
        !/^\d{10}$/.test(
          formData.phone
        )
      ) {

        newErrors.phone =
          "Phone number must be 10 digits";
      }

      // ================= EXPERIENCE =================

      if (
        formData.experience === ""
      ) {

        newErrors.experience =
          "Experience is required";

      } else if (
        Number(
          formData.experience
        ) < 0
      ) {

        newErrors.experience =
          "Experience cannot be negative";
      }

      // ================= SKILLS =================

      if (
        !formData.skills.trim()
      ) {

        newErrors.skills =
          "At least one skill is required";
      }

      setErrors(newErrors);

      return (
        Object.keys(
          newErrors
        ).length === 0
      );
    };

  // ================= BUTTON VALIDATION =================

  const isFormValid =

    formData.name.trim() &&

    formData.email.trim() &&

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email
    ) &&

    formData.phone.trim() &&

    /^\d{10}$/.test(
      formData.phone
    ) &&

    formData.skills.trim() &&

    formData.experience !== "" &&

    Number(
      formData.experience
    ) >= 0;

  // ================= SUBMIT =================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      // ================= VALIDATE =================

      if (!validateForm()) {

        setMsg(
          "❌ Please fix validation errors"
        );

        return;
      }

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
              )
              .filter(Boolean),

          education:
            formData.education
              ? formData.education
                  .split(",")
                  .map((edu) =>
                    edu.trim()
                  )
                  .filter(Boolean)
              : [],

          projects:
            formData.projects
              ? formData.projects
                  .split(",")
                  .map((project) =>
                    project.trim()
                  )
                  .filter(Boolean)
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

        setErrors({});

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

          {/* ================= NAME ================= */}

          <div>

            <FormInput
              label="Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            {errors.name && (

              <p className="mt-2 text-sm text-red-500">

                {errors.name}

              </p>
            )}
          </div>

          {/* ================= EMAIL ================= */}

          <div>

            <FormInput
              label="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            {errors.email && (

              <p className="mt-2 text-sm text-red-500">

                {errors.email}

              </p>
            )}
          </div>

          {/* ================= PHONE ================= */}

          <div>

            <FormInput
              label="Phone *"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />

            {errors.phone && (

              <p className="mt-2 text-sm text-red-500">

                {errors.phone}

              </p>
            )}
          </div>

          {/* ================= EXPERIENCE ================= */}

          <div>

            <FormInput
              label="Experience *"
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleInputChange}
              required
            />

            {errors.experience && (

              <p className="mt-2 text-sm text-red-500">

                {errors.experience}

              </p>
            )}
          </div>

          {/* ================= SKILLS ================= */}

          <div className="md:col-span-2">

            <FormInput
              label="Skills *"
              name="skills"
              placeholder="React, Node.js, MongoDB"
              value={formData.skills}
              onChange={handleInputChange}
              required
            />

            {errors.skills && (

              <p className="mt-2 text-sm text-red-500">

                {errors.skills}

              </p>
            )}
          </div>

          {/* ================= EDUCATION ================= */}

          <div className="md:col-span-2">

            <FormInput
              label="Education"
              name="education"
              placeholder="B.Tech CSE, MCA"
              value={formData.education}
              onChange={handleInputChange}
            />
          </div>

          {/* ================= PROJECTS ================= */}

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

        {/* ================= FOOTER ================= */}

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

            disabled={
              loading || !isFormValid
            }

            className={`w-full sm:w-auto min-w-[180px] text-white py-3 px-6 rounded-2xl font-medium transition

            ${
              loading || !isFormValid

                ? "bg-blue-400 cursor-not-allowed"

                : "bg-blue-600 hover:bg-blue-700"
            }`}
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