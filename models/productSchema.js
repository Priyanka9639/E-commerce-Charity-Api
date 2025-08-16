const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    match: [/^[A-Za-z\s]+$/, "Title must contain alphabets only"]
  },
  short_description: {
    type: String,
    required: [true, "Short description is required"],
    minlength: [10, "Short description must be at least 10 characters"],
    maxlength: [15, "Short description must not exceed 15 characters"]
  },
  long_description: {
    type: String,
    required: [true, "Long description is required"],
    minlength: [20, "Long description must be at least 20 characters"],
    maxlength: [50, "Long description must not exceed 50 characters"]
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "User ID is required"],
    ref: "User"
    // Validate in logic: only allow admin or super_admin roles
  },
  charity_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "Charity ID is required"],
    ref: "Charity"
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "Category ID is required"],
    ref: "Category"
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [25, "Quantity must be at least 25"],
    max: [50, "Quantity must not exceed 50"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"]
  },
  discount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["pending", "active", "sold", "inactive"],
    default: "pending"
  },
  image: {
    type: String,
    required: [true, "Image URL is required"]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
