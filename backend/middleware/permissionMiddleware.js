module.exports =
  (...permissions) => {

    return (
      req,
      res,
      next
    ) => {

      // ======================================================
      // ================= USER CHECK =========================
      // ======================================================

      if (!req.user) {

        return res
          .status(401)
          .json({

            success: false,

            msg:
              "Unauthorized",
          });
      }

      // ======================================================
      // ================= PERMISSION CHECK ===================
      // ======================================================

      const hasPermission =
        permissions.some(
          (permission) =>

            req.user.permissions?.includes(
              permission
            )
        );

      // ======================================================
      // ================= ACCESS DENIED ======================
      // ======================================================

      if (!hasPermission) {

        return res
          .status(403)
          .json({

            success: false,

            msg:
              "Access denied",
          });
      }

      next();
    };
  };