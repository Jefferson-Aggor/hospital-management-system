const dotenv = require("dotenv");
const express = require("express");
// const hpp = require('hpp');
// const helmet = require('helmet');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();

//Middlewares
app.use(cookieParser());

app.use(cors());
// app.use(helmet());
// app.use(hpp())
// Files
const { connectDB } = require("./config/db");

// Router files
const index = require("./routes/index");
const workers = require("./routes/workers");

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// Database connection;
connectDB();

const PORT = process.env.PORT || 5000;

app.use("/", index);
app.use("/api/workers", workers);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
