const express = require("express");
const router = express.Router();
const { createAddress, getAddress, updateAddress, deleteAddress } = require("../controllers/address");
const { addressValidationSchema, validateAddress } = require("../middlewares/validateAddress"); 
const { authenticateUser } = require("../middlewares/auth");



// Create Address
router.post("/", authenticateUser, addressValidationSchema, validateAddress, createAddress);

// Get Address (for logged-in user)
router.get("/", authenticateUser, getAddress);

// Update Address
router.put("/:id", authenticateUser, addressValidationSchema, validateAddress, updateAddress);

// Delete Address
router.delete("/:id", authenticateUser, deleteAddress);

module.exports = router;
