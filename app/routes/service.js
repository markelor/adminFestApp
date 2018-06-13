const User = require('../models/user'); // Import User Model Schema
const Service = require('../models/service'); // Import Service Model Schema
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
       CREATE NEW service
    =============================================================== */
    router.post('/newService', (req, res) => {
        var language = req.body.language;
        // Check if language was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            // Check if service serviceTypeId was provided
            if (!req.body.serviceTypeId) {
                res.json({ success: false, message: eval(language + '.newService.serviceTypeIdProvidedError') }); // Return error
            } else {
                // Check if service title was provided
                if (!req.body.title) {
                    res.json({ success: false, message: eval(language + '.newService.titleProvidedError') }); // Return error
                } else {
                    // Check if service description was provided
                    if (!req.body.description) {
                        res.json({ success: false, message: eval(language + '.newService.descriptionProvidedError') }); // Return error message
                    } else {
                        // Check if place lat was provided
                        if (!req.body.place.lat) {
                            res.json({ success: false, message: eval(language + '.newService.latProvidedError') }); // Return error message
                        } else {
                            // Check if place lng was provided
                            if (!req.body.place.lng) {
                                res.json({ success: false, message: eval(language + '.newService.lngProvidedError') }); // Return error message
                            } else {
                                const service = new Service({
                                    serviceTypeId:req.body.serviceTypeId,
                                    language: language,
                                    title: req.body.title,
                                    description: req.body.description,
                                    coordinates: {
                                        lat: req.body.place.lat,
                                        lng: req.body.place.lng
                                    },
                                    createdAt: Date.now(),
                                    updatedAt: Date.now()
                                });
                                // Save service into database
                                service.save((err) => {
                                    // Check if error
                                    if (err) {
                                        console.log(err);
                                        // Check if error is a validation error
                                        if (err.errors) {
                                            // Check if validation error is in the service field
                                            if (err.errors['title']) {
                                                res.json({ success: false, message: eval(language + err.errors['title'].message) }); // Return error message
                                            } else {
                                                if (err.errors['description']) {
                                                    res.json({ success: false, message: eval(language + err.errors['description'].message) }); // Return error message
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
                                            }
                                        } else {
                                            res.json({ success: false, message: eval(language + '.newService.saveError'), err }); // Return general error message
                                        }
                                    } else {
                                        res.json({ success: true, message: eval(language + '.newService.success') }); // Return success message
                                    }
                                });

                            }
                        }
                    }
                }
            }
        }
    });

    /* ===============================================================
       GET Services
    =============================================================== */
    router.get('/getServices/:language', (req, res) => {
        var language = req.params.language;
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            Service.find({
                $or: [{ language: language }, { translation: { $elemMatch: { language: language } } }]
            }).sort({ '_id': 1 }).exec((err, services) => {
                // Check if error was found or not
                if (err) {
                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                    var mailOptions = {
                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                        to: [emailConfig.email], // list of receivers
                        subject: ' Find 1 services service error ',
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
                    // Check if services were found in database
                    if (!services) {
                        res.json({ success: false, message: eval(language + '.newService.servicesError') }); // Return error of no services found
                    } else {
                        res.json({ success: true, services: services }); // Return success and services array
                    }
                }
            }); // Sort services from newest to oldest

        }

    });
    /* ===============================================================
        Route to update/edit a service
    =============================================================== */
    router.put('/editService', (req, res) => {
        var language = req.body.language;
        if (req.body.firstParentId) var newFirstParentId = req.body.firstParentId; // Check if a change to firstParentId was requested
        if (req.body.parentId) {}
        var newParentId = req.body.parentId; // Check if a change to parentId was requested
        if (req.body.level) var newLevel = req.body.level; // Check if a change to level was requested
        if (req.body.title) var newTitle = req.body.title; // Check if a change to title was requested
        if (req.body.description) var newDescription = req.body.description; // Check if a change to description was requested
        if (req.body.translation) var newTranslation = req.body.translation; //Check if a change to translation was requested
        // Check if id was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            if (!req.body._id) {
                res.json({ success: false, message: eval(language + '.updateService.idProvidedError') }); // Return error message
            } else {
                // Check if id exists in database
                Service.findOne({
                    _id: req.body._id
                }, (err, service) => {
                    // Check if id is a valid ID
                    if (err) {
                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                        var mailOptions = {
                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                            to: [emailConfig.email], // list of receivers
                            subject: ' Find one 1 edit service error ',
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
                        if (!service) {
                            res.json({ success: false, message: eval(language + '.updateService.serviceError') }); // Return error message
                        } else {
                            // Check who user is that is requesting caregory update
                            User.findOne({ _id: req.decoded.userId }, (err, user) => {
                                // Check if error was found
                                if (err) {
                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                    var mailOptions = {
                                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                        to: [emailConfig.email], // list of receivers
                                        subject: ' Find one 2 edit service error ',
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
                                        res.json({ success: false, message: eval(language + '.updateService.userError') }); // Return error message
                                    } else {
                                        if (user.permission !== 'admin') {
                                            res.json({ success: false, message: eval(language + '.updateService.permissionError') }); // Return error message
                                        } else {
                                            if (newFirstParentId) service.firstParentId = newFirstParentId; // Assign new firstParentId to service in database
                                            if (newParentId) {
                                                service.parentId = newParentId;
                                            } else {
                                                service.parentId = null;
                                            }
                                            // Assign new parentId to service in database
                                            if (newLevel) service.level = newLevel; // Assign new level to service in database
                                            if (newTitle) service.title = newTitle; // Assign new title to service in database
                                            if (newDescription) service.description = newDescription; // Assign new description to service in database
                                            if (newTranslation) service.translation = newTranslation; // Assign new translation to service in database
                                            service.save((err) => {
                                                if (err) {
                                                    if (err.errors) {
                                                        // Check if validation error is in the service field
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
                                                        res.json({ success: false, message: eval(language + '.updateService.saveError'), err }); // Return general error message
                                                    }
                                                } else {
                                                    res.json({ success: true, message: eval(language + '.updateService.success') }); // Return success message
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