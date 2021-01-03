const express = require("express");
const router = express.Router();

const {
  getWorkers,
  getWorker,
  updateWorker,
  deleteWorker,
  registerWorker,
  loginWorker,
  logoutWorker,
} = require("../controllers/workers");

const { protect, authorize } = require("../helpers/middleware");

// Get all workers
router.route("/").get(protect, getWorkers);

router
  .route("/:_id")
  .get(protect, getWorker)
  .put(protect, updateWorker)
  .delete(protect, deleteWorker);

// AUTH
router.post("/register", protect, registerWorker);

router.post("/login", loginWorker);

router.get("/user/logout", protect, logoutWorker);

module.exports = router;
