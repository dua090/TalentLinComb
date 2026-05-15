const router =
  require("express").Router();

// ======================================================
// ================= MIDDLEWARE =========================
// ======================================================

const auth =
  require(
    "../middleware/authMiddleware"
  );

const allowPermissions =
  require(
    "../middleware/permissionMiddleware"
  );

// ======================================================
// ================= CONTROLLERS ========================
// ======================================================

const {

  createUser,

  getOrganizationUsers,

  updateUserRole,

  toggleUserStatus,

  deleteUser,

} = require(
  "../controllers/userController"
);

// ======================================================
// ================= CREATE USER ========================
// ======================================================

router.post(

  "/",

  auth,

  allowPermissions(
    "user_management"
  ),

  createUser
);

// ======================================================
// ================= GET USERS ==========================
// ======================================================

router.get(

  "/",

  auth,

  allowPermissions(
    "user_management"
  ),

  getOrganizationUsers
);

// ======================================================
// ================= UPDATE ROLE ========================
// ======================================================

router.patch(

  "/:id/role",

  auth,

  allowPermissions(
    "user_management"
  ),

  updateUserRole
);

// ======================================================
// ================= TOGGLE STATUS ======================
// ======================================================

router.patch(

  "/:id/status",

  auth,

  allowPermissions(
    "user_management"
  ),

  toggleUserStatus
);

// ======================================================
// ================= DELETE USER ========================
// ======================================================

router.delete(

  "/:id",

  auth,

  allowPermissions(
    "user_management"
  ),

  deleteUser
);

// ======================================================
// ================= EXPORT =============================
// ======================================================

module.exports =
  router;