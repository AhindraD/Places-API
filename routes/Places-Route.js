const express = require('express');
const PlaceModel = require('../models/PlaceModel');
const multer = require("multer");
const router = express.Router();


const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, "public/uploads")
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname)
        }
    }
);

const upload = multer({ storage: storage });

//SHOW ALL PLACES
router.get('/all', async (request, response) => {
    try {
        const places = await PlaceModel.find({})
        response.status(200).json(places);
    } catch (e) {
        response.status(501).send(e.message)
    }
});


//CREATE a new PLACE
router.post('/new', upload.single('image'), async (request, response) => {
    const { name, slug, city, state } = request.body;
    let imageUrl = null;
    // try {
    //     let uploadedFile = request.file.filename;
    //     uploadedFile = 'uploads/' + uploadedFile;
    //     imageUrl = process.env.BASE_URL + uploadedFile;
    // }
    // catch (err) { response.status(501).send(err.message) }

    //console.log(process.env.BASE_URL);
    //console.log(imageUrl);
    if (!name || !slug || !city || !state) {
        return response.status(400).send('Input required!');
    }

    //Capitalize city name
    let cityName = city[0].toUpperCase() + city.slice(1);

    const newPlace = new PlaceModel({
        name,
        slug,
        city: cityName,
        state,
        imageUrl,
    });

    try {
        //saving the doc/Place to database collection
        const savePlace = await newPlace.save();
        response.status(201).send("Place created with ID: " + savePlace.id);
    } catch (e) {
        response.status(501).send(e.message)
    }
});


//SHOW ONE PLACE
router.get('/find/:slug', async (request, response) => {
    //console.log(request.params.id);
    try {
        const place = await PlaceModel.find({ slug: request.params.slug });
        response.status(200).json(place);
    } catch (e) {
        response.status(501).send(e.message)
    }
});

//SHOW  PLACEs in A CITY
router.get('/city/:city', async (request, response) => {
    //console.log(request.params.id);
    try {
        let cityName = request.params.city;
        cityName = cityName[0].toUpperCase() + cityName.slice(1);
        const places = await PlaceModel.find({ city: cityName });
        response.status(200).json(places);
    } catch (e) {
        response.status(501).send(e.message)
    }
});


module.exports = router;