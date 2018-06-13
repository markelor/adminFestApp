/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
// Validate Function to check blog title length
let titleLengthChecker = (title) => {
    // Check if blog title exists
    if (!title) {
        return false; // Return error
    } else {
        // Check the length of title
        if (title.length < 3 || title.length > 35) {
            return false; // Return error if not within proper length
        } else {
            return true; // Return as valid title
        }
    }
};

// Validate Function to check if valid title format
let alphaNumericTitleChecker = (title) => {
    // Check if title exists
    if (!title) {
        return false; // Return error
    } else {
        // Regular expression to test for a valid title
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        return regExp.test(title); // Return regular expression test results (true or false)
    }
};

// Array of Title Validators
const titleValidators = [
    // First Title Validator
    {
        validator: titleLengthChecker,
        message: '.validation.titleLength'
    },
    // Second Title Validator
    {
        validator: alphaNumericTitleChecker,
        message: '.validation.titleValid'
    }
];

// Validate Function to check description length
let descriptionLengthChecker = (description) => {
    // Check if description exists
    if (!description) {
        return false; // Return error
    } else {
        // Check length of description
        if (description.length < 5 || description.length > 20000) {
            return false; // Return error if does not meet length requirement
        } else {
            return true; // Return as valid description
        }
    }
};

// Array of Description validators
const descriptionValidators = [
    // First description validator
    {
        validator: descriptionLengthChecker,
        message: '.validation.eventDescriptionLength'
    }
];
// Validate Function to check if valid latidude format
let latitudeChecker = (lat) => {
    // Check if lat exists
    if (!lat) {
        return false; // Return error
    } else {
        // Regular expression to test for a valid latitude
        const regExp = new RegExp(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/);
        return regExp.test(lat); // Return regular expression test results (true or false)
    }
};

// Array of Latitude validators
const latitudeValidators = [
    // First latitude validator
    {
        validator: latitudeChecker,
        message: '.validation.latitudeValid'
    }
];
// Validate Function to check if valid longitude format
let longitudeChecker = (lng) => {
    // Check if lng exists
    if (!lng) {
        return false; // Return error
    } else {
        // Regular expression to test for a valid longitude
        const regExp = new RegExp(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/);
        return regExp.test(lng); // Return regular expression test results (true or false)
    }
};

// Array of Longitude validators
const longitudeValidators = [
    // First longitude validator
    {
        validator: longitudeChecker,
        message: '.validation.longitudeValid'
    }
];

// Service Model Definition
const serviceSchema = new Schema({
    serviceTypeId: { type: Schema.Types.ObjectId, required: true },
    language: { type: String, required: true },
    title: { type: String, required: true, validate: titleValidators },
    description: { type: String, required: true, validate: descriptionValidators },
    images: { type: Array, required: true },
    translation: [{
        language: { type: String, required: true },
        title: { type: String, required: true, validate: titleValidators },
        description: { type: String, required: true, validate: descriptionValidators },
        images: { type: Array, required: true },
        _id: false
    }],
    coordinates: {
        lat: { type: Number, requireed: true, validate: latitudeValidators },
        lng: { type: Number, requireed: true, validate: longitudeValidators }
    },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

// Export Module/Schema
module.exports = mongoose.model('Service', serviceSchema);