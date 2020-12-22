const Patient = require('../models/User');

const consultation = async (req,res,next)=>{
    try {
        const {symptoms,prescriptions,referToLab,lab_tests} = req.body;

        const patient = await Patient.findById(req.params._id).populate('assigned_doctor');
        if(!patient){
            return res.status(400).json({status:"Failed",data:"Patient not found"})
        }

        patient.diagnosis.map((diagnose)=> {
            try {
                diagnose.symptoms = symptoms;
                disgnsose.prescriptions = prescriptions;

                if(referToLab == 'yes'){
                    diagnose.referToLab = true

                    diagnose.lab_tests.map(test =>{
                        test.titles = lab_tests

                        diagnose.save();
                        res.status(200).json({status:"success",data:patient})
                    })
                }else{
                    diagnose.save();
                    res.status(200).json({status:"success",data:patient})
                }

        
            } catch (err) {
                res.status(400).json({status:"Failed",data:"Could not save diagnosis"})
            }
        })


    } catch (err) {
        res.status(400).json({status:"Failed",data:"Error from server"})
    }
}

const lab = async(req,res,next) => {
    try {
        const {lab_results} = req.body;
        const patient = await Patient.findById(req.params._id);
        if(!patient){
            return res.status(400).json({status:"Failed",data:"Patient not found"})
        }

        patient.lab_results.map(result => {
            result.titles = lab_results

            result.save();
            res.status(200).json({status:"success",data:patient})
        })


    } catch (err) {
        res.status(400).json({status:"Failed",data:"Error from server"})
    }
}

module.exports = {consultation,lab}