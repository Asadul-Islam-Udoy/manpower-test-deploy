const express = require("express");
const isAdminUserMiddleware = require("../middleware/AdminUserMiddleware");
const isAdminMiddleware = require("../middleware/AdminMiddleware");
const {
  serviceCategoryCreate,
  getAllServiceCategories,
  serviceCategoryUpdate,
  serviceCategoryDelete,
  getSingleServiceCategory,
  getParentCategoryController,
} = require("../controllers/serviceCategoryController");

const router = express.Router();

// Create a new service category
router.post(
  "/create",
  isAdminUserMiddleware,
  isAdminMiddleware("admin"),
  serviceCategoryCreate
);

// Get a list of all service categories
router.get("/get/all", getAllServiceCategories);
// Get a list of all service categories
router.get("/get/all/parent", getParentCategoryController);
// Get a single service category
router.get("/get/single/:id", getSingleServiceCategory);

// Update a service category
router.put(
  "/update/:id",
  isAdminUserMiddleware,
  isAdminMiddleware("admin"),
  serviceCategoryUpdate
);

// Delete service category
router.delete(
  "/delete/:id",
  isAdminUserMiddleware,
  isAdminMiddleware("admin"),
  serviceCategoryDelete
);

module.exports = router;
