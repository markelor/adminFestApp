const User = require('../models/user'); // Import User Model Schema
const Aplication = require('../models/aplication'); // Import Aplication Model Schema
const Event = require('../models/event'); // Import Event Model Schema
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
       CREATE NEW aplication
    =============================================================== */
    router.post('/newAplication', (req, res) => {
        var language = req.body.language;
        // Check if language was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            // Check if aplication users was provided
            if (!req.body.users || req.body.users.length <= 0) {
                res.json({ success: false, message: eval(language + '.newAplication.usersProvidedError') }); // Return error
            } else {
                // Check if aplication title was provided
                if (!req.body.title) {
                    res.json({ success: false, message: eval(language + '.newAplication.titleProvidedError') }); // Return error
                } else {
                    // Check if aplication licenseName was provided
                    if (!req.body.licenseName) {
                        res.json({ success: false, message: eval(language + '.newAplication.licenseNameProvidedError') }); // Return error message
                    } else {
                        // Check if aplication conditions was provided
                        if (!req.body.conditions || req.body.conditions.length <= 0) {
                            res.json({ success: false, message: eval(language + '.newAplication.conditionsProvidedError') }); // Return error message
                        } else {
                            // Check if aplication price was provided
                            if (!req.body.price) {
                                res.json({ success: false, message: eval(language + '.newAplication.priceProvidedError') }); // Return error message
                            } else {
                                // Check if aplication expiredAt was provided
                                if (!req.body.expiredAt) {
                                    res.json({ success: false, message: eval(language + '.newAplication.expiredAtProvidedError') }); // Return error message
                                } else {
                                    User.findOne({ _id: req.decoded.userId }, function(err, mainUser) {
                                        if (err) {
                                            // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                            var mailOptions = {
                                                from: "Fred Foo 👻 <" + emailConfig.email + ">", // sender address
                                                to: [emailConfig.email],
                                                subject: ' Find one 1 newAplication error ',
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
                                                res.json({ success: false, message: eval(language + '.newAplication.userError') }); // Return error
                                            } else {
                                                // Check if is admin or moderator
                                                if (mainUser.permission !== 'admin' && mainUser.permission !== 'moderator') {
                                                    res.json({ success: false, message: eval(language + '.general.permissionError') }); // Return error
                                                } else {
                                                    const aplication = new Aplication({
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
                                                        createdAt: Date.now(),
                                                        updatedAt: Date.now()
                                                    });
                                                    // Save aplication into database
                                                    aplication.save((err) => {
                                                        // Check if error
                                                        if (err) {
                                                            console.log(err);
                                                            // Check if error is a validation error
                                                            if (err.errors) {
                                                                // Check if validation error is in the aplication field
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
                                                                res.json({ success: false, message: eval(language + '.newAplication.saveError'), err }); // Return general error message
                                                            }
                                                        } else {
                                                            res.json({ success: true, message: eval(language + '.newAplication.success') }); // Return success message
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
    });
    /* ===============================================================
           GET Aplication
        =============================================================== */
    router.get('/getAplication/:id/:username/:language', (req, res) => {
        var language = req.params.language;
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            if (!req.params.id) {
                res.json({ success: false, message: eval(language + '.getAplication.idProvidedError') }); // Return error
            } else {
                if (!req.params.username) {
                    res.json({ success: false, message: eval(language + '.getAplication.usernameProvidedError') }); // Return error
                } else {
                    // Look for logged in user in database to check if have appropriate access
                    User.findOne({ _id: req.decoded.userId }, function(err, mainUser) {
                        if (err) {
                            // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                            var mailOptions = {
                                from: "Fred Foo 👻 <" + emailConfig.email + ">", // sender address
                                to: [emailConfig.email],
                                subject: ' Find one 1 get aplication error ',
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
                                res.json({ success: false, message: eval(language + '.getAplication.userError') }); // Return error
                            } else {
                                // Look for user in database
                                User.findOne({ username: req.params.username }, function(err, user) {
                                    if (err) {
                                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                        var mailOptions = {
                                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                            to: [emailConfig.email],
                                            subject: ' Find one 2 get aplication error ',
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
                                            res.json({ success: false, message: eval(language + '.getAplication.userError') }); // Return error
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
                                                Aplication.findOne({
                                                    language: language,
                                                    _id: req.params.id
                                                }, (err, aplication) => {
                                                    // Check if error was found or not
                                                    if (err) {
                                                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                                        var mailOptions = {
                                                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                                            to: [emailConfig.email], // list of receivers
                                                            subject: ' Find 3 get aplication error ',
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
                                                        // Check if aplication were found in database
                                                        if (!aplication) {
                                                            res.json({ success: false, message: eval(language + '.getAplication.aplicationError') }); // Return error of no aplication found
                                                        } else {
                                                            // Search database for all aplication Events
                                                            Event.find({
                                                                _id: aplication.events,
                                                                language: language
                                                            }, (err, events) => {
                                                                // Check if error was found or not
                                                                if (err) {
                                                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                                                    var mailOptions = {
                                                                        from: '"Fred Foo 👻" <mundoarqueologia@gmail.com>', // sender address
                                                                        to: ['mundoarqueologia@gmail.com'],
                                                                        subject: ' Find 4 get aplication error ',
                                                                        text: 'The following error has been reported in the Mundoarqueologia: ' + err,
                                                                        html: 'The following error has been reported in the Mundoarqueologia:<br><br>' + err
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
                                                                        res.json({ success: false, message: eval(language + '.allEventsSearch.eventsError') }); // Return error of no events found
                                                                    } else {
                                                                        res.json({ success: true, aplication: aplication, events: events }); // Return success and event 
                                                                    }
                                                                }
                                                            }); // Sort events from newest to oldest
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
           GET ALL user aplications
        =============================================================== */
    router.get('/allUserAplications/:username/:language', (req, res) => {
        var language = req.params.language;
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            if (!req.params.username) {
                res.json({ success: false, message: eval(language + '.allUserAplications.usernameProvidedError') }); // Return error
            } else {
                // Look for logged in user in database to check if have appropriate access
                User.findOne({ _id: req.decoded.userId }, function(err, mainUser) {
                    if (err) {
                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                        var mailOptions = {
                            from: "Fred Foo 👻 <" + emailConfig.email + ">", // sender address
                            to: [emailConfig.email],
                            subject: ' Find one 1 all user aplications error ',
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
                            res.json({ success: false, message: eval(language + '.allUserAplications.userError') }); // Return error
                        } else {
                            // Look for user in database
                            User.findOne({ username: req.params.username }, function(err, user) {
                                if (err) {
                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                    var mailOptions = {
                                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                        to: [emailConfig.email],
                                        subject: ' Find one 2 all user aplications error ',
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
                                        res.json({ success: false, message: eval(language + '.allUserAplications.userError') }); // Return error
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
                                            Aplication.find({
                                                language: language,
                                                users: req.params.username
                                            }).sort({ 'expiredAt': 1 }).exec((err, aplications) => {
                                                // Check if error was found or not
                                                if (err) {
                                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                                    var mailOptions = {
                                                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                                        to: [emailConfig.email], // list of receivers
                                                        subject: ' Find 3 all user aplications error ',
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
                                                    // Check if aplications were found in database
                                                    if (!aplications) {
                                                        res.json({ success: false, message: eval(language + '.allUserAplications.aplicationsError') }); // Return error of no aplications found
                                                    } else {
                                                        res.json({ success: true, aplications: aplications }); // Return success and aplications array
                                                    }
                                                }
                                            }); // Sort aplications by expired date
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
            Route to update/edit a aplication
        =============================================================== */
    router.put('/editAplication', function(req, res) {
        var language = req.body.language;
        // Check if language was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            // Check if id was provided
            if (!req.body._id) {
                res.json({ success: false, message: eval(language + '.editAplication.idProvidedError') }); // Return error
            } else {
                // Check if aplication users was provided
                if (!req.body.users || req.body.users.length <= 0) {
                    res.json({ success: false, message: eval(language + '.editAplication.usersProvidedError') }); // Return error
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
                                subject: ' Find one 1 edit aplication error ',
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
                                            subject: ' Find one 2 edit aplication error ',
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
                                                // Look for aplication in database
                                                Aplication.findOne({ _id: req.body._id }, function(err, aplication) {
                                                    if (err) {
                                                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                                        var mailOptions = {
                                                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                                            to: [emailConfig.email],
                                                            subject: ' Find one 3 edit aplication error ',
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
                                                        // Check if aplication is in database
                                                        if (!aplication) {
                                                            res.json({ success: false, message: eval(language + '.editUser.userError') }); // Return error
                                                        } else {
                                                            if (newLanguage)
                                                                aplication.language = newLanguage; // Assign new language to aplication in database
                                                            if (newUsers)
                                                                aplication.users = newUsers; // Assign new users to aplication in database
                                                            if (newTitle)
                                                                aplication.title = newTitle; // Assign new title to aplication in database
                                                            if (newEvents)
                                                                aplication.events = newEvents; // Assign new events to aplication in database
                                                            if (newEntityName)
                                                                aplication.entityName = newEntityName; // Assign new entityName to aplication in database
                                                            if (newName)
                                                                aplication.license.name = newName; // Assign new name to aplication in database
                                                            if (newConditions)
                                                                aplication.license.conditions = newConditions; // Assign new conditions to aplication in database
                                                            if (newPrice)
                                                                aplication.license.price = newPrice; // Assign new price to aplication in database
                                                            if (newExpiredAt)
                                                                aplication.license.expiredAt = newExpiredAt; // Assign new expiredAt to aplication in database
                                                            aplication.updatedAt = Date.now();
                                                            // Save aplication into database
                                                            aplication.save((err, aplication) => {
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
                                                                        res.json({ success: false, message: eval(language + '.editAplication.saveError'), err }); // Return general error message
                                                                    }
                                                                } else {
                                                                    res.json({ success: true, message: eval(language + '.editAplication.success') }); // Return success message
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