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
  payForlab,
} = require("../controllers/finance");
const { consultation, lab } = require("../controllers/doctor");
const { receipt, handOverMedicine } = require("../controllers/pharmarcy");

// Get All Patients
router.route("/api/members/").get(getMembers);

//Get a patient
// router.route('/api/members/:_id').get(getMember)

// Register a new member
router.route("/api/register/").post(registerUser);

// Payment
router.route("/api/payment/:_id").get(getPatientById).put(checkPaid);

// Pay for drugs
router.route("/api/payment/drugs/:_id").put(checkPaidForDrugs);
// Assign Doctor
router.route("/api/user/assign_doctor/:_id").put(assignDoctor);

// Consultation
router.route("/api/user/:_id/consultation").put(consultation);

//Pay For lab
router.route("/api/payment/lab/:_id/").put(payForlab);
// Lab
router.route("/api/user/:_id/lab").put(lab);

//Pharmacy
router.route("/api/user/:_id/pharmacy").get(receipt).put(handOverMedicine);

module.exports = router;
