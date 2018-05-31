const User = require('../models/user'); // Import User Model Schema
const Application = require('../models/application'); // Import Application Model Schema
const Event = require('../models/event'); // Import Event Model Schema
const Place = require('../models/place'); // Import Event Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
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
       CREATE NEW application
    =============================================================== */
    router.post('/newApplication', (req, res) => {
        var language = req.body.language;
        // Check if language was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            // Check if application users was provided
            if (!req.body.users || req.body.users.length <= 0) {
                res.json({ success: false, message: eval(language + '.newApplication.usersProvidedError') }); // Return error
            } else {
                // Check if application title was provided
                if (!req.body.title) {
                    res.json({ success: false, message: eval(language + '.newApplication.titleProvidedError') }); // Return error
                } else {
                    // Check if application licenseName was provided
                    if (!req.body.licenseName) {
                        res.json({ success: false, message: eval(language + '.newApplication.licenseNameProvidedError') }); // Return error message
                    } else {
                        // Check if application conditions was provided
                        if (!req.body.conditions || req.body.conditions.length <= 0) {
                            res.json({ success: false, message: eval(language + '.newApplication.conditionsProvidedError') }); // Return error message
                        } else {
                            // Check if application price was provided
                            if (!req.body.price) {
                                res.json({ success: false, message: eval(language + '.newApplication.priceProvidedError') }); // Return error message
                            } else {
                                // Check if application expiredAt was provided
                                if (!req.body.expiredAt) {
                                    res.json({ success: false, message: eval(language + '.newApplication.expiredAtProvidedError') }); // Return error message
                                } else {
                                    // Check if application expiredAt was provided
                                    if (!req.body.imagesApplication) {
                                        res.json({ success: false, message: eval(language + '.newApplication.imagesProvidedError') }); // Return error message
                                    } else {
                                        User.findOne({ _id: req.decoded.userId }, function(err, mainUser) {
                                            if (err) {
                                                // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                                var mailOptions = {
                                                    from: "Fred Foo 👻 <" + emailConfig.email + ">", // sender address
                                                    to: [emailConfig.email],
                                                    subject: ' Find one 1 newApplication error ',
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
                                                // Check if logged in user is found in database
                                                if (!mainUser) {
                                                    res.json({ success: false, message: eval(language + '.newApplication.userError') }); // Return error
                                                } else {
                                                    // Check if is admin or moderator
                                                    if (mainUser.permission !== 'admin' && mainUser.permission !== 'moderator') {
                                                        res.json({ success: false, message: eval(language + '.general.permissionError') }); // Return error
                                                    } else {
                                                        const application = new Application({
                                                            language: language,
                                                            users: req.body.users,
                                                            title: req.body.title,
                                                            events: req.body.events,
                                                            entityName: req.body.entityName,
                                                            license: {
                                                                name: req.body.licenseName,
                                                                conditions: req.body.conditions,
                                                                price: req.body.price,
                                                                expiredAt: req.body.expiredAt
                                                            },
                                                            images: req.body.imagesApplication,
                                                            createdAt: Date.now(),
                                                            updatedAt: Date.now()
                                                        });
                                                        // Save application into database
                                                        application.save((err) => {
                                                            // Check if error
                                                            if (err) {
                                                                // Check if error is a validation error
                                                                if (err.errors) {
                                                                    // Check if validation error is in the application field
                                                                    if (err.errors['title']) {
                                                                        res.json({ success: false, message: eval(language + err.errors['title'].message) }); // Return error message
                                                                    } else {
                                                                        if (err.errors['entityName']) {
                                                                            res.json({ success: false, message: eval(language + err.errors['entityName'].message) }); // Return error message
                                                                        } else {
                                                                            res.json({ success: false, message: err }); // Return general error message
                                                                        }
                                                                    }
                                                                } else {
                                                                    res.json({ success: false, message: eval(language + '.newApplication.saveError'), err }); // Return general error message
                                                                }
                                                            } else {
                                                                res.json({ success: true, message: eval(language + '.newApplication.success') }); // Return success message
                                                            }
                                                        });
                                                    }
                                                }
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
    });
    /* ===============================================================
           GET Application
        =============================================================== */
    router.get('/getApplication/:id/:username/:language', (req, res) => {
        var language = req.params.language;
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            if (!req.params.id) {
                res.json({ success: false, message: eval(language + '.getApplication.idProvidedError') }); // Return error
            } else {
                if (!req.params.username) {
                    res.json({ success: false, message: eval(language + '.getApplication.usernameProvidedError') }); // Return error
                } else {
                    // Look for logged in user in database to check if have appropriate access
                    User.findOne({ _id: req.decoded.userId }, function(err, mainUser) {
                        if (err) {
                            // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                            var mailOptions = {
                                from: "Fred Foo 👻 <" + emailConfig.email + ">", // sender address
                                to: [emailConfig.email],
                                subject: ' Find one 1 get application error ',
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
                            // Check if logged in user is found in database
                            if (!mainUser) {
                                res.json({ success: false, message: eval(language + '.getApplication.userError') }); // Return error
                            } else {
                                // Look for user in database
                                User.findOne({ username: req.params.username }, function(err, user) {
                                    if (err) {
                                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                        var mailOptions = {
                                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                            to: [emailConfig.email],
                                            subject: ' Find one 2 get application error ',
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
                                        // Check if user is in database
                                        if (!user) {
                                            res.json({ success: false, message: eval(language + '.getApplication.userError') }); // Return error
                                        } else {
                                            var saveErrorPermission = false;
                                            // Check if is owner
                                            if (mainUser._id.toString() === user._id.toString()) {} else {
                                                // Check if the current permission is 'admin'
                                                if (mainUser.permission === 'admin') {
                                                    // Check if user making changes has access
                                                    if (user.permission === 'admin') {
                                                        saveErrorPermission = language + '.general.adminOneError';
                                                    } else {}
                                                } else {
                                                    // Check if the current permission is moderator
                                                    if (mainUser.permission === 'moderator') {
                                                        // Check if contributor making changes has access
                                                        if (user.permission === 'contributor') {} else {
                                                            saveErrorPermission = language + '.general.adminOneError';
                                                        }
                                                    } else {
                                                        saveErrorPermission = language + '.general.permissionError';
                                                    }
                                                }
                                            }
                                            //check saveError permision to save changes or not
                                            if (saveErrorPermission) {
                                                res.json({ success: false, message: eval(saveErrorPermission) }); // Return error
                                            } else {
                                                Application.aggregate([{
                                                        $match: {
                                                            language: language,
                                                            _id: ObjectId(req.params.id)
                                                        }
                                                    }, {
                                                        // Join with Events table
                                                        $lookup: {
                                                            from: "events",
                                                            localField: "events",
                                                            foreignField: "_id",
                                                            as: "eventsArray"
                                                        }
                                                    },
                                                    // Join with Place table
                                                    {
                                                        $lookup: {
                                                            from: "places",
                                                            localField: "eventsArray.placeId",
                                                            foreignField: "_id",
                                                            as: "places"
                                                        },
                                                    },
                                                    // Join with Category table
                                                    {
                                                        $lookup: {
                                                            from: "categories",
                                                            localField: "eventsArray.categoryId",
                                                            foreignField: "_id",
                                                            as: "categories"
                                                        },
                                                    }
                                                ]).exec(function(err, application) {
                                                    // Check if places were found in database
                                                    if (!application) {
                                                        res.json({ success: false, message: eval(language + '.eventsSearch.placesError') }); // Return error of no places found
                                                    } else {
                                                        if (application.length === 0) {;
                                                            Application.findOne({
                                                                language: language,
                                                                _id: ObjectId(req.params.id)
                                                            }, (err, application) => {
                                                                // Check if error was found or not
                                                                if (err) {
                                                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                                                    var mailOptions = {
                                                                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                                                        to: [emailConfig.email], // list of receivers
                                                                        subject: ' Find 3 get application error ',
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
                                                                    // Check if application were found in database
                                                                    if (!application) {
                                                                        res.json({ success: false, message: eval(language + '.getApplication.applicationError') }); // Return error of no application found
                                                                    } else {
                                                                        res.json({ success: true, application: application }); // Return success and place 
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            res.json({ success: true, application: application[0] }); // Return success and place 
                                                        }
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
        }
    });
    /* ===============================================================
              GET Application
           =============================================================== */
    router.get('/getApplicationEvents/:id/:language', (req, res) => {
        var language = req.params.language;
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            if (!req.params.id) {
                res.json({ success: false, message: eval(language + '.getApplication.idProvidedError') }); // Return error
            } else {
                Application.findOne({
                    language: language,
                    _id: req.params.id
                }, (err, application) => {
                    // Check if error was found or not
                    if (err) {
                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                        var mailOptions = {
                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                            to: [emailConfig.email], // list of receivers
                            subject: ' Find 1 get applicationEvents error ',
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
                        // Check if application were found in database
                        if (!application) {
                            res.json({ success: false, message: eval(language + '.getApplication.applicationError') }); // Return error of no application found
                        } else {
                            // Search database for all application Events
                            Event.find({
                                _id: application.events,
                                language: language
                            }).sort({ 'start': 1 }).exec((err, events) => {
                                // Check if error was found or not
                                if (err) {
                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                    var mailOptions = {
                                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                        to: [emailConfig.email], // list of receivers
                                        subject: ' Find 2 get applicationEevents error ',
                                        text: 'The following error has been reported in the Kultura: ' + err,
                                        html: 'The following error has been reported in the Kultura:<br><br>' + err
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
                                    // Check if events were found in database
                                    if (!events) {
                                        res.json({ success: false, message: eval(language + '.eventsSearch.eventsError') }); // Return error of no events found
                                    } else {
                                        res.json({ success: true, events: events }); // Return success and event 
                                    }
                                }
                            }); // Sort events from newest to oldest
                        }
                    }
                });
            }
        }
    });
    /* ===============================================================
           GET ALL user applications
        =============================================================== */
    router.get('/userApplications/:username/:language', (req, res) => {
        var language = req.params.language;
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            if (!req.params.username) {
                res.json({ success: false, message: eval(language + '.userApplications.usernameProvidedError') }); // Return error
            } else {
                // Look for logged in user in database to check if have appropriate access
                User.findOne({ _id: req.decoded.userId }, function(err, mainUser) {
                    if (err) {
                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                        var mailOptions = {
                            from: "Fred Foo 👻 <" + emailConfig.email + ">", // sender address
                            to: [emailConfig.email],
                            subject: ' Find one 1 all user applications error ',
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
                        // Check if logged in user is found in database
                        if (!mainUser) {
                            res.json({ success: false, message: eval(language + '.userApplications.userError') }); // Return error
                        } else {
                            // Look for user in database
                            User.findOne({ username: req.params.username }, function(err, user) {
                                if (err) {
                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                    var mailOptions = {
                                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                        to: [emailConfig.email],
                                        subject: ' Find one 2 all user applications error ',
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
                                    // Check if user is in database
                                    if (!user) {
                                        res.json({ success: false, message: eval(language + '.userApplications.userError') }); // Return error
                                    } else {
                                        var saveErrorPermission = false;
                                        // Check if is owner
                                        if (mainUser._id.toString() === user._id.toString()) {} else {
                                            // Check if the current permission is 'admin'
                                            if (mainUser.permission === 'admin') {
                                                // Check if user making changes has access
                                                if (user.permission === 'admin') {
                                                    saveErrorPermission = language + '.general.adminOneError';
                                                } else {}
                                            } else {
                                                // Check if the current permission is moderator
                                                if (mainUser.permission === 'moderator') {
                                                    // Check if contributor making changes has access
                                                    if (user.permission === 'contributor') {} else {
                                                        saveErrorPermission = language + '.general.adminOneError';
                                                    }
                                                } else {
                                                    saveErrorPermission = language + '.general.permissionError';
                                                }
                                            }
                                        }
                                        //check saveError permision to save changes or not
                                        if (saveErrorPermission) {
                                            res.json({ success: false, message: eval(saveErrorPermission) }); // Return error
                                        } else {
                                            Application.find({
                                                language: language,
                                                users: req.params.username
                                            }).sort({ 'expiredAt': 1 }).exec((err, applications) => {
                                                // Check if error was found or not
                                                if (err) {
                                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                                    var mailOptions = {
                                                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                                        to: [emailConfig.email], // list of receivers
                                                        subject: ' Find 3 all user applications error ',
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
                                                    // Check if applications were found in database
                                                    if (!applications) {
                                                        res.json({ success: false, message: eval(language + '.userApplications.applicationsError') }); // Return error of no applications found
                                                    } else {
                                                        res.json({ success: true, applications: applications }); // Return success and applications array
                                                    }
                                                }
                                            }); // Sort applications by expired date
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
    /* ===============================================================
            Route to update/edit a application
        =============================================================== */
    router.put('/editApplication', function(req, res) {
        var language = req.body.language;
        // Check if language was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            // Check if id was provided
            if (!req.body._id) {
                res.json({ success: false, message: eval(language + '.editApplication.idProvidedError') }); // Return error
            } else {
                // Check if application users was provided
                if (!req.body.users || req.body.users.length <= 0) {
                    res.json({ success: false, message: eval(language + '.editApplication.usersProvidedError') }); // Return error
                } else {
                    if (req.body.language) var newLanguage = req.body.language; // Check if a change to language was requested
                    if (req.body.users) var newUsers = req.body.users; // Check if a change to users was requested
                    if (req.body.title) var newTitle = req.body.title; // Check if a change to title was requested
                    if (req.body.events) var newEvents = req.body.events; // Check if a change to events was requested
                    if (req.body.entityName) var newEntityName = req.body.entityName; // Check if a change to entityName was requested
                    if (req.body.name) var newName = req.body.name; // Check if a change to name was requested
                    if (req.body.conditions) var newConditions = req.body.conditions; // Check if a change to conditions was requested
                    if (req.body.price) var newPrice = req.body.price; // Check if a change to price was requested
                    if (req.body.expiredAt) var newExpiredAt = req.body.expiredAt; // Check if a change to expiredAt was requested
                    // Look for logged in user in database to check if have appropriate access
                    User.findOne({ _id: req.decoded.userId }, function(err, mainUser) {
                        if (err) {
                            // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                            var mailOptions = {
                                from: "Fred Foo 👻 <" + emailConfig.email + ">", // sender address
                                to: [emailConfig.email],
                                subject: ' Find one 1 edit application error ',
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
                            // Check if logged in user is found in database
                            if (!mainUser) {
                                res.json({ success: false, message: eval(language + '.editUser.userError') }); // Return error
                            } else {
                                // Look for users in database
                                User.find({ username: req.body.users }, function(err, users) {
                                    if (err) {
                                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                        var mailOptions = {
                                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                            to: [emailConfig.email],
                                            subject: ' Find one 2 edit application error ',
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
                                        // Check if user is in database
                                        if (users.length <= 0) {
                                            res.json({ success: false, message: eval(language + '.editUser.userError') }); // Return error
                                        } else {
                                            var saveErrorPermission = false;
                                            // Check if is owner
                                            if (users.includes(mainUser._id)) {} else {
                                                // Check if the current permission is 'admin'
                                                if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {} else {
                                                    saveErrorPermission = language + '.general.permissionError';
                                                }
                                            }
                                            //check saveError permision to save changes or not
                                            if (saveErrorPermission) {
                                                res.json({ success: false, message: eval(saveErrorPermission) }); // Return error
                                            } else {
                                                // Look for application in database
                                                Application.findOne({ _id: ObjectId(req.body._id) }, function(err, application) {
                                                    if (err) {
                                                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                                        var mailOptions = {
                                                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                                            to: [emailConfig.email],
                                                            subject: ' Find one 3 edit application error ',
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
                                                        // Check if application is in database
                                                        if (!application) {
                                                            res.json({ success: false, message: eval(language + '.editUser.userError') }); // Return error
                                                        } else {
                                                            if (newLanguage)
                                                                application.language = newLanguage; // Assign new language to application in database
                                                            if (newUsers)
                                                                application.users = newUsers; // Assign new users to application in database
                                                            if (newTitle)
                                                                application.title = newTitle; // Assign new title to application in database
                                                            if (newEvents)
                                                                application.events = newEvents; // Assign new events to application in database
                                                            if (newEntityName)
                                                                application.entityName = newEntityName; // Assign new entityName to application in database
                                                            if (newName)
                                                                application.license.name = newName; // Assign new name to application in database
                                                            if (newConditions)
                                                                application.license.conditions = newConditions; // Assign new conditions to application in database
                                                            if (newPrice)
                                                                application.license.price = newPrice; // Assign new price to application in database
                                                            if (newExpiredAt)
                                                                application.license.expiredAt = newExpiredAt; // Assign new expiredAt to application in database
                                                            application.updatedAt = Date.now();
                                                            // Save application into database
                                                            application.save((err, application) => {
                                                                // Check if error
                                                                if (err) {
                                                                    // Check if error is a validation error
                                                                    if (err.errors) {
                                                                        // Check if validation error is in the category field
                                                                        if (err.errors['title']) {
                                                                            res.json({ success: false, message: eval(language + err.errors['title'].message) }); // Return error message
                                                                        } else {
                                                                            if (err.errors['name']) {
                                                                                res.json({ success: false, message: eval(language + err.errors['name'].message) }); // Return error message
                                                                            } else {
                                                                                res.json({ success: false, message: err }); // Return general error message
                                                                            }
                                                                        }
                                                                    } else {
                                                                        res.json({ success: false, message: eval(language + '.editApplication.saveError'), err }); // Return general error message
                                                                    }
                                                                } else {
                                                                    res.json({ success: true, message: eval(language + '.editApplication.success') }); // Return success message
                                                                }
                                                            });
                                                        }
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
        }
    });
    return router;
};