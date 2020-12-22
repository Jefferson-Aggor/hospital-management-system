/*

get the prescriptions made by the doctor.
gives receipt to client
Client pays to the finance office
Client receives medicine
*/

const Patient = require('../models/User');


const receipt = async (req,res,next)=>{
    try {
        const {amount} = req.body;
        const patient = await Patient.findById(req.params._id);

        if(!patient){
            return res.status(400).json({status:"Failed",data:"Patient not found"})
        }

        res.send(`<h1 style="color:#333;font-family=serif">${patient.consultation.diagnosis.prescriptions}</h1><hr>\n Total Amount = ghs ${amount}`)

    } catch (err) {
        console.log(err.message)
    }
} 

const handOverMedicine = async (req,res,next)=>{
    try {
        const patient = await Patient.findById(req.params._id);

        if(!patient){
            return res.status(400).json({status:"Failed",data:"Patient not found"})
        }

        if(!patient.paidForDrugs){
            return res.send('Please pay for drugs')
        }

        

        patient.consultation.diagnosis.symptoms = undefined;
        patient.consultation.diagnosis.prescriptions = undefined;
        patient.consultation.diagnosis.referToLab = false;
        patient.consultation.diagnosis.lab_tests = undefined;
        patient.lab_results.paidForLab = false;
        patient.lab_results.titles= undefined;
        patient.paid = false;
        patient.paidForDrugs = false;
        patient.assigned_doctor = undefined;

        patient.save();
        res.send('Thank you for using our services. Stay safe')

    } catch (err) {
        console.log(err.message)
    }
}


module.exports = {receipt,handOverMedicine}