/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
// Validate Function to check comment length
let commentLengthChecker = (comment) => {
    // Check if comment exists
    if (!comment[0]) {
        return false; // Return error
    } else {
        // Check comment length
        if (comment[0].length < 1 || comment[0].length > 300) {
            return false; // Return error if comment length requirement is not met
        } else {
            return true; // Return comment as valid
        }
    }
};

// Array of Comment validators
const commentValidators = [
    // First comment validator
    {
        validator: commentLengthChecker,
        message: '.validation.commentLength'
    }
];
// Comment Model Definition
const commentSchema = new Schema({
    eventId:{ type: String, required: true},
    originCommentId: { type: String, required: false },
    mentionedUsers:{type: Array, required: false},
    comment: { type: String, required: true, validate: commentValidators },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now() },
    updatedAt: { type: Date, required: true, default: Date.now() },
    reactions:{
        likeBy:{ type: Array, required: false },
        loveBy:{ type: Array, required: false },
        hahaBy:{ type: Array, required: false },
        wowBy:{ type: Array, required: false },
        sadBy:{ type: Array, required: false },
        angryBy:{ type: Array, required: false }
    }
});

// Export Module/Schema
module.exports = mongoose.model('Comment', commentSchema);
