const express = require("express");
const router = express.Router();

// Controllers
const {
  getMembers,
  registerUser,
  getMember,
  assignDoctor,
} = require("../controllers/reception");
const {
  getPatientById,
  checkPaid,
  checkPaidForDrugs,
} = require("../controllers/finance");
const { consultation, lab } = require("../controllers/doctor");
const { receipt, handOverMedicine } = require("../controllers/pharmarcy");

const { protect } = require("../helpers/middleware");

// Get All Patients
router.route("/api/members").get(protect, getMembers);

//Get a patient
// router.route('/api/members/:_id').get(getMember)

// Register a new member
router.route("/api/register").post(protect, registerUser);

// Payment
router
  .route("/api/payment/:_id")
  .get(protect, getPatientById)
  .put(protect, checkPaid);

// Pay for drugs
router.route("/api/payment/drugs/:_id").put(protect, checkPaidForDrugs);
// Assign Doctor
router.route("/api/user/assign_doctor/:_id").put(protect, assignDoctor);

// Consultation
router.route("/api/user/:_id/consultation").put(protect, consultation);

// Lab
router.route("/api/user/:_id/lab").put(protect, lab);

//Pharmacy
router
  .route("/api/user/:_id/pharmacy")
  .get(protect, receipt)
  .put(protect, handOverMedicine);

module.exports = router;
