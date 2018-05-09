/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
// Validate Function to check aplication title length
let titleLengthChecker = (title) => {
    // Check if aplication title exists
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
// Validate Function to check aplication name length
let nameLengthChecker = (name) => {
    // Check if aplication name exists
    if (!name) {
        return false; // Return error
    } else {
        // Check the length of name
        if (name.length < 5 || name.length > 35) {
            return false; // Return error if not within proper length
        } else {
            return true; // Return as valid name
        }
    }
};

// Validate Function to check if valid name format
let alphaNumericNameChecker = (name) => {
    // Check if name exists
    if (!name) {
        return false; // Return error
    } else {
        // Regular expression to test for a valid name
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        return regExp.test(name); // Return regular expression test results (true or false)
    }
};

// Array of Name Validators
const nameValidators = [
    // First Name Validator
    {
        validator: nameLengthChecker,
        message: '.validation.nameLength'
    },
    // Second Name Validator
    {
        validator: alphaNumericNameChecker,
        message: '.validation.nameValid'
    }
];
// Aplication Model Definition
const aplicationSchema = new Schema({
	users: { type: Array, required: true },
	title: { type: String, required: true, validate: titleValidators  },
    events: { type: Array, required: true, default: [] },
    entityName: { type: String, required: false, validate: nameValidators},
    license: {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        expiredAt: { type: Date, required: true }     
    },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

// Export Module/Schema
module.exports = mongoose.model('Aplication', aplicationSchema);