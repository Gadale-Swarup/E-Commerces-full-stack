const express = require("express");
const router = express.Router();
const authorize =require("../middleware/auth")
const {
  createCategory,
  updateCategoryById,
  deleteCategoryById,
  getCategories,
} = require("../controllers/CategoryControllers");

router.post("/addcategory",authorize.auth,authorize.admin, createCategory);
router.put("/updatecategory/:id", updateCategoryById);
router.delete("/deletecategory/:id", deleteCategoryById);
router.get("/categories", getCategories);

module.exports = router;
