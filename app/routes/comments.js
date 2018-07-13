const User = require('../models/user'); // Import User Model Schema
const Event = require('../models/event'); // Import Event Model Schema
const Comment = require('../models/comment'); // Import Event Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const es = require('../config/translate/es'); // Import translate es
const eu = require('../config/translate/eu'); // Import translate eu
const en = require('../config/translate/en'); // Import translate en
module.exports = (router) => {

    /* ===============================================================
       CREATE NEW comment
    =============================================================== */
    router.post('/newComment', (req, res) => {
        var language = req.body.language;
        // Check if language was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            // Check if comment eventId was provided
            if (!req.body.eventId) {
                res.json({ success: false, message: eval(language + '.newComment.eventIdProvidedError') }); // Return error
            } else {
                // Check if comment was provided
                if (!req.body.comment) {
                    res.json({ success: false, message: eval(language + '.newComment.commentProvidedError') }); // Return error message
                } else {
                    // Check if comment createdBy was provided
                    if (!req.body.createdBy) {
                        res.json({ success: false, message: eval(language + '.newComment.createdByProvidedError') }); // Return error
                    } else {
                        // Create the event object for insertion into database
                        const comment = new Comment({
                            eventId: req.body.eventId,
                            originCommentId: req.body.originCommentId,
                            mentionedUsers: req.body.mentionedUsers,
                            comment: req.body.comment,
                            createdBy: req.body.createdBy,
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                            reactions: {
                                likeBy: req.body.likeBy,
                                loveBy: req.body.loveBy,
                                hahaBy: req.body.hahaBy,
                                wowBy: req.body.wowBy,
                                sadBy: req.body.sadBy,
                                angryBy: req.body.angryBy
                            }
                        });
                        // Save event into database
                        comment.save((err) => {
                            // Check if error
                            if (err) {
                                // Check if error is a validation error
                                if (err.errors) {
                                    // Check if validation error is in the comment field
                                    if (err.errors['comment']) {
                                        res.json({ success: false, message: eval(language + err.errors['comment'].message) }); // Return error message
                                    } else {
                                        res.json({ success: false, message: err }); // Return general error message
                                    }
                                } else {
                                    res.json({ success: false, message: eval(language + '.newComment.saveError'), err }); // Return general error message
                                }
                            } else {
                                res.json({ success: true, message: eval(language + '.newComment.success') }); // Return success message
                            }
                        });
                    }
                }
            }
        }
    });
};