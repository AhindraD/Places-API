require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan')

const DB_URL = process.env.DB_URL;
//"mongodb+srv://apptest:apptest1234@cluster0.1u9xnky.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewURLParser: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err))

//All routes import
const placesRouter = require('./routes/Places-Route');

const app = express();

//MIddleWare usage
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({}));
app.use(morgan("dev"));

//Router related usage
app.use('/places', placesRouter);


app.listen(process.env.PORT || 8000)