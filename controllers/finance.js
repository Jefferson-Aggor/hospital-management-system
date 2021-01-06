/* 
    Function: Handle all money payments.
              Set user.paid to true or false

*/

const Patient = require("../models/User");

//PATH          /api/payment/:_id
//METHOD        GET
//DESC          Get patient whose id matches req.params._id

const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params._id);

    if (!patient) {
      return res
        .status(400)
        .json({ status: "Failed", data: "Patient not found" });
    }

    res.status(200).json({ status: "success", data: patient });
  } catch (err) {
    console.log(err.message);
  }
};

//PATH          /api/payment/:_id
//METHOD        PUT
//DESC          Set the members paid status to true or false

const checkPaid = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const patient = await Patient.findOne({ _id });

    if (!patient) {
      return res.status(400).json({ status: "Failed", data: "User not found" });
    }

    if (req.body.paid != "yes") {
      return res
        .status(200)
        .json({ status: "success", data: patient, paid: "Not paid" });
    }

    patient.paid = true;
    patient.save();
    res.status(200).json({ status: "success", data: patient, paid: "paid" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: "Failed", data: "Server error" });
  }
};

const checkPaidForDrugs = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const patient = await Patient.findOne({ _id });

    if (!patient) {
      return res.status(400).json({ status: "Failed", data: "User not found" });
    }

    if (req.body.paid != "yes") {
      patient.paidForDrugs = false;
      patient.save();
      return res
        .status(200)
        .json({ status: "success", data: patient, paid: "Not paid" });
    }

    patient.paidForDrugs = true;
    patient.save();
    res.status(200).json({ status: "success", data: patient, paid: "paid" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: "Failed", data: "Server error" });
  }
};

const payForlab = async (req, res, next) => {
  try {
    const { paidForLab } = req.body;
    const patient = await Patient.findById(req.params._id);

    if (!patient) {
      return res.status(400).json({ status: "Failed", data: "User not found" });
    }

    if (paidForLab !== "yes") {
      patient.lab_results.paidForLab === false;
      patient.save();
      res.status(200).json({ status: "success", data: patient, paid: "paid" });
    }

    patient.lab_results.paidForLab === true;
    patient.save();
    res.status(200).json({ status: "success", data: patient, paid: "paid" });
  } catch (err) {
    return res.status(400).json({ status: "Failed", data: "Server error" });
  }
};

module.exports = { getPatientById, checkPaid, checkPaidForDrugs, payForlab };
