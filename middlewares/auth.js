const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userSchema");

const jwt_key = process.env.JWT_SECRETE_KEY;

// ✅ Authentication Middleware
async function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "Failed",
        message: "Authorization header missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwt_key);

    const user = await User.findById(decoded.user_id);
    if (!user) {
      return res.status(401).json({
        status: "Failed",
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication Error:", err.message);
    return res.status(401).json({
      status: "Failed",
      message: "Authentication failed",
    });
  }
}

// ✅ Role-Based Authorization Middleware
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "Failed",
        message: "Access denied: insufficient role",
      });
    }
    next();
  };
}

module.exports = {
  authenticateUser,
  authorizeRoles,
};
