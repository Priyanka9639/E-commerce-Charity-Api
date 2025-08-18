const express = require("express");
const router = express.Router();
const { createAddress, getAddress, updateAddress, deleteAddress } = require("../controllers/address");
const { addressValidationSchema, validateAddress } = require("../middlewares/validateAddress"); 
const { authenticateUser } = require("../middlewares/auth");



router.post("/", authenticateUser, addressValidationSchema, validateAddress, createAddress);

router.get("/", authenticateUser, getAddress);


router.put("/:id", authenticateUser, addressValidationSchema, validateAddress, updateAddress);


router.delete("/:id", authenticateUser, deleteAddress);

module.exports = router;
