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
        if (description.length < 5 || description.length > 200) {
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
        message: '.validation.categoryDescriptionLength'
    }
];

// Category Model Definition
const categorySchema = new Schema({
    firstParentId: { type: String,required: false, default: null },
    parentId: { type: String ,required: false, default: null },
    language: { type: String, required: true },
    level:{ type: Number, required: true,default: 0 },
    title: { type: String, required: true, unique: true, validate: titleValidators },
    description: { type: String, required: true, validate: descriptionValidators },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

// Export Module/Schema
module.exports = mongoose.model('Category', categorySchema);