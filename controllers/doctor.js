const Patient = require('../models/User');

const consultation = async (req,res,next)=>{
    try {

        const {symptoms,prescriptions,referToLab,lab_tests} = req.body;

        let patient = await Patient.findById(req.params._id).populate('assigned_doctor');
        if(!patient){
            return res.status(400).json({status:"Failed",data:"Patient not found"})
        }

        patient.consultation.diagnosis.symptoms = symptoms;
        patient.consultation.diagnosis.prescriptions = prescriptions;

        if(referToLab == 'yes'){
            patient.consultation.diagnosis.referToLab = true;

            patient.consultation.diagnosis.lab_tests = lab_tests;
            patient.save()
        }else{
            patient.consultation.diagnosis.referToLab = false;

            patient.consultation.diagnosis.lab_tests = '';
            patient.save()
        }

        
        
        res.status(200).json({status:'success',data:patient})
       
    } catch (err) {
        console.log(err.message)
        res.status(400).json({status:"Failed",data:"Error from server"})
    }
}

const lab = async(req,res,next) => {
    try {
        const {lab_results,paid_for_lab} = req.body;
        const patient = await Patient.findById(req.params._id);

        if(!patient){
            return res.status(400).json({status:"Failed",data:"Patient not found"})
        }

        if(patient.consultation.diagnosis.referToLab == true){
            
            if(paid_for_lab == 'yes'){
                patient.lab_results.paidForLab = true;
                patient.lab_results.titles = lab_results;
            }else{
                patient.lab_results.paidForLab = false;
                patient.lab_results.titles = "";
            }

            patient.save()
            res.status(200).json({status:'success',data:patient})
        }else{
            res.status(400).json({status:"failed",data:'Patient was not referred to lab'})
        }
        
        

    } catch (err) {
        console.log(err.message)
        res.status(400).json({status:"Failed",data:"Error from server"})
    }
}

module.exports = {consultation,lab}