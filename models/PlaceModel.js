const mongoose = require("mongoose")
/* A place must have the following fields:
name
slug
city
state
createdAt
updatedAt
*/

const placeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        //type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type: String
    }
});

const PlaceModel = mongoose.model("Place", placeSchema);
module.exports = PlaceModel;