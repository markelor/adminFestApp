const User = require('../models/user'); // Import User Model Schema
const Event = require('../models/event'); // Import Event Model Schema
const Comment = require('../models/comment'); // Import Event Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const configAws = require('../config/aws'); // Import database configuration
const es = require('../translate/es'); // Import translate es
const eu = require('../translate/eu'); // Import translate eu
const en = require('../translate/en'); // Import translate en
const nodemailer = require('nodemailer');
const emailConfig = require('../config/email'); // Mongoose Email
var ObjectId = require('mongodb').ObjectId;
module.exports = (router) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host: emailConfig.host,
        port: emailConfig.port,
        secure: emailConfig.secure,
        auth: {
            user: emailConfig.email,
            pass: emailConfig.password
        }
    });
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
                        if (!req.body.parentId) {
                            req.body.parentId = null;
                        }
                        // Create the event object for insertion into database
                        const comment = new Comment({
                            firstParentId: req.body.firstParentId,
                            parentId: req.body.parentId,
                            level: req.body.level,
                            eventId: req.body.eventId,
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
    /* ===============================================================
       GET Comments
    =============================================================== */
    router.get('/getComments/:id/:language', (req, res) => {
        var language = req.params.language;
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            if (!req.params.id) {
                res.json({ success: false, message: eval(language + '.getComment.idProvidedError') }); // Return error
            } else {
                Comment.aggregate([{
                        $match: {
                            eventId: ObjectId(req.params.id)
                        },
                    }, {
                        $sort: {
                            createdAt: 1
                        }
                    }, {
                        // Join with Place table
                        $lookup: {
                            from: "users", // other table name
                            localField: "createdBy", // placeId of Comment table field
                            foreignField: "username", // _id of Place table field
                            as: "user" // alias for userinfo table
                        }
                    }, { $unwind: "$user" },

                    {
                        $group: {
                            _id: { $ifNull: ["$firstParentId", "$_id"] },
                            groupComments: { $push: "$$ROOT" }
                        },
                    },
                    {
                        $sort: {
                            _id: -1,
                        }
                    }
                ]).exec(function(err, comments) {
                    // Check if places were found in database
                    if (!comments) {
                        console.log(comments);
                        res.json({ success: false, message: err }); // Return error of no places found
                    } else {
                        res.json({ success: true, comments: comments }); // Return success and place 
                    }
                });
            }
        }
    });

    return router;
};