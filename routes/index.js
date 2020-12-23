
const express = require("express");
const router = express.Router();

// Controllers
const {getMembers,registerUser,getMember,assignDoctor} = require('../controllers/reception');
const {getPatientById,checkPaid,checkPaidForDrugs} = require('../controllers/finance');
const {consultation,lab} = require('../controllers/doctor')
const {receipt,handOverMedicine} = require('../controllers/pharmarcy')

const {protect,authorize} = require('../helpers/middleware')

// Get All Patients
router.route('/api/members').get(protect,authorize('admin','receptionist'),  getMembers)

//Get a patient
// router.route('/api/members/:_id').get(getMember)

// Register a new member
router.route('/api/register').post(protect,authorize('admin','receptionist'),registerUser);

// Payment
router.route('/api/payment/:_id').get(protect,authorize('admin','cashier','receptionist'), getPatientById).put(protect,authorize('admin','cashier'),checkPaid)

// Pay for drugs
router.route('/api/payment/drugs/:_id').put(protect,authorize('admin','cashier'),checkPaidForDrugs);
// Assign Doctor
router.route('/api/user/assign_doctor/:_id').put(protect,authorize('admin','receptionist'),assignDoctor);

// Consultation
router.route('/api/user/:_id/consultation').put(protect,authorize('admin','doctor'),consultation);

// Lab
router.route('/api/user/:_id/lab').put(protect,authorize('admin','lab technician'), lab)

//Pharmacy
router.route('/api/user/:_id/pharmacy').get(protect,authorize('admin','pharmacist','cashier'), receipt).put(protect,authorize('admin','pharmacist'), handOverMedicine);

module.exports = router;
