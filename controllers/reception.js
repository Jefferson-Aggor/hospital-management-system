const User = require("../models/User");
const Worker = require('../models/Workers');

// PATH             /api/members
// METHOD           GET
// DESC             Get all registered users

const getMembers = async (req,res,next)=>{
    try {
        let members;
        if(req.query){
             members = await User.find(req.query);
        }else{
             members = await User.find();
        }
        
        if(!members){
            return res.status(400).json({status: "failed",data:"Failed to get workers"});
        }

        res.status(200).json({status:'success',count:members.length ,data:members})
    } catch (err) {
        console.log(err)
    }
}

// PATH             /api/register
// METHOD           POST
// DESC             Register users

const registerUser = async (req,res,next)=>{
    try {
        // const {firstname,middlename,lastname,contact,emergencyContact,date_of_birth,occupation,marital_status,area_of_residence} = req.body;

        const user = await User.create(req.body);

        if(!user){
            return res.status(400).json({status: "failed",data:"Failed to register user"});
        }


        res.status(200).json({status:"success",data:user});
    } catch (err) {
       console.log(err.message)
       return res.status(400).json({status: "failed",data:"Failed to register user"})
    }
}

// PATH         /api/users/?firstname=""&lastname=""
// METHOD       POST
// DESC         Get a users details

const getMember = async (req,res,next)=>{
   
    try {
        const member = await User.find(req.query)

        if(!member){
            return res.status(400).json({status:"Failed",data:"Member not found"})
        }

        res.status(200).json({status:"success",data:member})

    } catch (err) {

        console.log(err);
        return res.status(400).json({status:"Failed",data:"Server error, Try again"})

    }
}

// PATH         /api/user/assign_doctor/:_id
// METHOD       PUT
// DESC         Get a users details
const assignDoctor = async (req,res,next)=>{
    try {
        const patient = await User.findById(req.params._id);

        if(!patient){
            return res.status(400).json({status:"Failed",data:"Member not found"})
        }

        if(!patient.paid){
            return res.status(400).json({status:"Failed",data:"Patient must pay before seeing a doctor"})
        }
        
        const doctor = await Worker.findOne({...req.body, role:"doctor"});

        if(!doctor){
            return res.status(400).json({status:"Failed",data: "Invalid Doctor"})
        }

        patient.assigned_doctor = doctor._id;
        patient.save()
        res.status(200).json({status:"success",data:patient})

    } catch (error) {
        console.log(error)
        return res.status(400).json({status:"Failed",data:"Server Error"})
    }
    
}

module.exports = {getMembers,registerUser,getMember,assignDoctor}