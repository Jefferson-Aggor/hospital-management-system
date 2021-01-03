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

// Get all workers
router.route("/").get( getWorkers);

router
  .route("/:_id")
  .get( getWorker)
  .put( updateWorker)
  .delete( deleteWorker);

// AUTH
router.post("/register",  registerWorker);

router.post("/login", loginWorker);



module.exports = router;
