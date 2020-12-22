
const express = require("express");
const router = express.Router();

// Controllers
const {getMembers,registerUser,getMember,assignDoctor} = require('../controllers/reception');
const {getPatientById,checkPaid} = require('../controllers/finance');
const {consultation,lab} = require('../controllers/doctor')

// Get All Patients
router.route('/api/members').get(getMembers)

//Get a patient
// router.route('/api/members/:_id').get(getMember)

// Register a new member
router.route('/api/register').post(registerUser);

// Payment
router.route('/api/payment/:_id').get(getPatientById).put(checkPaid)

// Assign Doctor
router.route('/api/user/assign_doctor/:_id').put(assignDoctor);

// Consultation
router.route('/api/user/:_id/consultation').put(consultation);

// Lab
router.route('/api/user/:_id/lab').put(lab)

module.exports = router;
