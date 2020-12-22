const mongoose = require('mongoose');

const schema = mongoose.Schema;

const UserSchema = new schema({
    firstname: {
        type: String,
        required: [true,"Please enter firstname"],
        lowercase:true
    },
    middlename: {
        type: String,
        lowercase:true
    },
    lastname: {
        type: String,
        required: [true,"Please enter lastname"],
        lowercase:true
    },
    contact: {
        type:String,
        required: [true,"Please provide a phone number"]
    },
    emergencyContact: {
        type:String,
        required: [true,"Please provide and emergency phone number"]
    },
    marital_status: {
        type:String,
        enum: ['single','married'],
        required: [true,'Please provide marital status'],
        lowercase: true,
    },
    occupation: {
        type:String,
        required: [true,'Please provide occupation']
    },
    date_of_birth: {
        type: String,
        required: [true, "Please provide your date of birth"]
    },
    area_of_residence: {
        type: String,
        required: [true,"Please provide area of residence"]
    },
    paid: {
        type:Boolean,
        default:false
    },
    assigned_doctor: {
        type: schema.Types.ObjectId,
        ref : "Workers"
    },
    consultation: {
        diagnosis: 
            {
                symptoms: {
                    type: String,
                },
                prescriptions:{
                    type:String,
                },
                referToLab: {
                    type:Boolean,
                    default:false
                },
                lab_tests: {
                    type:String
                },
                date : {
                    type:Date,
                    default: Date.now
                }
            }
    
    },
    
    lab_results: {
        titles:{type:String},
        paidForLab: {
            type: Boolean,
            default: false
        }
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User',UserSchema);
module.exports = User;