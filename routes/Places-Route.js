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

    let uploadedFile = request.file.filename;
    uploadedFile = 'uploads/' + uploadedFile;
    let imageUrl = process.env.BASE_URL + uploadedFile;
    //console.log(process.env.BASE_URL);
    console.log(imageUrl);
    if (!name || !slug || !city || !state) {
        return response.status(400).send('Input required!');
    }
    //creating document/Ads for entered details
    const newPlace = new PlaceModel({
        name,
        slug,
        city,
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
router.delete('/find/:slug', async (request, response) => {
    //console.log(request.params.id);
    try {
        const place = await PlaceModel.find({ slug: request.params.slug });
        response.status(200).json(place);
    } catch (e) {
        response.status(501).send(e.message)
    }
});

//SHOW  PLACEs in A CITY
router.delete('/city/:city', async (request, response) => {
    //console.log(request.params.id);
    try {
        const places = await PlaceModel.find({ city: request.params.city });
        response.status(200).json(places);
    } catch (e) {
        response.status(501).send(e.message)
    }
});


module.exports = router;