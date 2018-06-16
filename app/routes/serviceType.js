const User = require('../models/user'); // Import User Model Schema
const ServiceType = require('../models/serviceType'); // Import ServiceType Model Schema
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
       CREATE NEW serviceType
    =============================================================== */
    router.post('/newServiceType', (req, res) => {
        var language = req.body.language;
        // Check if language was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            // Check if serviceType title was provided
            if (!req.body.title) {
                res.json({ success: false, message: eval(language + '.newServiceType.titleProvidedError') }); // Return error
            } else {
                const serviceType = new ServiceType({
                    language: language,
                    title: req.body.title,
                    icons:req.body.icons,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                });
                // Save serviceType into database
                serviceType.save((err) => {
                    // Check if error
                    if (err) {
                        console.log(err);
                        // Check if error is a validation error
                        if (err.errors) {
                            // Check if validation error is in the serviceType field
                            if (err.errors['title']) {
                                res.json({ success: false, message: eval(language + err.errors['title'].message) }); // Return error message
                            } else {
                               res.json({ success: false, message: err }); // Return general error message
                            }
                        } else {
                            res.json({ success: false, message: eval(language + '.newServiceType.saveError'), err }); // Return general error message
                        }
                    } else {
                        res.json({ success: true, message: eval(language + '.newServiceType.success') }); // Return success message
                    }
                });

            }
        }

    });

    /* ===============================================================
       GET ServiceTypes
    =============================================================== */
    router.get('/getServiceTypes/:language', (req, res) => {
        var language = req.params.language;
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            ServiceType.find({
                $or: [{ language: language }, { translation: { $elemMatch: { language: language } } }]
            }).sort({ '_id': 1 }).exec((err, serviceTypes) => {
                // Check if error was found or not
                if (err) {
                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                    var mailOptions = {
                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                        to: [emailConfig.email], // list of receivers
                        subject: ' Find 1 serviceTypes serviceType error ',
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
                    // Check if serviceTypes were found in database
                    if (!serviceTypes) {
                        res.json({ success: false, message: eval(language + '.serviceTypes.serviceTypesError') }); // Return error of no serviceTypes found
                    } else {
                        res.json({ success: true, serviceTypes: serviceTypes }); // Return success and serviceTypes array
                    }
                }
            }); // Sort serviceTypes from newest to oldest

        }

    });
    /* ===============================================================
        Route to update/edit a serviceType
    =============================================================== */
    router.put('/editServiceType', (req, res) => {
        var language = req.body.language;
        if (req.body.title) var newTitle = req.body.title; // Check if a change to title was requested
        if (req.body.translation) var newTranslation = req.body.translation; //Check if a change to translation was requested
        if (req.body.icons) var newIcons = req.body.icons; // Check if a change to icons was requested
        // Check if id was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            if (!req.body._id) {
                res.json({ success: false, message: eval(language + '.editServiceType.idProvidedError') }); // Return error message
            } else {
                // Check if id exists in database
                ServiceType.findOne({
                    _id: req.body._id
                }, (err, serviceType) => {
                    // Check if id is a valid ID
                    if (err) {
                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                        var mailOptions = {
                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                            to: [emailConfig.email], // list of receivers
                            subject: ' Find one 1 edit serviceType error ',
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
                        if (!serviceType) {
                            res.json({ success: false, message: eval(language + '.editServiceType.serviceTypeError') }); // Return error message
                        } else {
                            // Check who user is that is requesting caregory update
                            User.findOne({ _id: req.decoded.userId }, (err, user) => {
                                // Check if error was found
                                if (err) {
                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                    var mailOptions = {
                                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                        to: [emailConfig.email], // list of receivers
                                        subject: ' Find one 2 edit serviceType error ',
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
                                        res.json({ success: false, message: eval(language + '.editServiceType.userError') }); // Return error message
                                    } else {
                                        if (user.permission !== 'admin') {
                                            res.json({ success: false, message: eval(language + '.editServiceType.permissionError') }); // Return error message
                                        } else {
                                           
                                            if (newTitle) serviceType.title = newTitle; // Assign new title to serviceType in database
                                            if (newIcons) serviceType.icons = newIcons; // Assign new icons to serviceType in database
                                            if (newTranslation) serviceType.translation = newTranslation; // Assign new translation to serviceType in database
                                            serviceType.save((err) => {
                                                if (err) {
                                                    if (err.errors) {
                                                        // Check if validation error is in the serviceType field
                                                        if (err.errors['title']) {
                                                            res.json({ success: false, message: eval(language + err.errors['title'].message) }); // Return error message
                                                        } else {
                                                            res.json({ success: false, message: err }); // Return general error message
                                                        }
                                                    } else {
                                                        res.json({ success: false, message: eval(language + '.editServiceType.saveError'), err }); // Return general error message
                                                    }
                                                } else {
                                                    res.json({ success: true, message: eval(language + '.editServiceType.success') }); // Return success message
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