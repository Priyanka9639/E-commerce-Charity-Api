const express = require("express");
const router = express.Router();
const { authenticateUser, authorizeRoles } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/multer");
const { charityValidationSchema, validateCharity } = require("../middlewares/validateCharity");
const { createCharity, getAllCharities, getCharitiesOfAdmin, getCharityById, updateCharity, getCharityByAdminId } = require("../controllers/charity");
router.post("/", uploadFile("banner"), authenticateUser, charityValidationSchema, validateCharity, createCharity);

// router.get("/", getAllCharities);
// router.get("/:id", getCharityById);
// router.get("/admin", authenticateUser, getCharitiesOfAdmin);
// // router.get("/admin/:id", authenticateUser, getCharitiesOfAdmin);
// router.get('/admin/:id', authenticateUser, authorizeRoles('admin', 'super_admin'),getCharityByAdminId);

// router.put("/:id",authenticateUser,charityValidationSchema,  // ✅ apply the same validation schema for updates
//  validateCharity,
//     updateCharity
// );

router.get("/", getAllCharities); // general

// ✅ Put these BEFORE the `/:id` route
router.get("/admin", authenticateUser, getCharitiesOfAdmin);
router.get("/admin/:id", authenticateUser, authorizeRoles('admin', 'super_admin'), getCharityByAdminId);

// ✅ Put this AFTER the more specific routes
router.get("/:id", getCharityById);

router.put(
  "/:id",
  authenticateUser,
  charityValidationSchema, // ✅ Joi or express-validator
  validateCharity,
  updateCharity
);

module.exports = router;
