/*
    Function: 
            Register Workers [Doctors,receptionist,nurses,lab technicians,pharmacists,cleaners,security]

            ....People who can create,read are the 
            doctors,
            receptionist,
            lab technicians,
            pharmacists
*/

const Worker = require('../models/Workers')

// PATH         /api/workers/
// METHOD       GET
// DESC         Get all workers
const getWorkers = async (req,res,next)=>{
    try {
        let workers;
        if(req.query){
             workers = await Worker.find(req.query);
        }else{
             workers = await Worker.find();
        }
        
        if(!workers){
            return res.status(400).json({status: "failed",data:"Failed to get workers"});
        }

        res.status(200).json({status:'success',count:workers.length, data: workers})
    } catch (err) {
        console.log(err)
        res.status(400).json({status: "failed",data:"Internal server error"});
    }
}


// PATH         /api/workers/register
// METHOD       POST
// DESC         Register workers
const registerWorker = async (req,res,next)=>{
    try {
        // const {firstname,middlename,lastname,role,area_of_residence,emergency_contact,email,marital_status,date_of_birth} = req.body;

        const worker = await Worker.create(req.body)
        
       sendTokenResponse(worker,200,res)

    } catch (err) {
        console.log(err)
        res.status(400).json({status:'failed',data:'Server error'})
    }
}

// PATH         /api/workers/:_id
// METHOD       GET
// DESC         Get a single worker
const getWorker = async (req,res,next)=>{
    try {
        const worker = await Worker.findById(req.params._id);

        if(!worker){
            return res.status(400).json({status: "failed",data:"Failed to get worker"});
        }

        res.status(200).json({status:'success',data:worker})

    } catch (err) {
        console.log(err)
        res.status(400).json({status: "failed",data:"Server Error"});
    }
}

// PATH         /api/workers/:_id
// METHOD       PUT
// DESC         Update a worker

const updateWorker = async (req,res,next)=>{
    try {
        const {firstname,middlename,lastname,role,area_of_residence,contact,emergency_contact,email,marital_status,date_of_birth} = req.body;

        const worker = await Worker.findById(req.params._id);

        if(!worker){
            return res.status(400).json({status: "failed",data:"Failed to get worker"});
        }

        worker.firstname = firstname;
        worker.middlename = middlename;
        worker.lastname = lastname;
        worker.role = role;
        worker.area_of_residence = area_of_residence;
        worker.emergency_contact = emergency_contact;
        worker.contact = contact;
        worker.email = email;
        worker.marital_status = marital_status;
        worker.date_of_birth = date_of_birth;

        worker.save()

        res.status(200).json({status:'success',data:worker})


    } catch (err) {
        console.log(err)
        res.status(501).json({status: "failed",data:"Server Error"});
    }
}

// PATH         /api/workers/:_id
// METHOD       DELETE
// DESC         Delete a worker

const deleteWorker = async (req,res,next)=>{
    try {
      const worker = await Worker.findById(req.params._id);
      
      if(!worker){
        return res.status(400).json({status: "failed",data:"Failed to get worker"});
    }

    worker.remove()

    res.status(200).json({status:'success',data:"Worker deleted successfully"})
    } catch (err) {
        console.log(err)
        res.status(501).json({status: "failed",data:"Server Error"});
    }
}

// PATH         /api/workers/login
// METHOD       POST
// DESC         Login a worker

const loginWorker = async (req,res,next)=>{
    try {
        const {email,password} = req.body;

        const worker = await Worker.findOne({email});

        if(!email || !password){
            return res.status(400).json({status: "failed",data:"Validation failed"});
        }

        if(!worker){
            return res.status(400).json({status: "failed",data:"Failed to get worker"});
        }

        const match = await worker.matchPassword(password);


        if(!match){
            return res.status(400).json({status: "failed",data:"Validation failed"});
        }

        
        sendTokenResponse(worker,200,res)

    } catch (err) {
        console.log(err)
    }
}

// PATH         /api/workers/logout
// METHOD       GET
// DESC         Logout a worker;

const logoutWorker = (req,res,next)=>{
    res.cookie("token",'',{expires: new Date(Date.now() + (1 * 1000)) , httpOnly:true}) 
    res.status(200).json({status:'success', data:"You have successfully logged out"})
}


// Send cookie

const sendTokenResponse = async (model,statusCode,res)=>{
    const token = model.getSignJwtToken();

    const options = {
        expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000)),
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production'){
        options.secure = true
    }

    res
    .status(statusCode)
    .cookie('token',token,options)
    .json({status:'success',token})
} 

module.exports = {getWorkers, registerWorker, getWorker,updateWorker,deleteWorker,loginWorker,logoutWorker}