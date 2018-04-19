const User = require('../models/user'); // Import User Model Schema
const Event = require('../models/event'); // Import Event Model Schema
const Place = require('../models/place'); // Import Place Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const es = require('../translate/es'); // Import translate es
const eu = require('../translate/eu'); // Import translate eu
const en = require('../translate/en'); // Import translate en
const nodemailer = require('nodemailer');
const emailConfig = require('../config/email'); // Mongoose Email
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
       CREATE NEW category
    =============================================================== */
    router.post('/newEvent', (req, res) => {
        var language = req.body.event.language;
        // Check if language was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            // Check if event createdBy was provided
            if (!req.body.event.createdBy) {
                res.json({ success: false, message: eval(language + '.newEvent.createdByProvidedError') }); // Return error
            } else {
                // Check if event category was provided
                if (!req.body.event.categoryId) {
                    res.json({ success: false, message: eval(language + '.newEvent.categoryIdProvidedError') }); // Return error
                } else {
                    // Check if event title was provided
                    if (!req.body.event.title) {
                        res.json({ success: false, message: eval(language + '.newEvent.titleProvidedError') }); // Return error message
                    } else {
                        // Check if event start was provided
                        if (!req.body.event.start) {
                            res.json({ success: false, message: eval(language + '.newEvent.startProvidedError') }); // Return error message
                        } else {
                            // Check if event end was provided
                            if (!req.body.event.end) {
                                res.json({ success: false, message: eval(language + '.newEvent.endProvidedError') }); // Return error message
                            } else {
                                // Check if event description was provided
                                if (!req.body.event.description) {
                                    res.json({ success: false, message: eval(language + '.newEvent.descriptionProvidedError') }); // Return error message
                                } else {
                                    // Check if place province was provided
                                    if (!req.body.place.province) {
                                        res.json({ success: false, message: eval(language + '.newPlace.provinceProvidedError') }); // Return error message
                                    } else {
                                        // Check if place municiàlity was provided
                                        if (!req.body.place.municipality) {
                                            res.json({ success: false, message: eval(language + '.newPlace.municipalityProvidedError') }); // Return error message
                                        } else {
                                            // Check if place lat was provided
                                            if (!req.body.place.lat) {
                                                res.json({ success: false, message: eval(language + '.newPlace.latProvidedError') }); // Return error message
                                            } else {
                                                // Check if place lng was provided
                                                if (!req.body.place.lng) {
                                                    res.json({ success: false, message: eval(language + '.newPlace.lngProvidedError') }); // Return error message
                                                } else {
                                                    const event = new Event({
                                                        createdBy: req.body.event.createdBy,
                                                        categoryId: req.body.event.categoryId,
                                                        language: language,
                                                        title: req.body.event.title,
                                                        coordinators: req.body.event.coordinators,
                                                        start: req.body.event.start,
                                                        end: req.body.event.end,
                                                        description: req.body.event.description,
                                                        images: {
                                                            posters: req.body.event.imagesPoster,
                                                            description: req.body.event.imagesDescription
                                                        },
                                                        createdAt: Date.now(),
                                                        updatedAt: Date.now()
                                                    });
                                                    // Save event into database
                                                    event.save((err, event) => {
                                                        // Check if error
                                                        if (err) {
                                                            // Check if error is a validation error
                                                            if (err.errors) {
                                                                // Check if validation error is in the category field
                                                                if (err.errors['title']) {
                                                                    res.json({ success: false, message: eval(language + err.errors['title'].message) }); // Return error message
                                                                } else {
                                                                    if (err.errors['description']) {
                                                                        res.json({ success: false, message: eval(language + err.errors['description'].message) }); // Return error message
                                                                    } else {
                                                                        if (err.errors['observations']) {
                                                                            res.json({ success: false, message: eval(language + err.errors['observations'].message) }); // Return error message
                                                                        } else {
                                                                            res.json({ success: false, message: err }); // Return general error message
                                                                        }
                                                                    }

                                                                }
                                                            } else {
                                                                res.json({ success: false, message: eval(language + '.newEvent.saveError'), err }); // Return general error message
                                                            }
                                                        } else {
                                                            const place = new Place({
                                                                eventId: event._id,
                                                                language: language,
                                                                province: req.body.place.province,
                                                                municipality: req.body.place.municipality,
                                                                location: req.body.place.location,
                                                                coordinates: {
                                                                    lat: req.body.place.lat,
                                                                    lng: req.body.place.lng
                                                                },
                                                                createdAt: Date.now(),
                                                                updatedAt: Date.now()
                                                            });
                                                            // Save place into database
                                                            place.save((err) => {
                                                                // Check if error
                                                                if (err) {
                                                                    // Check if error is a validation error
                                                                    event.remove((err) => {
                                                                        if (err) {
                                                                            res.json({ success: false, message: eval(language + '.deleteEvent.saveError'), err }); // Return general error message
                                                                        }
                                                                    });
                                                                    if (err.errors) {
                                                                        console.log(err.errors);
                                                                        // Check if validation error is in the category field
                                                                        if (err.errors['location']) {
                                                                            res.json({ success: false, message: eval(language + err.errors['location'].message) }); // Return error message
                                                                        } else {
                                                                            if (err.errors['coordinates.lat']) {
                                                                                res.json({ success: false, message: eval(language + err.errors['coordinates.lat'].message) }); // Return error message
                                                                            } else {
                                                                                if (err.errors['coordinates.lng']) {
                                                                                    res.json({ success: false, message: eval(language + err.errors['coordinates.lng'].message) }); // Return error message
                                                                                } else {
                                                                                    res.json({ success: false, message: err }); // Return general error message
                                                                                }
                                                                            }
                                                                        }
                                                                    } else {
                                                                        res.json({ success: false, message: eval(language + '.newPlace.saveError'), err }); // Return general error message
                                                                    }
                                                                } else {
                                                                    res.json({ success: true, message: eval(language + '.newEvent.success') }); // Return success message
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    /* ===============================================================
       GET ALL categories
    =============================================================== */
    router.get('/allCategories/:language', (req, res) => {
        var language = req.params.language;
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            Category.find({
                language: language
            }).sort({ '_id': 1 }).exec((err, categories) => {
                // Check if error was found or not
                if (err) {
                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                    var mailOptions = {
                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                        to: [emailConfig.email], // list of receivers
                        subject: ' Find 1 allCategories category error ',
                        text: 'The following error has been reported in Kultura: ' + err,
                        html: 'The following error has been reported in Kultura:<br><br>' + err
                    };
                    // Function to send e-mail to myself
                    transporter.sendMail(mailOptions, function(err, info) {
                        if (err) {
                            console.log(err); // If error with sending e-mail, log to console/terminal
                        } else {
                            console.log(info); // Log success message to console if sent
                            console.log(user.email); // Display e-mail that it was sent to
                        }
                    });
                    res.json({ success: false, message: eval(language + '.general.generalError') });
                } else {
                    // Check if categories were found in database
                    if (!categories) {
                        res.json({ success: false, message: eval(language + '.allCategories.categoriesError') }); // Return error of no categories found
                    } else {
                        res.json({ success: true, categories: categories }); // Return success and categories array
                    }
                }
            }); // Sort categories from newest to oldest

        }

    });
    /* ===============================================================
        Route to update/edit a category
    =============================================================== */
    router.put('/updateCategory', (req, res) => {
        var language = req.body.language;
        if (req.body.firstParentId) var newFirstParentId = req.body.firstParentId; // Check if a change to firstParentId was requested
        if (req.body.parentId) var newParentId = req.body.parentId; // Check if a change to parentId was requested
        if (req.body.level) var newLevel = req.body.level; // Check if a change to level was requested
        if (req.body.title) var newTitle = req.body.title; // Check if a change to title was requested
        if (req.body.description) var newDescription = req.body.description; // Check if a change to description was requested
        // Check if id was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            if (!req.body._id) {
                res.json({ success: false, message: eval(language + '.updateCategory.idProvidedError') }); // Return error message
            } else {
                // Check if id exists in database
                Category.findOne({
                    _id: req.body._id
                }, (err, category) => {
                    // Check if id is a valid ID
                    if (err) {
                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                        var mailOptions = {
                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                            to: [emailConfig.email], // list of receivers
                            subject: ' Find one 1 edit category error ',
                            text: 'The following error has been reported in Kultura: ' + err,
                            html: 'The following error has been reported in Kultura:<br><br>' + err
                        };
                        // Function to send e-mail to myself
                        transporter.sendMail(mailOptions, function(err, info) {
                            if (err) {
                                console.log(err); // If error with sending e-mail, log to console/terminal
                            } else {
                                console.log(info); // Log success message to console if sent
                                console.log(user.email); // Display e-mail that it was sent to
                            }
                        });
                        res.json({ success: false, message: eval(language + '.general.generalError') });
                    } else {
                        // Check if id was found in the database
                        if (!category) {
                            res.json({ success: false, message: eval(language + '.updateCategory.categoryError') }); // Return error message
                        } else {
                            // Check who user is that is requesting caregory update
                            User.findOne({ _id: req.decoded.userId }, (err, user) => {
                                // Check if error was found
                                if (err) {
                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                    var mailOptions = {
                                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                        to: [emailConfig.email], // list of receivers
                                        subject: ' Find one 2 edit category error ',
                                        text: 'The following error has been reported in Kultura: ' + err,
                                        html: 'The following error has been reported in Kultura:<br><br>' + err
                                    }; // Function to send e-mail to myself
                                    transporter.sendMail(mailOptions, function(err, info) {
                                        if (err) {
                                            console.log(err); // If error with sending e-mail, log to console/terminal
                                        } else {
                                            console.log(info); // Log success message to console if sent
                                            console.log(user.email); // Display e-mail that it was sent to
                                        }
                                    });
                                    res.json({ success: false, message: eval(language + '.general.generalError') });
                                } else {
                                    // Check if user was found in the database
                                    if (!user) {
                                        res.json({ success: false, message: eval(language + '.updateCategory.userError') }); // Return error message
                                    } else {
                                        if (user.permission !== 'admin') {
                                            res.json({ success: false, message: eval(language + '.updateCategory.permissionError') }); // Return error message
                                        } else {
                                            if (newFirstParentId) category.firstParentId = newFirstParentId; // Assign new firstParentId to category in database
                                            if (newParentId) category.parentId = newParentId; // Assign new parentId to category in database
                                            if (newLevel) category.level = newLevel; // Assign new level to category in database
                                            if (newTitle) category.title = newTitle; // Assign new title to category in database
                                            if (newDescription) category.description = newDescription; // Assign new description to category in database
                                            category.save((err) => {
                                                if (err) {
                                                    if (err.errors) {
                                                        // Check if validation error is in the category field
                                                        if (err.errors['title']) {
                                                            res.json({ success: false, message: eval(language + err.errors['title'].message) }); // Return error message
                                                        } else {
                                                            if (err.errors['description']) {
                                                                res.json({ success: false, message: eval(language + err.errors['description'].message) }); // Return error message
                                                            } else {
                                                                res.json({ success: false, message: err }); // Return general error message
                                                            }
                                                        }
                                                    } else {
                                                        res.json({ success: false, message: eval(language + '.updateCategory.saveError'), err }); // Return general error message
                                                    }
                                                } else {
                                                    res.json({ success: true, message: eval(language + '.updateCategory.success') }); // Return success message
                                                }
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });

    return router;
};