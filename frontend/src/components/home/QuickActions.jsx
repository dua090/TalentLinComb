// src/components/home/QuickActions.jsx

import {
  Upload,
  Users,
  BarChart3,
  UserPlus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

// ================= ACTIONS =================

const actions = [
  {
    title: "Upload Profile",

    desc: "Upload and parse candidate resumes",

    icon: <Upload size={22} />,

    path: "/upload",

    bg: "bg-blue-50 dark:bg-blue-900/30",

    iconColor:
      "text-blue-600 dark:text-blue-400",
  },

  {
    title: "Talent Pool",

    desc: "Browse all candidate profiles",

    icon: <Users size={22} />,

    path: "/talent",

    bg: "bg-indigo-50 dark:bg-indigo-900/30",

    iconColor:
      "text-indigo-600 dark:text-indigo-400",
  },

  {
    title: "Insights",

    desc: "View hiring analytics",

    icon: <BarChart3 size={22} />,

    path: "/insights",

    bg: "bg-purple-50 dark:bg-purple-900/30",

    iconColor:
      "text-purple-600 dark:text-purple-400",
  },

  {
    title: "Add Candidate",

    desc: "Manually create candidate profile",

    icon: <UserPlus size={22} />,

    path: "/manual-candidate",

    bg: "bg-orange-50 dark:bg-orange-900/30",

    iconColor:
      "text-orange-600 dark:text-orange-400",
  },
];

const QuickActions = () => {

  const navigate = useNavigate();

  return (
    <div>

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Quick Actions
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Navigate through recruiter workflows
          </p>

        </div>
      </div>

      {/* ================= ACTION CARDS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {actions.map((action) => (

          <button
            key={action.title}

            onClick={() =>
              navigate(action.path)
            }

            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-5 text-left hover:shadow-md transition"
          >

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${action.bg}`}
            >

              <div className={action.iconColor}>
                {action.icon}
              </div>

            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {action.title}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {action.desc}
            </p>

          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;