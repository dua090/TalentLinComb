import { useState } from "react";

import FormInput from "./FormInput";

import { createManualCandidate } from "../../services/candidateService";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
const ManualCandidateForm = ({ loading, setLoading }) => {
  const [msg, setMsg] = useState("");

  const [errors, setErrors] = useState({});

  // ================= COLLAPSE STATES =================

  const [showSkills, setShowSkills] = useState(true);

  const [showEducation, setShowEducation] = useState(false);

  const [showProjects, setShowProjects] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: [""],
    experience: "",
    education: [""],
    projects: [""],
  });

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const token = storedUser?.token;

  // ================= INPUT CHANGE =================

  const handleInputChange = (e, index = null, field = null) => {
    const { name, value } = e.target;

    // ================= PHONE =================

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");

      setFormData({
        ...formData,
        [name]: numericValue,
      });

      return;
    }

    // ================= ARRAY FIELDS =================

    if (field) {
      const updatedArray = [...formData[field]];

      updatedArray[index] = value;

      setFormData({
        ...formData,
        [field]: updatedArray,
      });

      return;
    }

    // ================= DEFAULT INPUT =================

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ================= ADD FIELD =================

  const addField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  // ================= REMOVE FIELD =================

  const removeField = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);

    setFormData({
      ...formData,
      [field]: updatedArray.length > 0 ? updatedArray : [""],
    });
  };

  // ================= VALIDATION =================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (formData.experience === "") {
      newErrors.experience = "Experience required";
    } else if (Number(formData.experience) < 0) {
      newErrors.experience = "Cannot be negative";
    }

    if (formData.skills.filter((skill) => skill.trim()).length === 0) {
      newErrors.skills = "At least one skill required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ================= BUTTON VALIDATION =================

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.phone.trim() &&
    formData.skills.filter((skill) => skill.trim()).length > 0 &&
    formData.experience !== "" &&
    Number(formData.experience) >= 0;

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMsg("❌ Fix validation errors");

      return;
    }

    try {
      setLoading(true);

      setMsg("");

      const payload = {
        ...formData,

        source: "manual",

        experience: Number(formData.experience),

        skills: formData.skills.filter(Boolean),

        education: formData.education.filter(Boolean),

        projects: formData.projects.filter(Boolean),
      };

      await createManualCandidate({
        payload,
        token,
      });

      setMsg("✅ Candidate added successfully");

      setFormData({
        name: "",
        email: "",
        phone: "",
        skills: [""],
        experience: "",
        education: [""],
        projects: [""],
      });

      setErrors({});
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= SECTION UI =================

  const renderSection = (
    title,
    field,
    showState,
    setShowState,
    placeholder,
  ) => (
    <div className="md:col-span-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 transition">
      {/* HEADER */}

      <div
        onClick={() => setShowState(!showState)}
        className="flex items-center justify-between mb-3 cursor-pointer select-none rounded-xl px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        {/* LEFT SIDE */}

        <div className="flex items-center gap-3">
          {/* TOGGLE ICON */}

          <span className="text-gray-700 dark:text-gray-300 transition">
            {showState ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
          </span>

          {/* TITLE */}

          <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
            {title}
          </h3>
        </div>

        {/* ADD BUTTON */}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();

            addField(field);

            setShowState(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm transition flex items-center gap-2"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {/* BODY */}

      {showState && (
        <div className="space-y-3">
          {formData[field].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1">
                <FormInput
                  name={field}
                  value={item}
                  placeholder={placeholder}
                  onChange={(e) => handleInputChange(e, index, field)}
                />
              </div>

              {/* REMOVE BUTTON */}

              <button
                type="button"
                onClick={() => removeField(field, index)}
                className="shrink-0 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white w-11 h-11 rounded-xl flex items-center justify-center transition"
              >
                <X size={18} />
              </button>
            </div>
          ))}

          {field === "skills" && errors.skills && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.skills}
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm overflow-hidden">
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NAME */}

          <div>
            <FormInput
              label="Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}

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
              <p className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* PHONE */}

          <div>
            <FormInput
              label="Phone *"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />

            {errors.phone && (
              <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* EXPERIENCE */}

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
              <p className="mt-2 text-sm text-red-500">{errors.experience}</p>
            )}
          </div>

          {/* SKILLS */}

          {renderSection(
            "Skills *",
            "skills",
            showSkills,
            setShowSkills,
            "React",
          )}

          {/* EDUCATION */}

          {renderSection(
            "Education",
            "education",
            showEducation,
            setShowEducation,
            "B.Tech CSE",
          )}

          {/* PROJECTS */}

          {renderSection(
            "Projects",
            "projects",
            showProjects,
            setShowProjects,
            "AI Resume Parser",
          )}
        </div>

        {/* FOOTER */}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            {msg ? (
              <span
                className={`${
                  msg.includes("✅") ? "text-green-600" : "text-red-600"
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
            disabled={loading || !isFormValid}
            className={`w-full sm:w-auto min-w-[180px] text-white py-3 px-6 rounded-2xl font-medium transition

            ${
              loading || !isFormValid
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Add Candidate"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualCandidateForm;