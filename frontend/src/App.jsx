import {

  BrowserRouter,

  Navigate,

  Route,

  Routes,

} from "react-router-dom";

import {

  useEffect,

  useState,

} from "react";

import {
  Menu,
} from "lucide-react";

// ======================================================
// ================= AUTH ===============================
// ======================================================

import {
  useAuth,
} from "./context/AuthContext";

// ======================================================
// ================= COMPONENTS =========================
// ======================================================

import Sidebar from "./components/Sidebar";

import {
  TalentLinkLogo,
} from "./components/TalentLinkLogo";

// ======================================================
// ================= PAGES ==============================
// ======================================================

import Home from "./pages/Home";

import Insights from "./pages/Insights";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import TalentPool from "./pages/TalentPool";

import UploadProfile from "./pages/UploadProfile";

import UserManagement from "./pages/UserManagement";

// ======================================================
// ================= PROTECTED ROUTE ====================
// ======================================================

const ProtectedRoute = ({

  children,

  requiredPermission,
}) => {

  const { user } =
    useAuth();

  // ======================================================
  // ================= NO USER ============================
  // ======================================================

  if (!user) {

    return (

      <Navigate
        to="/"
        replace
      />
    );
  }

  // ======================================================
  // ================= USER PERMISSIONS ==================
  // ======================================================

  const permissions =

    user?.user
      ?.permissions || [];

  // ======================================================
  // ================= PERMISSION CHECK ==================
  // ======================================================

  if (

    requiredPermission &&

    !permissions.includes(
      requiredPermission
    )

  ) {

    return (

      <Navigate
        to="/home"
        replace
      />
    );
  }

  return children;
};

// ======================================================
// ================= APP ================================
// ======================================================

function App() {

  // ======================================================
  // ================= AUTH ===============================
  // ======================================================

  const { user } =
    useAuth();

  // ======================================================
  // ================= SIDEBAR ============================
  // ======================================================

  const [

    isSidebarOpen,

    setIsSidebarOpen,

  ] = useState(true);

  const [

    isMobile,

    setIsMobile,

  ] = useState(false);

  // ======================================================
  // ================= RESPONSIVE =========================
  // ======================================================

  useEffect(() => {

    const handleResize =
      () => {

        const mobile =

          window.innerWidth < 768;

        setIsMobile(
          mobile
        );

        setIsSidebarOpen(
          !mobile
        );
      };

    handleResize();

    window.addEventListener(

      "resize",

      handleResize
    );

    return () => {

      window.removeEventListener(

        "resize",

        handleResize
      );
    };

  }, []);

  // ======================================================
  // ================= MAIN LAYOUT ========================
  // ======================================================

  const mainLayoutClass =

    user && !isMobile

      ? isSidebarOpen
        ? "ml-64"
        : "ml-20"

      : "";

  return (

    <BrowserRouter>

      <div className="flex">

        {/* ====================================================== */}
        {/* ================= SIDEBAR ============================ */}
        {/* ====================================================== */}

        {user && (

          <Sidebar

            isOpen={
              isSidebarOpen
            }

            setIsOpen={
              setIsSidebarOpen
            }
          />
        )}

        {/* ====================================================== */}
        {/* ================= MAIN CONTENT ======================= */}
        {/* ====================================================== */}

        <div
          className={`

            flex-1 min-h-screen

            bg-[#F9FAFB]

            dark:bg-gray-900

            transition-all duration-300

            ${mainLayoutClass}
          `}
        >

          {/* ====================================================== */}
          {/* ================= MOBILE TOPBAR ====================== */}
          {/* ====================================================== */}

          {user && isMobile && (

            <div
              className="
                h-16
                bg-white dark:bg-gray-900
                border-b border-gray-100 dark:border-gray-800
                flex items-center justify-between
                px-4 sticky top-0 z-40
              "
            >

              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    setIsSidebarOpen(
                      true
                    )
                  }
                  className="
                    w-12 h-12 rounded-xl
                    hover:bg-gray-100
                    dark:hover:bg-gray-800
                    flex items-center justify-center
                    transition
                  "
                >

                  <Menu
                    size={22}
                    className="text-gray-700 dark:text-gray-300"
                  />
                </button>

                <TalentLinkLogo className="w-36" />
              </div>
            </div>
          )}

          {/* ====================================================== */}
          {/* ================= ROUTES ============================= */}
          {/* ====================================================== */}

          <Routes>

            {/* ====================================================== */}
            {/* ================= LOGIN ============================== */}
            {/* ====================================================== */}

            <Route
              path="/"
              element={
                user

                  ? (
                    <Navigate
                      to="/home"
                      replace
                    />
                  )

                  : (
                    <Login />
                  )
              }
            />

            {/* ====================================================== */}
            {/* ================= SIGNUP ============================= */}
            {/* ====================================================== */}

            <Route
              path="/signup"
              element={
                user

                  ? (
                    <Navigate
                      to="/home"
                      replace
                    />
                  )

                  : (
                    <Signup />
                  )
              }
            />

            {/* ====================================================== */}
            {/* ================= HOME =============================== */}
            {/* ====================================================== */}

            <Route
              path="/home"
              element={
                <ProtectedRoute
                  requiredPermission="home"
                >

                  <Home />

                </ProtectedRoute>
              }
            />

            {/* ====================================================== */}
            {/* ================= UPLOAD ============================= */}
            {/* ====================================================== */}

            <Route
              path="/upload"
              element={
                <ProtectedRoute
                  requiredPermission="upload_profiles"
                >

                  <UploadProfile />

                </ProtectedRoute>
              }
            />

            {/* ====================================================== */}
            {/* ================= TALENT ============================= */}
            {/* ====================================================== */}

            <Route
              path="/talent"
              element={
                <ProtectedRoute
                  requiredPermission="talent_pool"
                >

                  <TalentPool />

                </ProtectedRoute>
              }
            />

            {/* ====================================================== */}
            {/* ================= INSIGHTS =========================== */}
            {/* ====================================================== */}

            <Route
              path="/insights"
              element={
                <ProtectedRoute
                  requiredPermission="insights"
                >

                  <Insights />

                </ProtectedRoute>
              }
            />

            {/* ====================================================== */}
            {/* ================= USER MANAGEMENT ==================== */}
            {/* ====================================================== */}

            <Route
              path="/users"
              element={
                <ProtectedRoute
                  requiredPermission="user_management"
                >

                  <UserManagement />

                </ProtectedRoute>
              }
            />

            {/* ====================================================== */}
            {/* ================= FALLBACK =========================== */}
            {/* ====================================================== */}

            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;