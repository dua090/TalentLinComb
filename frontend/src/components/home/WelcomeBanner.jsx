import {
  Sparkles,
} from "lucide-react";

const WelcomeBanner = () => {

  // ================= USER =================

  const storedUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const user =
    storedUser?.user;

  // ================= GREETING =================

  const hour =
    new Date().getHours();

  let greeting =
    "Welcome";

  if (hour < 12) {

    greeting =
      "Good Morning";

  } else if (hour < 18) {

    greeting =
      "Good Afternoon";

  } else {

    greeting =
      "Good Evening";
  }

  return (

    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-sm">

      {/* BACKGROUND */}

      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

      {/* CONTENT */}

      <div className="relative z-10">

        {/* TAG */}

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-5">

          <Sparkles size={16} />

          AI Talent Intelligence

        </div>

        {/* TITLE */}

        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">

          {greeting},{" "}

          <span className="text-blue-100">

            {user?.name || "Recruiter"}

          </span>

          {" "}👋

        </h1>

        {/* DESCRIPTION */}

        <p className="max-w-2xl text-blue-100 leading-relaxed text-base sm:text-lg">

          Ready to discover top talent today?
          Track candidates, analyze hiring insights,
          and accelerate recruitment using AI-powered workflows.

        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;