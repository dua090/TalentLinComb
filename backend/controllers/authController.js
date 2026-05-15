const User =
  require("../models/User");

const Organization =
  require(
    "../models/Organization"
  );

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

// ======================================================
// ================= JWT GENERATOR ======================
// ======================================================

const generateToken =
  (user) => {

    return jwt.sign(

      {
        id: user._id,

        role:
          user.role,

        organizationId:
          user.organizationId,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );
  };

// ======================================================
// ================= REGISTER ===========================
// ======================================================

exports.register =
  async (req, res) => {

    try {

      const {

        name,

        email,

        companyName,

        password,
      } = req.body;

      // ======================================================
      // ================= VALIDATION =========================
      // ======================================================

      if (

        !name ||

        !email ||

        !password ||

        !companyName

      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
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

            message:
              "User already exists",
          });
      }

      // ======================================================
      // ================= CREATE ORGANIZATION ================
      // ======================================================

      const slug =
        companyName
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-");

      let organization =
        await Organization.findOne({
          slug,
        });

      // ======================================================
      // ================= CREATE IF NOT EXISTS ===============
      // ======================================================

      if (!organization) {

        organization =
          await Organization.create({

            name:
              companyName,

            slug,
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
      // ================= DEFAULT ADMIN PERMISSIONS ==========
      // ======================================================

      const adminPermissions = [

        "home",

        "upload_profiles",

        "talent_pool",

        "insights",

        "user_management",
      ];

      // ======================================================
      // ================= CREATE USER ========================
      // ======================================================

      const user =
        await User.create({

          name,

          email,

          password: hash,

          role:
            "organization_admin",

          organizationId:
            organization._id,

          permissions:
            adminPermissions,

          isActive: true,
        });

      // ======================================================
      // ================= TOKEN ==============================
      // ======================================================

      const token =
        generateToken(
          user
        );

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

        message:
          "User registered successfully",

        token,

        user:
          userData,
      });

    } catch (err) {

      console.error(

        "REGISTER ERROR:",

        err
      );

      res.status(500).json({

        success: false,

        message:
          "Server error",
      });
    }
  };

// ======================================================
// ================= LOGIN ==============================
// ======================================================

exports.login =
  async (req, res) => {

    try {

      const {

        email,

        password,
      } = req.body;

      // ======================================================
      // ================= VALIDATION =========================
      // ======================================================

      if (

        !email ||

        !password

      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              "Email and password are required",
          });
      }

      // ======================================================
      // ================= FIND USER ==========================
      // ======================================================

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              "User not found",
          });
      }

      // ======================================================
      // ================= USER STATUS ========================
      // ======================================================

      if (!user.isActive) {

        return res
          .status(403)
          .json({

            success: false,

            message:
              "Your account is inactive",
          });
      }

      // ======================================================
      // ================= PASSWORD CHECK =====================
      // ======================================================

      const isMatch =
        await bcrypt.compare(

          password,

          user.password
        );

      if (!isMatch) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              "Wrong password",
          });
      }

      // ======================================================
      // ================= TOKEN ==============================
      // ======================================================

      const token =
        generateToken(
          user
        );

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

      res.status(200).json({

        success: true,

        message:
          "Login successful",

        token,

        user:
          userData,
      });

    } catch (err) {

      console.error(

        "LOGIN ERROR:",

        err
      );

      res.status(500).json({

        success: false,

        message:
          "Server error",
      });
    }
  };

// ======================================================
// ================= CURRENT USER =======================
// ======================================================

exports.getCurrentUser =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        )

        .select("-password");

      // ======================================================
      // ================= NOT FOUND ==========================
      // ======================================================

      if (!user) {

        return res
          .status(404)
          .json({

            success: false,

            message:
              "User not found",
          });
      }

      // ======================================================
      // ================= RESPONSE ===========================
      // ======================================================

      res.status(200).json({

        success: true,

        user,
      });

    } catch (error) {

      console.error(

        "GET CURRENT USER ERROR:",

        error
      );

      res.status(500).json({

        success: false,

        message:
          "Server error",
      });
    }
  };