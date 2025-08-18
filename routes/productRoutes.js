const express = require("express");
const router = express.Router();
const {uploadFile} = require("../middlewares/multer")
const { uploadToCloudinary } = require("../utils/cloudinary"); // Your multer wrapper
const { authenticateUser, authorizeRoles } = require("../middlewares/auth");
const { productValidationSchema, validateProduct } = require("../middlewares/validateProduct");

const {
    createProduct,
    updateProduct,
    patchProductStatus,
    getProductsByCharity,
    getProductsByCategory,
    getAllProducts,
    getProductById
} = require("../controllers/product");

// POST /products - Create product
router.post(
    "/",
    authenticateUser,
    uploadFile("banner"), // ✅ call the wrapper with field name
    productValidationSchema,
    validateProduct,
    createProduct
);

// PUT /products/:id - Update product
router.put(
    "/:id",
    authenticateUser,
    uploadFile("banner"), // ✅ same here
    productValidationSchema,
    validateProduct,
    updateProduct
);

// PATCH /products/status/:id - Update only status
router.patch("/:id",authenticateUser,patchProductStatus)



// GET /admin/charity/:id - Get products by charity for admin
router.get(
    "/admin/charity/:id",
    authenticateUser,
    authorizeRoles("admin", "super_admin"), 
    
    getProductsByCharity
);

// GET /products/charity/:id - Get products by charity
router.get("/charity/:id", getProductsByCharity);

// GET /products/category/:id - Get products by category
router.get("/category/:id", getProductsByCategory);

// GET /products - Get all products
router.get("/", getAllProducts);

// GET /products/:id - Get single product
router.get("/:id", getProductById);

module.exports = router;
