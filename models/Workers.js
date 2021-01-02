const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const schema = mongoose.Schema;

const workersSchema = new schema({
  firstname: {
    type: String,
    required: [true, "Please enter firstname"],
    lowercase: true,
  },
  middlename: {
    type: String,
    lowercase: true,
  },
  lastname: {
    type: String,
    required: [true, "Please enter lastname"],
    lowercase: true,
  },
  contact: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  emergency_contact: {
    type: String,
    required: [true, "Please provide and emergency phone number"],
  },
  marital_status: {
    type: String,
    enum: ["single", "married"],
    required: [true, "Please provide marital status"],
    lowercase: true,
  },
  role: {
    type: String,
    lowercase: true,
    enum: [
      "doctor",
      "receptionist",
      "nurse",
      "lab technician",
      "pharmacist",
      "cleaner",
      "security",
      "cashier",
    ],
    required: [true, "Please provide a role"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be 6 chars or more"],
  },
  date_of_birth: {
    type: String,
    required: [true, "Please provide your date of birth"],
  },
  area_of_residence: {
    type: String,
    required: [true, "Please provide area of residence"],
  },
});

workersSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
});

workersSchema.methods.getSignJwtToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      role: this.role,
      contact: this.contact,
      date_of_birth: this.date_of_birth,
      area_of_residence: this.area_of_residence,
      emergency_contact: this.emergency_contact,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRESIN,
    }
  );
};

workersSchema.methods.matchPassword = async function (enteredPassword) {
  const compare = await bcrypt.compare(enteredPassword, this.password);

  return compare;
};

const workers = mongoose.model("Workers", workersSchema);

module.exports = workers;
