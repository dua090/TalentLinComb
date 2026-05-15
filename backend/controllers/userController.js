const bcrypt =
  require("bcryptjs");

const User =
  require("../models/User");

// ======================================================
// ================= DEFAULT PERMISSIONS ================
// ======================================================

const rolePermissions = {

  organization_admin: [

    "home",

    "upload_profiles",

    "talent_pool",

    "insights",

    "user_management",
  ],

  recruiter: [

    "home",

    "upload_profiles",

    "talent_pool",
  ],

  manager: [

    "home",

    "insights",
  ],

  employee: [

    "home",
  ],
};

// ======================================================
// ================= CREATE USER ========================
// ======================================================

exports.createUser =
  async (req, res) => {

    try {

      const {

        name,

        email,

        password,

        role,

        permissions,
      } = req.body;

      // ======================================================
      // ================= VALIDATION =========================
      // ======================================================

      if (

        !name ||

        !email ||

        !password ||

        !role

      ) {

        return res
          .status(400)
          .json({

            success: false,

            msg:
              "All fields are required",
          });
      }

      // ======================================================
      // ================= CHECK USER =========================
      // ======================================================

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res
          .status(400)
          .json({

            success: false,

            msg:
              "User already exists",
          });
      }

      // ======================================================
      // ================= HASH PASSWORD ======================
      // ======================================================

      const hash =
        await bcrypt.hash(
          password,
          10
        );

      // ======================================================
      // ================= PERMISSIONS ========================
      // ======================================================

      const finalPermissions =

        permissions?.length

          ? permissions

          : rolePermissions[
              role
            ] || [];

      // ======================================================
      // ================= CREATE USER ========================
      // ======================================================

      const user =
        await User.create({

          organizationId:
            req.user.organizationId,

          name,

          email,

          password: hash,

          role,

          permissions:
            finalPermissions,

          isActive: true,
        });

      // ======================================================
      // ================= REMOVE PASSWORD ====================
      // ======================================================

      const {
        password: _,
        ...userData
      } = user._doc;

      // ======================================================
      // ================= RESPONSE ===========================
      // ======================================================

      res.status(201).json({

        success: true,

        msg:
          "User created successfully",

        user:
          userData,
      });

    } catch (error) {

      console.error(

        "CREATE USER ERROR:",

        error
      );

      res.status(500).json({

        success: false,

        msg:
          "Server error",
      });
    }
  };

// ======================================================
// ================= GET USERS ==========================
// ======================================================

exports.getOrganizationUsers =
  async (req, res) => {

    try {

      const users =
        await User.find({

          organizationId:
            req.user.organizationId,
        })

        .select("-password")

        .sort({
          createdAt: -1,
        });

      res.status(200).json({

        success: true,

        users,
      });

    } catch (error) {

      console.error(

        "GET USERS ERROR:",

        error
      );

      res.status(500).json({

        success: false,

        msg:
          "Failed to fetch users",
      });
    }
  };

// ======================================================
// ================= UPDATE USER ========================
// ======================================================

exports.updateUserRole =
  async (req, res) => {

    try {

      const {

        name,

        designation,

        department,

        role,

        permissions,
      } = req.body;

      const user =
        await User.findOne({

          _id:
            req.params.id,

          organizationId:
            req.user.organizationId,
        });

      // ======================================================
      // ================= USER NOT FOUND ====================
      // ======================================================

      if (!user) {

        return res
          .status(404)
          .json({

            success: false,

            msg:
              "User not found",
          });
      }

      // ======================================================
      // ================= SELF ROLE PROTECTION ==============
      // ======================================================

      if (

        req.user.id.toString() ===
        user._id.toString()

        &&

        role !==
        "organization_admin"

      ) {

        return res
          .status(400)
          .json({

            success: false,

            msg:
              "You cannot remove your own admin access",
          });
      }

      // ======================================================
      // ================= UPDATE ============================
      // ======================================================

      user.name =
        name || user.name;

      user.designation =
        designation || "";

      user.department =
        department || "";

      user.role =
        role || user.role;

      user.permissions =

        permissions?.length

          ? permissions

          : rolePermissions[
              role
            ] || [];

      await user.save();

      // ======================================================
      // ================= RESPONSE ==========================
      // ======================================================

      res.status(200).json({

        success: true,

        msg:
          "User updated successfully",

        user,
      });

    } catch (error) {

      console.error(

        "UPDATE USER ERROR:",

        error
      );

      res.status(500).json({

        success: false,

        msg:
          "User update failed",
      });
    }
  };

// ======================================================
// ================= TOGGLE STATUS ======================
// ======================================================

exports.toggleUserStatus =
  async (req, res) => {

    try {

      const user =
        await User.findOne({

          _id:
            req.params.id,

          organizationId:
            req.user.organizationId,
        });

      // ======================================================
      // ================= USER NOT FOUND ====================
      // ======================================================

      if (!user) {

        return res
          .status(404)
          .json({

            success: false,

            msg:
              "User not found",
          });
      }

      // ======================================================
      // ================= SELF DEACTIVATE BLOCK =============
      // ======================================================

      if (

        req.user.id.toString() ===
        user._id.toString()

      ) {

        return res
          .status(400)
          .json({

            success: false,

            msg:
              "You cannot deactivate your own account",
          });
      }

      // ======================================================
      // ================= TOGGLE ============================
      // ======================================================

      user.isActive =
        !user.isActive;

      await user.save();

      // ======================================================
      // ================= RESPONSE ==========================
      // ======================================================

      res.status(200).json({

        success: true,

        msg:
          "User status updated",

        user,
      });

    } catch (error) {

      console.error(

        "STATUS UPDATE ERROR:",

        error
      );

      res.status(500).json({

        success: false,

        msg:
          "Status update failed",
      });
    }
  };

// ======================================================
// ================= DELETE USER ========================
// ======================================================

exports.deleteUser =
  async (req, res) => {

    try {

      const user =
        await User.findOne({

          _id:
            req.params.id,

          organizationId:
            req.user.organizationId,
        });

      // ======================================================
      // ================= USER NOT FOUND ====================
      // ======================================================

      if (!user) {

        return res
          .status(404)
          .json({

            success: false,

            msg:
              "User not found",
          });
      }

      // ======================================================
      // ================= SELF DELETE BLOCK =================
      // ======================================================

      if (

        req.user.id.toString() ===
        user._id.toString()

      ) {

        return res
          .status(400)
          .json({

            success: false,

            msg:
              "You cannot delete your own account",
          });
      }

      // ======================================================
      // ================= DELETE ============================
      // ======================================================

      await user.deleteOne();

      // ======================================================
      // ================= RESPONSE ==========================
      // ======================================================

      res.status(200).json({

        success: true,

        msg:
          "User deleted successfully",
      });

    } catch (error) {

      console.error(

        "DELETE USER ERROR:",

        error
      );

      res.status(500).json({

        success: false,

        msg:
          "Delete failed",
      });
    }
  };